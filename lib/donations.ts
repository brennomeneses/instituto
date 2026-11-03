
import "server-only";

import { randomUUID } from "node:crypto";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
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

  interface DonationRow extends RowDataPacket {
  id: string;
  amount_cents: number;
  status: string;
}

export interface VerifiedMercadoPagoOrder {
  id: string;
  external_reference: string;
  total_amount: string;
  total_paid_amount: string;
  status: string;
  status_detail: string;
}

function amountToCents(value: string): number | null {
  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    return null;
  }

  const [reais, centavos = ""] = value.split(".");

  const amount =
    Number(reais) * 100 +
    Number(centavos.padEnd(2, "0"));

  return Number.isSafeInteger(amount) ? amount : null;
}

// Esta função deve receber dados consultados diretamente
// na API autenticada do Mercado Pago, nunca do frontend.
export async function confirmPaidDonation(
  order: VerifiedMercadoPagoOrder
): Promise<boolean> {
  // O pagamento precisa estar aprovado e creditado.
  if (
    order.status !== "processed" ||
    order.status_detail !== "accredited"
  ) {
    return false;
  }

  const totalCents = amountToCents(order.total_amount);
  const paidCents = amountToCents(order.total_paid_amount);

  if (
    totalCents === null ||
    paidCents === null ||
    totalCents !== paidCents
  ) {
    throw new Error("Valor do pagamento inconsistente.");
  }

  // Localizar o registro correspondente no MySQL.
  const [rows] = await db.execute<DonationRow[]>(
    `SELECT id, amount_cents, status
     FROM donations
     WHERE provider_order_id = ?
       AND id = ?
       AND payment_provider = 'mercadopago'
       AND currency = 'BRL'
     LIMIT 1`,
    [order.id, order.external_reference]
  );

  const donation = rows[0];

  if (!donation) {
    throw new Error("Doação não encontrada.");
  }

  if (Number(donation.amount_cents) !== paidCents) {
    throw new Error("Valor diferente do registrado na doação.");
  }

  // Uma notificação repetida não gera uma nova confirmação.
  if (donation.status === "paid") {
    return false;
  }

  if (donation.status !== "pending") {
    throw new Error("Status da doação incompatível.");
  }

  // Atualização atômica: confirma somente uma doação pendente
  // que ainda corresponde ao pedido e ao valor verificados.
  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE donations
     SET status = 'paid',
         paid_at = CURRENT_TIMESTAMP
     WHERE id = ?
       AND provider_order_id = ?
       AND amount_cents = ?
       AND status = 'pending'`,
    [donation.id, order.id, paidCents]
  );

  return result.affectedRows === 1;
}

