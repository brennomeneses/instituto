
import { NextResponse } from "next/server";
import db from "../../../lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    await db.query("SELECT 1");

    return NextResponse.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Falha na conexão com o MySQL");

    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
      },
      { status: 503 }
    );
  }
}
