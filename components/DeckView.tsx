"use client";

import { useState } from "react";
import { GeneratedContent, DeckSlide } from "@/lib/types";
import { alpha } from "@/lib/db-template";

interface Branding {
  company: string;
  tagline: string;
  primaryColor: string;
}

interface DeckViewProps {
  content: GeneratedContent;
  branding: Branding;
}

function TitleSlide({ slide, branding }: { slide: DeckSlide; branding: Branding }) {
  const c = branding.primaryColor;
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-16 text-white" style={{ backgroundColor: c }}>
      <div className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: alpha(c, 0.6) }}>
        {branding.company} · {branding.tagline}
      </div>
      <h1 className="text-3xl font-bold leading-tight mb-4">{slide.title}</h1>
      {slide.subtitle && <p className="text-base max-w-lg" style={{ color: alpha("#ffffff", 0.8) }}>{slide.subtitle}</p>}
    </div>
  );
}

function ProblemSlide({ slide }: { slide: DeckSlide }) {
  return (
    <div className="h-full flex flex-col px-14 py-12">
      <div className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">The Challenge</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8 max-w-xl leading-snug">{slide.title}</h2>
      <div className="space-y-4 flex-1">
        {slide.points?.map((point, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mt-0.5">
              {i + 1}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionSlide({ slide, c }: { slide: DeckSlide; c: string }) {
  return (
    <div className="h-full flex flex-col px-14 py-12">
      <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: c }}>The Solution</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-5 max-w-xl leading-snug">{slide.title}</h2>
      {slide.body && <p className="text-gray-600 text-sm mb-8 max-w-xl leading-relaxed">{slide.body}</p>}
      {slide.differentiators && (
        <div className="grid grid-cols-3 gap-4">
          {slide.differentiators.map((d, i) => (
            <div key={i} className="rounded-xl p-5" style={{ backgroundColor: alpha(c, 0.08) }}>
              <div
                className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center mb-3"
                style={{ backgroundColor: c }}
              >
                {i + 1}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CapabilitiesSlide({ slide, c }: { slide: DeckSlide; c: string }) {
  return (
    <div className="h-full flex flex-col px-14 py-12">
      <div className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Capabilities</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{slide.title}</h2>
      <div className="grid grid-cols-3 gap-5 flex-1">
        {slide.capabilities?.map((cap, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-5 flex flex-col">
            <h3 className="text-sm font-bold text-gray-900 mb-2">{cap.name}</h3>
            <p className="text-xs text-gray-600 leading-relaxed flex-1">{cap.description}</p>
            <div
              className="mt-4 text-xs font-semibold px-3 py-1.5 rounded-full inline-block"
              style={{ color: c, backgroundColor: alpha(c, 0.08) }}
            >
              {cap.metric}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseStudySlide({ slide, c }: { slide: DeckSlide; c: string }) {
  return (
    <div className="h-full flex flex-col px-14 py-12">
      <div className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Customer Story</div>
      <div className="text-lg font-bold text-gray-800 mb-6">{slide.customer}</div>
      <div className="flex-1 grid grid-cols-3 gap-5">
        <div className="bg-gray-50 rounded-xl p-5">
          <div className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Challenge</div>
          <p className="text-sm text-gray-700 leading-relaxed">{slide.challenge}</p>
        </div>
        <div className="rounded-xl p-5" style={{ backgroundColor: alpha(c, 0.08) }}>
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: alpha(c, 0.7) }}>Solution</div>
          <p className="text-sm text-gray-700 leading-relaxed">{slide.solution}</p>
        </div>
        <div className="rounded-xl p-5 text-white" style={{ backgroundColor: c }}>
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: alpha("#ffffff", 0.6) }}>Result</div>
          <p className="text-sm leading-relaxed">{slide.result}</p>
        </div>
      </div>
    </div>
  );
}

function StatsSlide({ slide, c }: { slide: DeckSlide; c: string }) {
  return (
    <div className="h-full flex flex-col px-14 py-12">
      <div className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">By the Numbers</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-10">{slide.title}</h2>
      <div className="grid grid-cols-3 gap-6 flex-1">
        {slide.stats?.map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center border border-gray-100 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold mb-1" style={{ color: c }}>{stat.number}</div>
            <div className="text-sm font-semibold text-gray-800 mb-1">{stat.label}</div>
            {stat.context && <div className="text-xs text-gray-400">{stat.context}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function CtaSlide({ slide, c }: { slide: DeckSlide; c: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-14 py-12 text-white" style={{ backgroundColor: c }}>
      <h2 className="text-2xl font-bold mb-6 max-w-xl leading-snug">{slide.title}</h2>
      {slide.next_steps && (
        <div className="space-y-3 mb-8">
          {slide.next_steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-5 py-3 text-sm" style={{ backgroundColor: alpha("#ffffff", 0.12) }}>
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold shrink-0" style={{ color: c }}>
                {i + 1}
              </div>
              <span className="text-left">{step}</span>
            </div>
          ))}
        </div>
      )}
      {slide.closing && (
        <p className="text-sm italic max-w-md" style={{ color: alpha("#ffffff", 0.7) }}>{slide.closing}</p>
      )}
    </div>
  );
}

function renderSlide(slide: DeckSlide, index: number, branding: Branding) {
  const c = branding.primaryColor;
  switch (slide.type) {
    case "title": return <TitleSlide key={index} slide={slide} branding={branding} />;
    case "problem": return <ProblemSlide key={index} slide={slide} />;
    case "solution": return <SolutionSlide key={index} slide={slide} c={c} />;
    case "capabilities": return <CapabilitiesSlide key={index} slide={slide} c={c} />;
    case "case_study": return <CaseStudySlide key={index} slide={slide} c={c} />;
    case "stats": return <StatsSlide key={index} slide={slide} c={c} />;
    case "cta": return <CtaSlide key={index} slide={slide} c={c} />;
    default: return null;
  }
}

export default function DeckView({ content, branding }: DeckViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = content.deck_slides;
  const totalSlides = slides.length;
  const c = branding.primaryColor;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
        style={{ aspectRatio: "16/9" }}
      >
        {renderSlide(slides[currentSlide], currentSlide, branding)}
        <div className="absolute bottom-4 right-5 text-xs text-gray-400 font-medium">
          {currentSlide + 1} / {totalSlides}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
          disabled={currentSlide === 0}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ backgroundColor: i === currentSlide ? c : "#e5e7eb" }}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((s) => Math.min(totalSlides - 1, s + 1))}
          disabled={currentSlide === totalSlides - 1}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
        >
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="text-xs py-1.5 px-2 rounded-lg font-medium transition-colors truncate"
            style={
              i === currentSlide
                ? { backgroundColor: c, color: "#ffffff" }
                : { backgroundColor: "#f3f4f6", color: "#6b7280" }
            }
          >
            {slide.type}
          </button>
        ))}
      </div>
    </div>
  );
}
