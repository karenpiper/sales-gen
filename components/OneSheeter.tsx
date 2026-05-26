"use client";

import { GeneratedContent } from "@/lib/types";
import { alpha } from "@/lib/db-template";

interface Branding {
  company: string;
  tagline: string;
  primaryColor: string;
}

interface OneSheeterProps {
  content: GeneratedContent;
  branding: Branding;
}

export default function OneSheeter({ content, branding }: OneSheeterProps) {
  const { one_sheeter: os } = content;
  const c = branding.primaryColor;

  return (
    <div className="bg-white font-sans" style={{ maxWidth: 800 }}>
      {/* Header */}
      <div className="text-white px-10 py-8" style={{ backgroundColor: c }}>
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: alpha(c, 0.6) }}>
              {branding.company} · {branding.tagline}
            </div>
            <h1 className="text-2xl font-bold leading-tight mb-3">{os.headline}</h1>
            <p className="text-sm leading-relaxed" style={{ color: alpha("#ffffff", 0.85) }}>{os.subheadline}</p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-xs font-medium" style={{ color: alpha(c, 0.6) }}>{content.customer_label}</div>
          </div>
        </div>
      </div>

      <div className="px-10 py-8 space-y-8">
        {/* Problem + Solution */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">The Challenge</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{os.problem_statement}</p>
          </div>
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: c }}>The Solution</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{os.solution_overview}</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-3 gap-4">
            {os.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold" style={{ color: c }}>{stat.number}</div>
                <div className="text-xs font-semibold text-gray-800 mt-0.5">{stat.label}</div>
                {stat.context && (
                  <div className="text-xs text-gray-400 mt-0.5">{stat.context}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Value props */}
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Why {branding.company}</h2>
          <div className="space-y-4">
            {os.value_props.map((vp, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: alpha(c, 0.12), color: c }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{vp.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-0.5">{vp.body}</p>
                  <span
                    className="inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded"
                    style={{ color: c, backgroundColor: alpha(c, 0.08) }}
                  >
                    {vp.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case study */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }} />
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">Customer Story</span>
          </div>
          <div className="px-6 py-5 grid grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Customer</div>
              <div className="text-sm font-medium text-gray-800">{os.case_study.customer}</div>
            </div>
            <div className="col-span-2 space-y-3">
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Challenge</div>
                <p className="text-sm text-gray-700">{os.case_study.challenge}</p>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Approach</div>
                <p className="text-sm text-gray-700">{os.case_study.solution}</p>
              </div>
              <div className="rounded-lg px-4 py-3" style={{ backgroundColor: alpha(c, 0.08) }}>
                <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: c }}>Result</div>
                <p className="text-sm font-medium" style={{ color: c }}>{os.case_study.result}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-white rounded-xl px-8 py-6" style={{ backgroundColor: c }}>
          <p className="text-sm leading-relaxed">{os.cta}</p>
        </div>
      </div>
    </div>
  );
}
