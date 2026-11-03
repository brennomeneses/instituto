
import { NextRequest, NextResponse } from "next/server";
import { projects } from "../../../data/projects";
import {
  createPendingDonation,
  attachMercadoPagoOrder,
} from "../../../../lib/donations";
import { createMercadoPagoOrder } from "../../../../lib/mercadopago";

export const runtime = "nodejs";

interface DonationRequest {
  amount: number;
  projectId: number | null;
}

export async function POST(request: NextRequest) {
  try {
    // Mantém o checkout desativado até concluirmos os testes.
    if (
      process.env.DONATIONS_CHECKOUT_ENABLED !== "true" ||
      !process.env.MERCADOPAGO_ACCESS_TOKEN
    ) {
      return NextResponse.json(
        {
          error:
            "Checkout ainda não configurado. Aguardando integração com Mercado Pago.",
        },
        { status: 503 }
      );
    }

    const body: DonationRequest = await request.json();
    const { amount, projectId } = body;

    // Validar o valor da doação.
    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount < 1 ||
      amount > 100000 ||
      Math.abs(amount * 100 - Math.round(amount * 100)) >
        0.000001
    ) {
      return NextResponse.json(
        { error: "Valor de doação inválido." },
        { status: 400 }
      );
    }

    // Validar o projeto.
    if (
      projectId !== null &&
      (!Number.isInteger(projectId) || projectId <= 0)
    ) {
      return NextResponse.json(
        { error: "Projeto inválido." },
        { status: 400 }
      );
    }

    const project =
      projectId === null
        ? null
        : projects.find((item) => item.id === projectId);

    if (projectId !== null && !project) {
      return NextResponse.json(
        { error: "Projeto não encontrado." },
        { status: 404 }
      );
    }

    // Converter reais para centavos.
    const amountCents = Math.round(amount * 100);

    // Registrar a doação pendente no MySQL.
    const donationId = await createPendingDonation({
      projectId,
      amountCents,
    });

    // Criar a order no Mercado Pago.
    const order = await createMercadoPagoOrder({
      donationId,
      amountCents,
      projectName: project?.title,
    });

    // Vincular a order ao registro da doação.
    await attachMercadoPagoOrder(donationId, order.id);

    // Retornar a URL para o frontend.
    return NextResponse.json({
      donationId,
      checkoutUrl: order.checkout_url,
    });
  } catch (error) {
    console.error(
      "Falha ao processar checkout:",
      error instanceof Error ? error.message : "Erro desconhecido"
    );

    return NextResponse.json(
      { error: "Não foi possível processar a solicitação." },
      { status: 500 }
    );
  }
}
