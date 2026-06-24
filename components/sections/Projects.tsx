"use client"

import Image from "next/image"
import { useRef } from "react"
import { PROJECTS } from "@/lib/data"
import useTilt from "@/hooks/useTilt"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useT } from "@/contexts/LangContext"

gsap.registerPlugin(ScrollTrigger)

type Project = (typeof PROJECTS)[number]

function ProjectCard({
  project,
  ownerLabel,
}: {
  project: Project
  ownerLabel: string
}) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 10, parallax: 10, scale: 1.02 })

  return (
    <div
      ref={tiltRef}
      data-proj-card
      className="group relative overflow-hidden rounded-[20px] cursor-pointer aspect-[4/3] will-change-transform"
    >
      <Image
        src={project.img}
        alt={project.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B2A]/95 via-[#0E1B2A]/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5" data-tilt-inner>
        <span className="inline-block rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white mb-3 tracking-wide">
          {project.power}
        </span>

        <h3 className="text-white font-extrabold text-lg leading-snug mb-1">
          {project.name}
        </h3>

        <p className="text-white/50 text-xs">
          {ownerLabel} {project.owner}
        </p>
      </div>

      <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/0 group-hover:ring-brand-400/30 transition-all duration-300 pointer-events-none" />
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useT()
  const pr = t.projects

  useGSAP(() => {
    const el = sectionRef.current
    if (!el) return

    gsap.fromTo(
      el.querySelectorAll("[data-proj-card]"),
      { y: 45, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.09,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector(".grid"), start: "top 78%", once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="du-an"
      className="relative py-16 sm:py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">

        <div className="text-on-image mb-10 sm:mb-14 text-center">
          <p className="text-brand-300 text-sm font-semibold uppercase tracking-widest mb-3">
            {pr.sectionLabel}
          </p>

          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            {pr.heading}{" "}
            <em className="font-serif font-normal italic text-[#5FD089]">
              {pr.headingEm}
            </em>
          </h2>

          <p className="mt-4 text-white/90 text-base max-w-xl mx-auto leading-relaxed">
            {pr.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.img}
              project={project}
              ownerLabel={pr.ownerLabel}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#lien-he"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-brand-500/20 hover:border-brand-400/40"
          >
            {pr.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
