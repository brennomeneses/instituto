import { NextRequest, NextResponse } from "next/server";

import {
  WebhookSignatureValidator,
  InvalidWebhookSignatureError,
} from "mercadopago";

import {
  getMercadoPagoOrder,
} from "../../../../lib/mercadopago";

import {
  confirmPaidDonation,
} from "../../../../lib/donations";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "Webhook não configurado." },
      { status: 503 }
    );
  }

  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");

  const url = new URL(request.url);

  const dataId = url.searchParams.get("data.id");
  const type = url.searchParams.get("type");

  if (
    !xSignature ||
    !xRequestId ||
    !dataId ||
    type !== "order"
  ) {
    return NextResponse.json(
      { error: "Notificação inválida." },
      { status: 400 }
    );
  }

  // Validar a assinatura antes de consultar o
  // Mercado Pago ou alterar qualquer registro.
  try {
    WebhookSignatureValidator.validate({
      xSignature,
      xRequestId,
      dataId: dataId.toLowerCase(),
      secret,
    });
  } catch (error) {
    if (error instanceof InvalidWebhookSignatureError) {
      return NextResponse.json(
        { error: "Assinatura inválida." },
        { status: 401 }
      );
    }

    console.error(
      "Erro ao validar assinatura:",
      error
    );

    return NextResponse.json(
      { error: "Erro interno." },
      { status: 500 }
    );
  }

  try {
    // Buscar os dados diretamente na API autenticada.
    const order = await getMercadoPagoOrder(dataId);

    // Confirmar apenas pagamentos aprovados,
    // creditados e com valor pago disponível.
    if (
      order.status === "processed" &&
      order.status_detail === "accredited" &&
      typeof order.total_paid_amount === "string"
    ) {
      const updated = await confirmPaidDonation({
        id: order.id,
        external_reference: order.external_reference,
        total_amount: order.total_amount,
        total_paid_amount: order.total_paid_amount,
        status: order.status,
        status_detail: order.status_detail,
      });

      console.info(
        "Notificação de pagamento processada:",
        {
          orderId: order.id,
          updated,
        }
      );
    } else {
      console.info(
        "Notificação recebida sem pagamento confirmado:",
        {
          orderId: order.id,
          status: order.status,
          statusDetail: order.status_detail,
        }
      );
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Erro ao processar webhook:",
      error instanceof Error
        ? error.message
        : "Erro desconhecido"
    );

    // Permitir uma nova tentativa de entrega
    // quando o processamento falhar.
    return NextResponse.json(
      {
        error: "Falha ao processar notificação.",
      },
      { status: 503 }
    );
  }
}