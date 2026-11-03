
import "server-only";

import { randomUUID } from "node:crypto";
import type { ResultSetHeader } from "mysql2";
import db from "./db";

// Dados necessários para criar uma doação
export interface CreateDonationInput {
  projectId: number | null;
  amountCents: number;
}

// 1. Criar uma doação pendente no MySQL
export async function createPendingDonation({
  projectId,
  amountCents,
}: CreateDonationInput): Promise<string> {
  if (
    !Number.isSafeInteger(amountCents) ||
    amountCents < 100 ||
    amountCents > 10_000_000
  ) {
    throw new Error("Valor da doação inválido.");
  }

  const id = randomUUID();

  await db.execute(
    `INSERT INTO donations (
      id,
      project_id,
      amount_cents,
      currency,
      status,
      payment_provider
    ) VALUES (?, ?, ?, 'BRL', 'pending', 'mercadopago')`,
    [id, projectId, amountCents]
  );

  return id;
}

// 2. Vincular o pedido do Mercado Pago à doação
export async function attachMercadoPagoOrder(
  donationId: string,
  providerOrderId: string
): Promise<void> {
  if (
    !donationId ||
    !providerOrderId ||
    providerOrderId.length > 100
  ) {
    throw new Error("Identificadores inválidos.");
  }

  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE donations
     SET provider_order_id = ?
     WHERE id = ?
       AND status = 'pending'
       AND provider_order_id IS NULL`,
    [providerOrderId, donationId]
  );

  if (result.affectedRows !== 1) {
    throw new Error(
      "Não foi possível vincular o pedido à doação."
    );
  }
}
