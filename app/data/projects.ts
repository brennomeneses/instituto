import conectarParaTransformarCapa from "../img/imagensProjetos/conectarParaTransformar/capa.png";
import nanoempreendedorasCapa from "../img/imagensProjetos/nanoempreendedorasDaAlimentacao/capa.png";
import vrsTibagiGuartelaCapa from "../img/imagensProjetos/vrsTibagiGuartela/capa.png";
import vilaPortelinhaCapa from "../img/imagensProjetos/vilaPortelinha/capa.png";
import vrsPrudentopolisCapa from "../img/imagensProjetos/vrsPrudentopolis/capa.png";



import type { StaticImageData } from "next/image";

export interface Project {
  id: number;
  title: string;
  description: string;
  bannerImage: StaticImageData;
  duration: string;
  target: string;
  focus: string;
  minInvestment: number;
  meta: number;
  doacaoAtual: number;
  donatesSum: number;
  tags: {
    id: number;
    content: string;
  }[];
  ods: {
    id: number;
    content: number;
  }[];
}











export const projects: Project[] = [

  {
    id: 5,
    title: "VRS Parques — Prudentópolis",

    description: "Desenvolvido a partir de uma imersão territorial realizada em Prudentópolis, o projeto VRS Parques nasce da conexão entre preservação ambiental, turismo sustentável, valorização cultural e desenvolvimento econômico regional. A iniciativa teve início por meio de visitas técnicas, escutas territoriais e articulações institucionais voltadas à compreensão das dinâmicas que estruturam o ecossistema natural, turístico e comunitário da região. Ao longo desse processo, o Monumento Natural Salto São João foi identificado como um importante eixo de integração territorial, conectando biodiversidade, turismo, empreendedorismo local e experiências culturais enraizadas na identidade regional. A partir dessas conexões, foram observadas oportunidades envolvendo empreendedores do entorno da Unidade de Conservação, iniciativas ligadas ao turismo religioso, hospedagem, economia criativa e bioeconomia, fortalecendo a construção de um ecossistema colaborativo capaz de gerar impacto positivo para a região. A iniciativa também evidenciou o potencial estratégico da relação entre território, patrimônio natural e identidade cultural, destacando elementos únicos capazes de impulsionar geração de valor sustentável, incluindo produtos ligados à origem e às características culturais locais.",

    focus: "Fortalecer o turismo sustentável e a economia local por meio da valorização dos recursos naturais e culturais da região.",

    target: "Empreendedores locais, guias turísticos, comunidades e visitantes.",

    duration: "12 meses",

    minInvestment: 0,
    meta: 0,
    doacaoAtual: 0,
    donatesSum: 0,

    bannerImage: vrsPrudentopolisCapa,

    tags: [
      { id: 24, content: "Turismo Sustentável" },
      { id: 25, content: "Preservação Ambiental" },
      { id: 26, content: "Desenvolvimento Regional" },
      { id: 27, content: "Cultura Local" },
      { id: 28, content: "Economia Criativa" }
    ],

    ods: [
      { id: 20, content: 8 },
      { id: 21, content: 11 },
      { id: 22, content: 12 },
      { id: 23, content: 13 },
      { id: 24, content: 15 }
    ]
  },





  {
    id: 3,
    title: "VRS Parques — Tibagi-Guartelá",

    description: "O VRS Parques foi concebido como uma iniciativa de valorização territorial voltada à revitalização da região de Tibagi-Guartelá, conectando preservação ambiental, turismo sustentável e desenvolvimento econômico regional. A proposta surgiu da necessidade de transformar o potencial natural e cultural da região em experiências capazes de atrair visitantes, fortalecer a economia local e gerar novas perspectivas para a comunidade. A ação promoveu a aproximação entre empreendedores locais, incentivando oportunidades ligadas ao turismo, à economia criativa e à circulação de negócios regionais através de presença digital humanizada. Essa conexão permitiu ampliar a divulgação das potencialidades do território, fortalecer a identidade regional e estimular experiências mais autênticas e integradas para moradores e visitantes. Com foco em crescimento sustentável e valorização do patrimônio ambiental, o projeto contribui para ampliar o fluxo turístico da região, estimular novas oportunidades de renda e consolidar Tibagi-Guartelá como um destino conectado à inovação, à preservação e ao desenvolvimento social de longo prazo.",

    focus: "Promover o desenvolvimento regional por meio do turismo sustentável, valorização ambiental e fortalecimento da economia local.",

    target: "Empreendedores locais, comunidades da região e visitantes/turistas.",

    duration: "12 meses",

    minInvestment: 0,
    meta: 0,
    doacaoAtual: 0,
    donatesSum: 0,

    bannerImage: vrsTibagiGuartelaCapa,

    tags: [
      { id: 13, content: "Turismo Sustentável" },
      { id: 14, content: "Preservação Ambiental" },
      { id: 15, content: "Desenvolvimento Regional" },
      { id: 16, content: "Economia Criativa" },
      { id: 17, content: "Impacto Social" }
    ],

    ods: [
      { id: 10, content: 8 },
      { id: 11, content: 11 },
      { id: 12, content: 12 },
      { id: 13, content: 13 },
      { id: 14, content: 15 }
    ]
  },



  {
    id: 1,
    title: "Conectar Para Transformar",

    description: "Realizado em parceria com a BASF, o Conectar Para Transformar nasceu com o propósito de ampliar oportunidades para nanoempreendedoras de diferentes segmentos, impulsionando independência financeira e fortalecendo negócios locais em Guaratinguetá. A iniciativa foi desenvolvida para gerar impacto social duradouro, criando caminhos de crescimento para mulheres que buscavam expandir sua atuação no mercado de forma estratégica e sustentável. O programa uniu capacitação empreendedora, orientação estratégica e geração de renda através de presença digital humanizada, permitindo que cada participante desenvolvesse sua comunicação, ampliasse sua visibilidade e fortalecesse sua relação com clientes e comunidade. Além do desenvolvimento técnico, o projeto valorizou a identidade e a trajetória individual de cada empreendedora, incentivando modelos de atuação mais conscientes, colaborativos e preparados para os desafios do mercado contemporâneo. Os resultados alcançados reforçam a potência da iniciativa: o projeto atingiu um ROI de 800%, consolidando-se como um case de transformação socioeconômica capaz de unir educação, inovação e fortalecimento comunitário em uma solução de impacto real e escalável.",

    focus: "Capacitar e impulsionar nanoempreendedoras, promovendo autonomia financeira, fortalecimento de negócios locais e geração de renda sustentável por meio de estratégias digitais e empreendedorismo.",

    target: "Mulheres nanoempreendedoras de diferentes segmentos em fase de crescimento de seus negócios.",

    duration: "12 meses",

    minInvestment: 0,
    meta: 0,
    doacaoAtual: 0,
    donatesSum: 0,

    bannerImage: conectarParaTransformarCapa,

    tags: [
      { id: 1, content: "Empreendedorismo" },
      { id: 2, content: "Impacto Social" },
      { id: 3, content: "Geração de Renda" },
      { id: 4, content: "Autonomia Feminina" },
      { id: 5, content: "Educação" },
      { id: 6, content: "Inclusão Produtiva" }
    ],

    ods: [
      { id: 1, content: 1 },
      { id: 2, content: 5 },
      { id: 3, content: 8 },
      { id: 4, content: 10 }
    ]
  },




  {
    id: 2,
    title: "Nanoempreendedoras da Alimentação",

    description: "Criado em parceria com a Fundação Cargill, o Nanoempreendedoras da Alimentação foi estruturado para impulsionar mulheres atuantes no setor alimentício em Paranaguá, promovendo qualificação profissional e fortalecimento econômico por meio do empreendedorismo local. A iniciativa ofereceu suporte para o aprimoramento de negócios voltados à alimentação, combinando desenvolvimento de marca, estratégias comerciais e geração de renda através de presença digital humanizada. O trabalho realizado buscou ampliar a visibilidade dessas empreendedoras, fortalecer vínculos com seus públicos e criar oportunidades mais sólidas de crescimento dentro da economia regional. Mais do que fomentar novos resultados financeiros, a ação contribuiu para o fortalecimento da autonomia feminina, incentivando protagonismo, valorização das histórias individuais e construção de redes de apoio capazes de gerar impacto positivo dentro das comunidades atendidas.",

    focus: "Fortalecer negócios alimentícios liderados por mulheres, promovendo qualificação profissional, desenvolvimento de marca e aumento da geração de renda local.",

    target: "Mulheres empreendedoras do setor de alimentação, caseiras, informais ou formalizadas, em Paranaguá e região.",

    duration: "12 meses",

    minInvestment: 0,
    meta: 0,
    doacaoAtual: 0,
    donatesSum: 0,

    bannerImage: nanoempreendedorasCapa,

    tags: [
      { id: 7, content: "Empreendedorismo" },
      { id: 8, content: "Segurança Alimentar" },
      { id: 9, content: "Geração de Renda" },
      { id: 10, content: "Autonomia Feminina" },
      { id: 11, content: "Economia Local" },
      { id: 12, content: "Impacto Social" }
    ],

    ods: [
      { id: 5, content: 2 },
      { id: 6, content: 5 },
      { id: 7, content: 8 },
      { id: 8, content: 10 },
      { id: 9, content: 12 }
    ]
  },




  {
    id: 4,
    title: "Vila Portelinha",

    description: "Desenvolvido para a comunidade Vila Portelinha, em Curitiba, o projeto surgiu como continuidade de um processo de diagnóstico territorial voltado à geração de renda, fortalecimento comunitário e desenvolvimento social em um território marcado por vulnerabilidades socioeconômicas, informalidade produtiva e desafios históricos relacionados à inclusão produtiva. A iniciativa foi estruturada para transformar os dados e percepções levantados na primeira fase do projeto em ações práticas de mobilização, formação e construção coletiva de caminhos sustentáveis para a comunidade. A proposta integra oficinas formativas e processos participativos voltados ao desenvolvimento comunitário, economia circular, empreendedorismo coletivo e empregabilidade, promovendo qualificação, fortalecimento de capacidades locais e incentivo ao protagonismo comunitário. Por meio de metodologias participativas e de presença digital humanizada, o projeto busca ampliar oportunidades de geração de renda, estimular conexões entre moradores, lideranças e associações locais, além de fortalecer redes colaborativas capazes de impulsionar transformações sociais de longo prazo.",

    focus: "Promover inclusão social e desenvolvimento comunitário por meio de capacitação, geração de renda e fortalecimento de vínculos locais.",

    target: "Moradores da comunidade Portelinha em situação de vulnerabilidade social em Curitiba.",

    duration: "12 meses",

    minInvestment: 1,
    meta: 1000,
    doacaoAtual: 0,
    donatesSum: 0,

    bannerImage: vilaPortelinhaCapa,

    tags: [
      { id: 18, content: "Impacto Social" },
      { id: 19, content: "Inclusão Social" },
      { id: 20, content: "Educação" },
      { id: 21, content: "Mercado de Trabalho" },
      { id: 22, content: "Geração de Renda" },
      { id: 23, content: "Desenvolvimento Comunitário" }
    ],

    ods: [
      { id: 15, content: 1 },
      { id: 16, content: 4 },
      { id: 17, content: 8 },
      { id: 18, content: 10 },
      { id: 19, content: 11 }
    ]
  },


];