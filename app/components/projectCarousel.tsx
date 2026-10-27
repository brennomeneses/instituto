"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CarouselProject {
  id: number;
  title: string;
  description: string;
  img: string | StaticImageData;
}

export default function ProjectCarousel({ projects }: { projects: CarouselProject[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const trackId = useId();
  const projectIds = projects.map((project) => project.id).join(",");
  const [navigation, setNavigation] = useState({ previous: false, next: false, progress: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateNavigation = () => {
      const maximum = track.scrollWidth - track.clientWidth;
      setNavigation({
        previous: track.scrollLeft > 2,
        next: track.scrollLeft < maximum - 2,
        progress: track.scrollWidth ? (track.scrollLeft + track.clientWidth) / track.scrollWidth : 1,
      });
    };

    track.scrollLeft = 0;
    updateNavigation();
    track.addEventListener("scroll", updateNavigation, { passive: true });
    const observer = new ResizeObserver(updateNavigation);
    observer.observe(track);
    for (const card of Array.from(track.children)) observer.observe(card);

    return () => {
      track.removeEventListener("scroll", updateNavigation);
      observer.disconnect();
    };
  }, [projectIds]);

  const navigate = (direction: "previous" | "next" | "first" | "last") => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return;

    const maximum = track.scrollWidth - track.clientWidth;
    const firstOffset = (track.firstElementChild as HTMLElement).offsetLeft;
    const positions = Array.from(track.children, (card) =>
      Math.min(maximum, (card as HTMLElement).offsetLeft - firstOffset)
    );
    let left = 0;

    if (direction === "last") left = maximum;
    if (direction === "next") left = positions.find((position) => position > track.scrollLeft + 2) ?? maximum;
    if (direction === "previous") left = positions.reverse().find((position) => position < track.scrollLeft - 2) ?? 0;

    track.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const directions = { ArrowLeft: "previous", ArrowRight: "next", Home: "first", End: "last" } as const;
    const direction = directions[event.key as keyof typeof directions];
    if (!direction) return;
    event.preventDefault();
    navigate(direction);
  };

  return (
    <section className="project-carousel" aria-label="Projetos" aria-roledescription="carrossel">
      <div className="project-carousel-toolbar">
        <span className="project-carousel-hint">Explore os projetos <span>· {projects.length} disponíveis</span></span>
        <div className="project-carousel-controls">
          <button type="button" className="project-carousel-arrow" aria-label="Projetos anteriores" aria-controls={trackId} disabled={!navigation.previous} onClick={() => navigate("previous")}>
            <ArrowLeft size={21} aria-hidden="true" />
          </button>
          <button type="button" className="project-carousel-arrow project-carousel-arrow-next" aria-label="Próximos projetos" aria-controls={trackId} disabled={!navigation.next} onClick={() => navigate("next")}>
            <ArrowRight size={21} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div ref={trackRef} id={trackId} className="project-carousel-track" tabIndex={0} role="group" aria-label="Cards de projetos. Use as setas para navegar." onKeyDown={handleKeyDown}>
        {projects.map((project, index) => (
          <article key={project.id} className="card" tabIndex={0} aria-roledescription="slide" aria-label={`${index + 1} de ${projects.length}: ${project.title}`}>
            <img src={typeof project.img === "string" ? project.img : project.img.src} alt={project.title} className="card-img" draggable={false} />
            <h3 className="card-title">{project.title}</h3>
            <div className="card-overlay">
              <div className="overlay-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <Link href={`/projeto/${project.id}`} className="card-btn">saiba mais</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="project-carousel-progress" aria-hidden="true">
        <div style={{ width: `${Math.min(1, Math.max(0, navigation.progress)) * 100}%` }} />
      </div>
    </section>
  );
}
