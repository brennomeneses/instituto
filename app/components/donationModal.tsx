
"use client";

import { useState } from "react";
import {
  Modal,
  InputNumber,
  Button,
  Typography,
  message,
} from "antd";

const { Title, Text } = Typography;

interface DonationModalProps {
  visible: boolean;
  onClose: () => void;
  projectId?: number;
  projectName?: string;
}

const suggestedAmounts = [20, 50, 100, 200];

export default function DonationModal({
  visible,
  onClose,
  projectId,
  projectName,
}: DonationModalProps) {
  const [amount, setAmount] = useState<number>(50);
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    if (
      !Number.isFinite(amount) ||
      amount < 1 ||
      amount > 100000
    ) {
      message.error("Informe um valor válido.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/donations/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            projectId: projectId ?? null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Erro ao iniciar pagamento."
        );
      }

      if (
        typeof data.checkoutUrl !== "string" ||
        !data.checkoutUrl.startsWith(
          "https://www.mercadopago.com.br/"
        )
      ) {
        throw new Error("URL de pagamento inválida.");
      }

      window.location.assign(data.checkoutUrl);
    } catch (error) {
      console.warn("Checkout indisponível:", error);

      message.error(
        error instanceof Error
          ? error.message
          : "Não foi possível iniciar o pagamento."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Faça uma doação"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      <div className="flex flex-col gap-5 py-4">
        <div className="text-center">
          <Title level={4}>
            Apoie essa transformação 💜
          </Title>

          <Text type="secondary">
            {projectName
              ? `Você está apoiando: ${projectName}`
              : "Sua contribuição apoia o Instituto Nobis."}
          </Text>
        </div>

        <div>
          <Text strong>
            Escolha o valor da doação
          </Text>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {suggestedAmounts.map((value) => (
              <Button
                key={value}
                size="large"
                type={
                  amount === value
                    ? "primary"
                    : "default"
                }
                onClick={() => setAmount(value)}
                style={
                  amount === value
                    ? { backgroundColor: "#631299" }
                    : {}
                }
              >
                R$ {value}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Text strong>
            Ou digite outro valor
          </Text>

          <InputNumber
            min={1}
            max={100000}
            precision={2}
            value={amount}
            onChange={(value) =>
              setAmount(value ?? 0)
            }
            prefix="R$"
            size="large"
            style={{
              width: "100%",
              marginTop: 10,
            }}
          />
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <Text strong>
            Pagamento seguro
          </Text>

          <p className="mt-2 text-sm text-gray-600">
            Você poderá escolher Pix, cartão
            de crédito ou outras formas
            disponíveis no Mercado Pago.
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          block
          loading={loading}
          onClick={handleDonate}
          style={{
            backgroundColor: "#631299",
            height: 48,
            fontWeight: 600,
          }}
        >
          Continuar para pagamento
        </Button>

        <Text
          type="secondary"
          style={{
            textAlign: "center",
            fontSize: 12,
          }}
        >
          O pagamento será realizado
          no ambiente seguro do Mercado Pago.
        </Text>
      </div>
    </Modal>
  );
}
