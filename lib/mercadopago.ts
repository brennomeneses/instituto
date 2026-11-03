
import "server-only";

interface CreateOrderInput {
  donationId: string;
  amountCents: number;
  projectName?: string;
}

interface MercadoPagoOrderResponse {
  id: string;
  checkout_url: string;
}

export async function createMercadoPagoOrder({
  donationId,
  amountCents,
  projectName,
}: CreateOrderInput): Promise<MercadoPagoOrderResponse> {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(
      "Credenciais do Mercado Pago não configuradas."
    );
  }

  if (
    !Number.isSafeInteger(amountCents) ||
    amountCents < 100
  ) {
    throw new Error("Valor inválido.");
  }

  const amount = (amountCents / 100).toFixed(2);

  const response = await fetch(
    "https://api.mercadopago.com/v1/orders",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Idempotency-Key": donationId,
      },
      body: JSON.stringify({
        type: "online",
        processing_mode: "manual",
        total_amount: amount,
        external_reference: donationId,
        description: projectName
          ? `Doação - ${projectName}`
          : "Doação - Instituto Nobis",
        items: [
          {
            title: projectName
              ? `Doação para ${projectName}`
              : "Doação para o Instituto Nobis",
            quantity: 1,
            unit_price: amount,
          },
        ],
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Falha na criação do checkout (${response.status}).`
    );
  }

  const data =
    (await response.json()) as MercadoPagoOrderResponse;

  if (
    !data.id ||
    !data.checkout_url ||
    !data.checkout_url.startsWith(
      "https://www.mercadopago.com.br/"
    )
  ) {
    throw new Error(
      "Resposta inválida do Mercado Pago."
    );
  }

  return data;
}


export interface MercadoPagoOrderDetails {
  id: string;
  external_reference: string;
  total_amount: string;
  total_paid_amount: string;
  status: string;
  status_detail: string;
}

export async function getMercadoPagoOrder(
  orderId: string
): Promise<MercadoPagoOrderDetails> {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(
      "Credenciais do Mercado Pago não configuradas."
    );
  }

  if (
    !/^ORD[A-Z0-9]+$/.test(orderId) ||
    orderId.length > 100
  ) {
    throw new Error("Identificador do pedido inválido.");
  }

  const response = await fetch(
    `https://api.mercadopago.com/v1/orders/${encodeURIComponent(orderId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Falha ao consultar pedido no Mercado Pago (${response.status}).`
    );
  }

  const order: unknown = await response.json();

  if (
    !order ||
    typeof order !== "object" ||
    !("id" in order) ||
    order.id !== orderId ||
    !("external_reference" in order) ||
    typeof order.external_reference !== "string" ||
    !("total_amount" in order) ||
    typeof order.total_amount !== "string" ||
    !("total_paid_amount" in order) ||
    typeof order.total_paid_amount !== "string" ||
    !("status" in order) ||
    typeof order.status !== "string" ||
    !("status_detail" in order) ||
    typeof order.status_detail !== "string"
  ) {
    throw new Error("Resposta inválida do Mercado Pago.");
  }

  return order as MercadoPagoOrderDetails;
}
