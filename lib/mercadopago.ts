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
    amountCents < 100 ||
    amountCents > 10_000_000
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

  const data: unknown = await response.json();

  if (
    !data ||
    typeof data !== "object" ||
    !("id" in data) ||
    typeof data.id !== "string" ||
    !("checkout_url" in data) ||
    typeof data.checkout_url !== "string"
  ) {
    throw new Error(
      "Resposta inválida do Mercado Pago."
    );
  }

  const checkoutUrl = new URL(data.checkout_url);

  if (
    checkoutUrl.protocol !== "https:" ||
    checkoutUrl.hostname !== "www.mercadopago.com.br"
  ) {
    throw new Error(
      "URL de checkout inválida."
    );
  }

  return {
    id: data.id,
    checkout_url: data.checkout_url,
  };
}

// Dados retornados pela consulta autenticada à Orders API.
export interface MercadoPagoOrderDetails {
  id: string;
  external_reference: string;
  total_amount: string;
  total_paid_amount?: string;
  status: string;
  status_detail?: string;
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
    throw new Error(
      "Identificador do pedido inválido."
    );
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

  // Campos obrigatórios para identificar o pedido.
  if (
    !order ||
    typeof order !== "object" ||
    !("id" in order) ||
    order.id !== orderId ||
    !("external_reference" in order) ||
    typeof order.external_reference !== "string" ||
    !("total_amount" in order) ||
    typeof order.total_amount !== "string" ||
    !("status" in order) ||
    typeof order.status !== "string"
  ) {
    throw new Error(
      "Resposta inválida do Mercado Pago."
    );
  }

  const validatedOrder = order as {
    id: string;
    external_reference: string;
    total_amount: string;
    total_paid_amount?: unknown;
    status: string;
    status_detail?: unknown;
  };

  // Alguns campos podem não existir enquanto
  // o pagamento ainda não foi processado.
  // Validar os campos opcionais quando estiverem presentes.
  if (
    (validatedOrder.total_paid_amount !== undefined &&
      typeof validatedOrder.total_paid_amount !== "string") ||
    (validatedOrder.status_detail !== undefined &&
      typeof validatedOrder.status_detail !== "string")
  ) {
    throw new Error("Resposta inválida do Mercado Pago.");
  }

  // Pagamentos aprovados precisam ter os dados completos.
  if (
    validatedOrder.status === "processed" &&
    validatedOrder.status_detail === "accredited" &&
    typeof validatedOrder.total_paid_amount !== "string"
  ) {
    throw new Error(
      "Dados do pagamento aprovado incompletos."
    );
  }

  return order as MercadoPagoOrderDetails;
}