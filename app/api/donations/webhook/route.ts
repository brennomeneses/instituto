import { NextRequest, NextResponse } from "next/server";
import {
  WebhookSignatureValidator,
  InvalidWebhookSignatureError,
} from "mercadopago";

import { getMercadoPagoOrder } from "../../../../lib/mercadopago";
import { confirmPaidDonation } from "../../../../lib/donations";

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

  // Validar a assinatura antes de consultar
  // qualquer informação ou alterar o banco.
  try {
    WebhookSignatureValidator.validate({
      xSignature,
      xRequestId,
      dataId,
      secret,
    });
  } catch (error) {
    if (error instanceof InvalidWebhookSignatureError) {
      return NextResponse.json(
        { error: "Assinatura inválida." },
        { status: 401 }
      );
    }

    console.error("Erro ao validar assinatura:", error);

    return NextResponse.json(
      { error: "Erro interno." },
      { status: 500 }
    );
  }

  try {
    // Consultar os dados oficiais da order.
    const order = await getMercadoPagoOrder(dataId);

    // Somente pedidos aprovados e creditados
    // podem confirmar uma doação.
    if (
      order.status === "processed" &&
      order.status_detail === "accredited"
    ) {
      const updated = await confirmPaidDonation(order);

      console.info(
        "Notificação de pagamento processada:",
        { orderId: order.id, updated }
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(
      "Erro ao processar webhook:",
      error instanceof Error ? error.message : "Erro desconhecido"
    );

    // Solicita uma nova tentativa de entrega
    // quando o processamento falhar.
    return NextResponse.json(
      { error: "Falha ao processar notificação." },
      { status: 503 }
    );
  }
}