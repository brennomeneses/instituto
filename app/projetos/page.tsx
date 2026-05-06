"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import Link from "next/link";
import 'antd/dist/reset.css';
import img from '../../app/img/logos/nobis_roxo.png';
import afroempreendedorismo from '../../app/img/3.png'
import etnodesenvolvimento from '../../app/img/etnodesenvolvimento.jpg'
import empreendedorismo from '../../app/img/empreendedorismo.jpg'
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  img: any;
}

const HomePage = () => {
  const [cardData, setCardData] = useState([]);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const projectImages = [empreendedorismo, etnodesenvolvimento, afroempreendedorismo];

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
  
  useEffect(() => {
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/10.3.0' } };
    fetch('https://dev.nobisapp.com.br/institute/', options)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((item: { projectData: { id: any; title: any; description: any; tags: any[]; bannerImage?: string; }; }, index: number) => ({
          id: item.projectData.id,
          title: item.projectData.title,
          description: item.projectData.description,
          img: item.projectData.bannerImage 
            ? `https://dev.nobisapp.com.br/institute/uploads/${item.projectData.bannerImage}`
            : projectImages[index % projectImages.length],
          tags: item.projectData.tags.map(tag => tag.content),
        }));
        setCardData(formattedData);
      })
      .catch(err => console.error(err));
  }, []);

  const handleTagClick = (tag: any) => {
    setFilteredTags((prevTags: string[]) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleShowAll = () => {
    setFilteredTags([]);
  };

  const filteredData: Project[] = cardData.filter((project: any) => 
    filteredTags.length === 0 || project.tags.some((tag: string) => filteredTags.includes(tag))
  );

  const allTags = [...new Set(cardData.flatMap((project: any) => project.tags))];

    useEffect(() => {
      if (typeof window === "undefined") return; // Garante que só execute no cliente
  
      const handleScroll = () => {
        const header = document.getElementById("header") as HTMLElement | null;
        const section1 = document.getElementById("section1") as HTMLElement | null;
  
        if (!header || !section1) return;
  
        const section1Bottom = section1.offsetTop + section1.offsetHeight;
        const scrollY = window.scrollY || window.pageYOffset;
  
        if (scrollY >= section1Bottom) {
          header.classList.add("solidWhite");
          header.classList.remove("transparent");
        } else {
          header.classList.add("transparent");
          header.classList.remove("solidWhite");
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll); // Cleanup
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
                <li style={{ marginLeft: '-55%' }}><a href="/#sobre" style={{ color: "black", fontWeight: "400" }}>Sobre</a></li>
                <li style={{ marginLeft: '20%' }}><Link href="/projetos" style={{ color: "black", fontWeight: "400" }}>Projetos</Link></li>
                <li style={{ marginLeft: '20%' }}><Link href="/#nobis" style={{ color: "black", fontWeight: "400" }}>Nobis</Link></li>
              </ul>
            </nav>
            <a  href="https://wa.me/5541992286680?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços." 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="button-header" style={{ border: "2px solid #9d5ee0", background: "none" }}><span className="gradient-text">Contato</span></a>
          </div>
          <div className="menu-toggle" id="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      <FadeInSection>
      <div className="projects" id="section1">
        <div className="content">
          <div className='title'>
            <p>Nossos Projetos <a style={{ letterSpacing: "-4px", marginLeft: "1%" }}>-----------------------</a></p>
            <h1>Apoie projetos de impacto que <br/> 
            transformam vidas de <span className="gradient-text">verdade.</span></h1>
          </div>
        </div>
      </div>
      <div className="filterTags">
            <button 
              onClick={handleShowAll} 
              className={`filter-tag ${filteredTags.length === 0 ? 'active' : ''}`}
            >
              Todos
            </button>
            {allTags.map((tag) => (
              <button 
                key={tag} 
                onClick={() => handleTagClick(tag)} 
                className={`filter-tag ${filteredTags.includes(tag) ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="projects-cards">
            <div className="content">
              <div className="cardsProjetos">
                {filteredData.map((project, index) => (
                  <div key={index} className="card" style={{ width: "400px", height: "600px" }}>
                    <img src={typeof project.img === 'string' ? project.img : project.img.src} alt={project.title} className="card-img" />
                    <div className="card-overlay">
                      <div className="overlay-content">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <Link href={`/projeto/${project.id}`} className="card-btn">saiba mais</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </FadeInSection>
          <div className="footer">
          <div className="content">
            <div className="footerContent">
                <Link href={'/'}><img src={img.src} /></Link>
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

export default HomePage;
