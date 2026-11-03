import { NextRequest, NextResponse } from "next/server";
import { projects } from "../../../data/projects";
import db from "../../../../lib/db";

export const runtime = "nodejs";

interface DonationRequest {
  amount: number;
  projectId: number | null;
}

export async function POST(request: NextRequest) {
  try {
    const body: DonationRequest = await request.json();

    const { amount, projectId } = body;

    // Validar o valor da doação
    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount < 1 ||
      amount > 100000 ||
      !Number.isInteger(Math.round(amount * 100)) ||
      Math.abs(amount * 100 - Math.round(amount * 100)) > 0.000001
    ) {
      return NextResponse.json(
        { error: "Valor de doação inválido." },
        { status: 400 }
      );
    }

    // Identificar o projeto beneficiado
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
// TESTE TEMPORÁRIO:
// Verificar conexão e autenticação com o MySQL.
await db.query("SELECT 1");

console.info("Conexão com MySQL validada.");

// Na próxima etapa, implementaremos
// o registro das doações e o Checkout Pro.

    return NextResponse.json(
      {
        error:
          "Checkout ainda não configurado. Aguardando integração com Mercado Pago.",
      },
      { status: 503 }
    );
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
