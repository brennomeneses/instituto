"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import communityImage from "../img/etnodesenvolvimento.jpg";
import DonationModal from "./donationModal";

export default function GeneralDonationSection() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <section
        aria-labelledby="general-donation-title"
        className="overflow-hidden bg-[#faf9f7] px-5 py-20 sm:px-8 md:px-0 md:py-24 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:w-4/5 lg:grid-cols-[1.1fr_1fr] lg:gap-14 xl:gap-20">
          {/* Conteúdo principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="mb-5 flex items-center gap-4 text-base font-light text-[#6f668d] sm:text-lg">
              Faça parte dessa transformação
              <span
                aria-hidden="true"
                className="h-px w-12 shrink-0 bg-[#d7877b] sm:w-16"
              />
            </p>

            <h2
              id="general-donation-title"
              className="mb-6 text-4xl font-bold leading-[1.15] tracking-[-1.5px] text-[#323131] sm:text-[45px] xl:text-[52px]"
            >
              Pequenos gestos.
              <br />
              <span className="gradient-text">
                Grandes mudanças.
              </span>
            </h2>

            <p className="max-w-xl text-base font-normal leading-8 text-[#6f668d] md:text-lg">
              Sua contribuição fortalece as iniciativas do Instituto
              Nobis e ajuda a transformar realidades por meio de
              projetos sociais e desenvolvimento comunitário.
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => setIsModalVisible(true)}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#323131] bg-[#323131] px-7 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-[#504964] hover:bg-[#504964] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#504964]"
              >
                Quero fazer uma doação
                <span aria-hidden="true">
                  →
                </span>
              </button>

              <Link
                href="/projetos"
                className="inline-flex items-center justify-center rounded-full border border-[#d8d4df] px-7 py-4 text-sm font-medium text-[#504964] transition-colors duration-300 hover:border-[#504964] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#504964]"
              >
                Conhecer os projetos
              </Link>
            </div>

            <p className="mt-5 text-xs leading-6 text-[#706b78] sm:text-sm">
              Pagamento seguro pelo Mercado Pago.
            </p>
          </motion.div>

          {/* Composição com uma imagem já utilizada nos projetos do Instituto. */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative min-w-0"
          >
            <figure className="m-0 overflow-hidden rounded-[28px] border border-[#e8e4de] bg-white sm:rounded-[32px]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={communityImage}
                  alt="Grupo de pessoas reunidas em uma comunidade, em meio a uma plantação."
                  fill
                  sizes="(min-width: 1600px) 570px, (min-width: 1024px) 38vw, (min-width: 768px) 80vw, 100vw"
                  className="object-cover object-[center_40%]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#504964] sm:left-7 sm:top-7">
                  Pessoas no centro.
                </span>
              </div>

              <figcaption className="p-6 sm:p-8">
                <h3 className="mb-3 text-2xl font-semibold leading-tight tracking-[-0.8px] text-[#323131] sm:text-[28px]">
                  Transformar começa com você.
                </h3>
                <p className="text-sm leading-7 text-[#6f668d]">
                  Toda contribuição importa. Apoie o trabalho do Instituto
                  Nobis e ajude a ampliar nosso impacto social.
                </p>
                <div className="mt-6 border-t border-[#e8e4de] pt-5">
                  <p className="mb-1 text-sm font-medium text-[#504964]">
                    Doe com propósito
                  </p>
                  <p className="text-xs leading-6 text-[#706b78] sm:text-sm">
                    Escolha o valor da sua contribuição.
                  </p>
                </div>
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </section>

      <DonationModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        projectName="Instituto Nobis"
      />
    </>
  );
}
