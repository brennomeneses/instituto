"use client";

import React, { useEffect, useState } from "react";
import { Spin, Popover, Progress } from "antd";
import Link from "next/link";
import 'antd/dist/reset.css';
import carrossel1 from '../../img/carrossel1.png';
import carrossel2 from '../../img/carrossel2.png';
import carrossel3 from '../../img/carrossel3.png';
import img from '../../img/logos/nobis_principal_branca.png';
import imgFooter from '../../img/logos/nobis_roxo.png';
import { useParams } from "next/navigation";
import ods1 from '../../img/ods/1.png';
import ods2 from '../../img/ods/2.png';
import ods3 from '../../img/ods/3.png';
import ods4 from '../../img/ods/4.png';
import ods5 from '../../img/ods/5.png';
import ods6 from '../../img/ods/6.png';
import ods7 from '../../img/ods/7.png';
import ods8 from '../../img/ods/8.png';
import ods9 from '../../img/ods/9.png';
import ods10 from '../../img/ods/10.png';
import ods11 from '../../img/ods/11.png';
import ods12 from '../../img/ods/12.png';
import ods13 from '../../img/ods/13.png';
import ods14 from '../../img/ods/14.png';
import ods15 from '../../img/ods/15.png';
import ods16 from '../../img/ods/16.png';
import ods17 from '../../img/ods/17.png';
import afroempreendedorismo from '../../img/3.png'
import etnodesenvolvimento from '../../img/etnodesenvolvimento.jpg'
import empreendedorismo from '../../img/empreendedorismo.jpg'
import projectBG from '../../img/projectBG.png'
import { LoadingOutlined } from '@ant-design/icons';
import { motion } from "framer-motion";
import { SingleProjectResponse } from "@/app/@types/http/singleProjectResponse";
import DonationModal from "../../components/donationModal";

const ProjetoPage = () => {
  const { id } = useParams(); // Pegando o ID da URL corretamente
  const [project, setProject] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado do modal

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const odsData: { [key: number]: { image: any; title: string } } = {
    1: { image: ods1, title: "Erradicação da Pobreza" },
    2: { image: ods2, title: "Fome Zero e Agricultura Sustentável" },
    3: { image: ods3, title: "Saúde e Bem-Estar" },
    4: { image: ods4, title: "Educação de Qualidade" },
    5: { image: ods5, title: "Igualdade de Gênero" },
    6: { image: ods6, title: "Água Potável e Saneamento" },
    7: { image: ods7, title: "Energia Acessível e Limpa" },
    8: { image: ods8, title: "Trabalho Decente e Crescimento Econômico" },
    9: { image: ods9, title: "Indústria, Inovação e Infraestrutura" },
    10: { image: ods10, title: "Redução das Desigualdades" },
    11: { image: ods11, title: "Cidades e Comunidades Sustentáveis" },
    12: { image: ods12, title: "Consumo e Produção Responsáveis" },
    13: { image: ods13, title: "Ação Contra a Mudança Global do Clima" },
    14: { image: ods14, title: "Vida na Água" },
    15: { image: ods15, title: "Vida Terrestre" },
    16: { image: ods16, title: "Paz, Justiça e Instituições Eficazes" },
    17: { image: ods17, title: "Parcerias e Meios de Implementação" },
  };  

  const projectImagesData: { [key: string]: any } = {
    "2": empreendedorismo,
    "3": etnodesenvolvimento,
    "4": afroempreendedorismo,
  };  

  const projectBannersData: { [key: string]: any } = {
    "2": carrossel1,
    "3": carrossel3,
    "4": carrossel2,
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

  const DonationProgressBar = ({ doacaoAtual, meta }: { doacaoAtual: number, meta: number }) => {
    const percent = (doacaoAtual / meta) * 100;
  
    return (
      <div style={{ margin: '50px 0' }}>
        <Progress 
          percent={percent} 
          status={percent === 100 ? 'success' : 'active'} 
          showInfo={false} 
          strokeColor={`linear-gradient(90deg, #5e17eb, #8e53fc, #ad69c5, #c278a0, #d7877b, #db8a71)`}
          size={["80vw", 65]}
        />
        <div style={{ marginTop: '10px', textAlign: "center" }}>
          <span style={{ fontSize: "35px" }}><a style={{ fontWeight: "600" }}>R${doacaoAtual.toFixed(0)}</a> de R${meta.toFixed(0)}</span>
          <br/>
          <button className="btnDoacao" onClick={openModal}>Faça uma doação</button>
          <DonationModal visible={isModalVisible} onClose={closeModal} />
        </div>
      </div>
    );
  };

  const bannerImage = projectBannersData[parseInt(id as any)] || carrossel1;
  const bannerImageUrl = bannerImage?.src || `https://dev.nobisapp.com.br/institute/uploads/${project?.bannerImage}`;

  useEffect(() => {
      if (typeof window === "undefined") return;
  
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
    if (!id) return;

    const fetchProject = async () => {
      try {
        const response = await fetch(`https://dev.nobisapp.com.br/institute/${id}/id`, {
          method: "GET",
          headers: { "User-Agent": "insomnia/10.3.0" },
        });
        if (!response.ok) throw new Error("Erro ao buscar projeto");

        const data : SingleProjectResponse = await response.json();
        setProject(data.project);
      } catch (error) {
        console.error("Erro ao buscar projeto:", error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) 
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh'
      }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  

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
            <li style={{ marginLeft: '-55%' }}><a href="/#sobre">Sobre</a></li>
            <li style={{ marginLeft: '20%' }}><Link href="/projetos">Projetos</Link></li>
            <li style={{ marginLeft: '20%' }}><Link href="/#nobis">Nobis</Link></li>
          </ul>
        </nav>
        <a  href="https://wa.me/5541992286680?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20serviços." 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="button-header"><span className="gradient-text">Contato</span></a>
        </div>
        <div className="menu-toggle" id="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>

    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }} id="section1">
      {project?.bannerImage && (
        <>
          <img
            className="projetoBanner"
            src={bannerImageUrl}
            alt="Projeto Banner"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              zIndex: 0
            }}
          />
          {/* Conteúdo sobreposto */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', height: '100%', color: '#fff', width: "80%", margin: "0 auto", padding: "0 20px" }}>
            <p className="projectTitle">
              INSTITUTO NOBIS <br />
              <a style={{ fontWeight: '300', fontSize: "68px" }}>& CROWDFUNDING</a> <br />
              IMPACTO DE A-Z <br />
            </p>
            <div style={{ marginTop: "-50px" }}>
              {project?.tags?.map((tag: any) => (
                <button key={tag.id} className="initBtn">{tag.content}</button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>

      {project && (
        <>
        <FadeInSection>
          <div className="projectInfo">
            <div className="content">
              <div className="sectionContent">
                <div className="text">
                  <div className='title'>
                    <p>Projeto <a style={{ letterSpacing: "-4px", marginLeft: "1%" }}>----------------</a></p>
                    <h1>
                      {project.title.split(" ").slice(0, Math.ceil(project.title.split(" ").length / 2)).join(" ")}{" "}
                      <a className="gradient-text">
                        {project.title.split(" ").slice(Math.ceil(project.title.split(" ").length / 2)).join(" ")}
                      </a>
                    </h1>
                  </div>
                  <br />
                  <div className="description">
                    <span>{project.description}</span>
                    <br /><br />
                    <div className="ods">
                      {project.ods.map((odsItem: any) => {
                        const ods = odsData[odsItem.content];
                        return (
                          <div key={odsItem.id} className="ods-item">
                            <Popover content={`ODS ${odsItem.content}: ${ods?.title}`}><img src={ods?.image?.src} alt={ods?.title} /></Popover>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <img src={projectImagesData[project.id]?.src || projectBG.src} className="projectImg" />
              </div>
            </div>
          </div>
          </FadeInSection>
          
          <FadeInSection>
          <div className="sobreProjeto">
            <h1 className="projetoSectionTitle">Investimento</h1>
            <div className="content">
              <div className="projetoInfo" style={{ backgroundImage: `url(${projectBG.src})` }}>
                <div>
                  <span><a>Duração do projeto:</a> <br/><br/> {project.duration}</span>
                  <br/><br/><br/>
                  <span><a>Público-Alvo:</a> <br/><br/> {project.target}</span>
                </div>
                <div>
                <span><a>Investimento Mínimo:</a> <br/><br/> R$ {project.minInvestment}</span>
                  <br/><br/><br/>
                  <span><a>Objetivos:</a> <br/><br/> {project.focus}</span>
                </div>
              </div>
            </div>
          </div>
          </FadeInSection>
          
          <FadeInSection>
          <div className="meta">
            <div className="content">
              <div className="metaInfo">
                <h1 className="projetoSectionTitle">Meta</h1>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${(project.donatesSum / project.meta) * 100}%` }} />
                </div>
                <DonationProgressBar doacaoAtual={project?.doacaoAtual || 0} meta={project?.meta || 1000} />
              </div>
            </div>
          </div>
          </FadeInSection>
        </>
      )}
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

export default ProjetoPage;
