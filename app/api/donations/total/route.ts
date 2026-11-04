import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import db from "../../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface TotalRow extends RowDataPacket {
  total_cents: string | number;
}

export async function GET(request: NextRequest) {
  const projectIdParam =
    request.nextUrl.searchParams.get("projectId");

  if (
    !projectIdParam ||
    !/^[1-9]\d*$/.test(projectIdParam)
  ) {
    return NextResponse.json(
      { error: "Projeto inválido." },
      { status: 400 }
    );
  }

  const projectId = Number(projectIdParam);

  if (!Number.isSafeInteger(projectId)) {
    return NextResponse.json(
      { error: "Projeto inválido." },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.execute<TotalRow[]>(
      `
        SELECT
          COALESCE(SUM(amount_cents), 0) AS total_cents
        FROM donations
        WHERE project_id = ?
          AND status = 'paid'
          AND currency = 'BRL'
          AND payment_provider = 'mercadopago'
      `,
      [projectId]
    );

    const totalCents = Number(rows[0]?.total_cents ?? 0);

    if (!Number.isSafeInteger(totalCents)) {
      throw new Error("Total de arrecadação inválido.");
    }

    return NextResponse.json(
      {
        projectId,
        totalCents,
        totalAmount: totalCents / 100,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "Erro ao consultar arrecadação:",
      error instanceof Error
        ? error.message
        : "Erro desconhecido"
    );

    return NextResponse.json(
      { error: "Erro ao consultar arrecadação." },
      { status: 500 }
    );
  }
}