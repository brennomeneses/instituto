"use client";

import React, { CSSProperties, useEffect, useState } from "react";
import { Carousel } from "antd";
import Link from "next/link";
import 'antd/dist/reset.css';
import carrossel1 from '../app/img/carrossel1.png';
import carrossel2 from '../app/img/carrossel2.png';
import carrossel3 from '../app/img/carrossel3.png';
import carrossel4 from '../app/img/carrossel4.png';
import img from '../app/img/logos/nobis_principal_branca.png';
import imgFooter from '../app/img/logos/nobis_roxo.png';
import afroempreendedorismo from '../app/img/3.png'
import etnodesenvolvimento from '../app/img/etnodesenvolvimento.jpg'
import empreendedorismo from '../app/img/empreendedorismo.jpg'
import sobreNos from '../app/img/sobre.png';
import parceiros from '../app/img/parceiros.png';
import missaoD from '../app/img/missaoDim.png';
import visaoD from '../app/img/visaoDim.png';
import valoresD from '../app/img/valoresDim.png';
import missaoL from '../app/img/missaoLit.png';
import visaoL from '../app/img/visaoLit.png';
import valoresL from '../app/img/valoresLit.png';
import sobre from '../app/img/9.png';
import TeamCarousel from '../app/components/team';
import { motion } from "framer-motion";

const contentStyle:  CSSProperties = {
  height: '100vh',
  width: '100vw',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Começa invisível e deslocado para baixo
      whileInView={{ opacity: 1, y: 0 }} // Aparece e sobe para o lugar correto
      transition={{ duration: 0.8 }} // Tempo da animação
      viewport={{ once: true }} // Só anima uma vez
    >
      {children}
    </motion.div>
  );
};

export default function HomePage() {
  const [cardData, setCardData] = useState<any[]>([]);
  const projectImages = [empreendedorismo, etnodesenvolvimento, afroempreendedorismo];
  const [active, setActive] = useState("visao");

  const titleColors = {
    missao: "#ae6ac2",
    visao: "#c278a0",
    valores: "#db8a71",
  };

  useEffect(() => {
    if (typeof window === "undefined") return; // Garante que só execute no cliente

    const handleScroll = () => {
      const header = document.getElementById("header") as HTMLElement | null;
      const section1 = document.getElementById("section1") as HTMLElement | null;

      if (!header || !section1) return;

      const section1Bottom = section1.offsetTop + section1.offsetHeight;
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY >= section1Bottom) {
        header.classList.add("solid");
        header.classList.remove("transparent");
      } else {
        header.classList.add("transparent");
        header.classList.remove("solid");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);
  
  
  useEffect(() => {
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/10.3.0' } };
    fetch('https://dev.nobisapp.com.br/institute/', options)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((item: { projectData: { id: any; title: any; description: any; bannerImage?: string; }; }, index: number) => ({
          id: item.projectData.id,
          title: item.projectData.title,
          description: item.projectData.description,
          img: item.projectData.bannerImage
            ? `https://dev.nobisapp.com.br/institute/uploads/${item.projectData.bannerImage}`
            : projectImages[index % projectImages.length]
        }));
        setCardData(formattedData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
    <header className="floating-header transparent" id="header">
      <div className="container-header">
        <div className="logo-header" id="logoHeader">
          <Link href={"/"}><img src={img.src} style={{ height: "80px" }} /></Link>
        </div>
        <div className='navInfo'>
        <nav>
          <ul>
            <li style={{ marginLeft: '-55%' }}><a href="#mvv">Sobre</a></li>
            <li style={{ marginLeft: '20%' }}><Link href="/projetos">Projetos</Link></li>
            <li style={{ marginLeft: '20%' }}><Link href="#nobis">Nobis</Link></li>
          </ul>
        </nav>
        <a 
          href="https://wa.me/5541992286680?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços." 
          target="_blank" 
          rel="noopener noreferrer"
          className="button-header"
          ><span className="gradient-text">Contato</span></a>
        </div>
      </div>
    </header>
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }} id="section1">
      <Carousel
        autoplay
        effect="fade"
        autoplaySpeed={5000} // Tempo de transição mais lento (5 segundos)
        style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      >
        <div>
          <div style={{ ...contentStyle, backgroundImage: `url(${carrossel1.src})` }} />
        </div>
        <div>
          <div style={{ ...contentStyle, backgroundImage: `url(${carrossel2.src})` }} />
        </div>
        <div>
          <div style={{ ...contentStyle, backgroundImage: `url(${carrossel3.src})` }} />
        </div>
        <div>
          <div style={{ ...contentStyle, backgroundImage: `url(${carrossel4.src})` }} />
        </div>
      </Carousel>

      {/* Conteúdo sobreposto */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', height: '100%', color: '#fff', width: "80%", margin: "0 auto", padding: "0 20px" }}>
        <p className="frontPageTitle">
          INSTITUTO NOBIS <br />
          <a style={{ fontWeight: '300', fontSize: "50px" }}>& CROWDFUNDING</a> <br />
          IMPACTO DE A-Z <br />
        </p>
        <a className="initBtn" href="#sobre">O que fazemos?</a>
      </div>
    </div>
    <FadeInSection>
    <div className='nossosProjetos'>
      <div className='content'>
        <div className='title'>
          <p>Nossos Projetos <a style={{ letterSpacing: "-4px", marginLeft: "1%" }}>-----------------------</a></p>
          <h1>Apoie projetos de impacto que <br/> 
          transformam vidas de <span className="gradient-text">verdade.</span></h1>
        </div>
        <div className="slider-container">
          <div className="slider-container">
              {cardData.map((card, index) => (
                <div key={index} className="card" style={{ width: "400px", height: "600px" }}>
                  <img src={typeof card.img === 'string' ? card.img : card.img.src} alt={card.title} className="card-img" />
                  <h3 className="card-title">{card.title}</h3>
                  <div className="card-overlay">
                    <div className="overlay-content">
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                      <Link href={`/projeto/${card.id}`} className="card-btn">saiba mais</Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
    </FadeInSection>
    <FadeInSection>
      <div className='sobreNobis' id="sobre">
        <div className="content">
          <div className='title'>
            <p>Sobre Nós <a style={{ letterSpacing: "-4px", marginLeft: "1%" }}>-----------------------</a></p>
            <h1>Conheça o <span className="gradient-text">Instituto.</span></h1>
          </div>
          <div className="sobreNosCards">
          <a 
            href="https://wa.me/5541992286680?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços." 
            target="_blank" 
            rel="noopener noreferrer"
            >
              <img src={sobreNos.src} alt="Nobis" /></a>
          </div>
        </div>
      </div>
    </FadeInSection>
    <div className="parceiros">
      <img src={parceiros.src} />
    </div>
    <FadeInSection>
    <div className="playlist">
      <div className="content">
        <div className="title">
          <p>Histórias Reais <a style={{ letterSpacing: "-4px", marginLeft: "1%" }}>-----------------------</a></p>
          <h1>Pessoas <span className="gradient-text">Reais.</span></h1>
        </div>
        <div className="playlistContainer">
        <iframe style={{ borderRadius: "40px" }} width="100%" height="800" src="https://www.youtube.com/embed/videoseries?si=Rnbquy9ihCsdkP3Q&amp;list=PLGUiEiyT-j64Fd-3oAXavx9D0kyBmQ7LN" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>  
        </div>
      </div>
    </div>
    </FadeInSection>
    <FadeInSection>
    <div className="mvv" id="mvv">
      <div className="content">
        <div className="title">
          <p>
            Conheça nossa{" "}
            <a style={{ letterSpacing: "-4px", marginLeft: "1%" }}>
              -----------------------
            </a>
          </p>
          <h1>
            Missão, Visão e <span className="gradient-text">Valores.</span>
          </h1>
        </div>
        <div className="mvvContainer">
          {[
            {
              key: "missao",
              imgD: missaoD.src,
              imgL: missaoL.src,
              title: "Nossa missão",
              text: "Gerar Economia Regenerativa a partir da Educação + Geração de Renda com Presença Digital Humanizada.",
            },
            {
              key: "visao",
              imgD: visaoD.src,
              imgL: visaoL.src,
              title: "Nossa visão",
              text: "Ser exponencial para transformar realidades de vulnerabilidade em prosperidade regenerativa a partir da educação e ativação de renda pela presença digital.",
            },
            {
              key: "valores",
              imgD: valoresD.src,
              imgL: valoresL.src,
              title: "Nossos valores",
              text: (
                <ul>
                  <li>Tecnologia no Meio, Pessoas no Centro</li>
                  <br />
                  <li>Ser exponencial para escalar transformações que importam no mundo.</li>
                  <br />
                  <li>Impacto é escalável quando as redes são infinitas</li>
                  <br />
                  <li>Presença global, desenvolvimento local.</li>
                </ul>
              ),
            },
          ].map(({ key, imgD, imgL, title, text }) => (
            <div
              key={key}
              className={`mvvCard ${active === key ? "meio" : "lado"}`}
              onMouseEnter={() => setActive(key)}
            >
              <div className={`mvvCardContent ${active === key ? "lit" : "dim"}`}>
                <img src={active === key ? imgL : imgD} />
                <h1 style={{ color: active === key ? titleColors[key as keyof typeof titleColors] : "#504964" }}>
                  {title}
                </h1>
                <span>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </FadeInSection>
    <div className="sobre" id="nobis">
    <FadeInSection>
      <div className="content">
        <div className="sectionContent">
          <div className="text">
            <div className='title'>
              <p>Sobre a Nobis <a style={{ letterSpacing: "-4px", marginLeft: "1%" }}>-----------------------</a></p>
              <h1>Tecnologia alinhada ao <a className="gradient-text">impacto.</a></h1>
            </div>
            <div className="description">
                <span>Saiba em tempo real os impactos que seus investimentos promovem para as pessoas, comunidades e o planeta. Monitoramos em tempo real todos os fluxos de Impacto a partir de 30 indicadores em dashboards. Reports contínuos sobre Investimento em todas as dimensões do Impacto.</span>
                <div className="data">
                  <div className="dataItem" style={{ textAlign: "left" }}>
                    <h1 style={{ color: "#8e53fc" }}>30</h1>
                    <span>Indicadores<br/>
                    em tempo real</span>
                  </div>
                  <div className="dataItem" style={{ textAlign: "center" }}>
                    <h1 className="gradient-text">13 Mil</h1>
                    <span>Pessoas<br/>
                    Conectadas</span>
                  </div>
                  <div className="dataItem" style={{ textAlign: "right" }}>
                    <h1 style={{ color: "#d7877b" }}>17</h1>
                    <span>ODS<br/>
                    Contemplados</span>
                  </div>
                </div>
              </div>
          </div>    
          <img src={sobre.src} />   
        </div>
      </div>
    </FadeInSection>
    </div>
    <div className="equipe">
    <FadeInSection>
      <div className="content">
        <div className="sectionContent"> 
          <div className="carousel" style={{ width: "30%" }}>
            <TeamCarousel /> 
          </div>
          <div className="text" style={{ width: "100%" }}>
            <div className='title'>
              <p>As faces por trás <a style={{ letterSpacing: "-4px", marginLeft: "1%" }}>----------------</a></p>
              <h1>Quem somos <a className="gradient-text">nós?</a></h1>
            </div>
            <span>
            A Nobis é uma plataforma de ESG 4.0 que conecta as empresas aos seus públicos a partir de programas socioambientais escaláveis.
            <br/><br/>Nossa missão é gerar valor compartilhado com monitoramento de indicadores de impacto em tempo real, ajudando as empresas a alcançar seus objetivos ESG de forma eficaz e transparente.
            </span>
          </div>
        </div>
      </div>
    </FadeInSection>
    </div>
    {/* <div className="resultados">
      <div className="content">
        <div className="resultadosContent">
          <div className="title">
            <h1>Resultados do Instituto Nobis em 2 anos.</h1>
          </div>
          <div className="resultadosContainer">
            <div className="resultadosCard">
              <h1 className="gradient-text">+1000</h1>
              <span>Pessoas Impactadas</span>
            </div>
            <div className="resultadosCard">
              <h1 className="gradient-text">+6</h1>
              <span>Projetos</span>
            </div>
            <div className="resultadosCard">
              <h1 className="gradient-text">+10</h1>
              <span>Parceiros</span>
            </div>
            <div className="resultadosCard">
              <h1 className="gradient-text">+400.000</h1>
              <span>Em recursos aplicados</span>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    <div className="footer">
          <div className="content">
            <div className="footerContent">
                <Link href={'/'}><img src={imgFooter.src} /></Link>
              <div className="footerInfo">
                <div>
                    <h4>Soluções</h4>
                    <a href="https://esg.nobisapp.com.br/paginas/impacto/" target="_blank">Impacto com Monitoramento</a>
                    <a href="https://esg.nobisapp.com.br/paginas/comunicacao-branding/" target="_blank">Comunicação e Branding em ESG</a>
                    <a href="https://esg.nobisapp.com.br/paginas/selo-materialidade/" target="_blank">Selo de Materialidade</a>
                    <a href="https://esg.nobisapp.com.br/paginas/handson-esg/" target="_blank">ESG Hands On</a>
                    <a href="https://esg.nobisapp.com.br/paginas/rota-esg/" target="_blank">Rota ESG</a>
                    <a href="https://esg.nobisapp.com.br/paginas/quiz-do-consumidor/" target="_blank">Quiz do Consumidor</a>
                </div>
                <div>
                    <h4>Sobre Nós</h4>
                    <a href="https://esg.nobisapp.com.br/paginas/sobre/" target="_blank">A Nobis</a>
                    <a href="https://esg.nobisapp.com.br/paginas/politica-de-privacidade/" target="_blank">Política de Privacidade</a>
                    <a href="https://agentes.nobisapp.com.br/" target="_blank">Seja um Parceiro</a>
                    <a href="https://esg.nobisapp.com.br/paginas/imprensa/" target="_blank">Comunicação & Imprensa</a>
                    <Link href={"/transparencia"}>Transparência</Link>
                </div>
                <div>
                    <p>
                        Rua Presidente Faria, 51 <br/>
                        Sala 502, Edifício Farid Surigi <br/>
                        Centro, Curitiba - PR <br/>
                        <br/>
                        <a 
                            href="https://wa.me/5541992286680?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços." 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="whatsapp-button"
                            >
                            Fale Conosco
                        </a>

                    </p>
                </div>
               </div>
            </div>
          </div>
       </div>
    </>
  );
};
