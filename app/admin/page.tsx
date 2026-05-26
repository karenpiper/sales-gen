"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { StoredTemplate, DEFAULT_TEMPLATE, alpha } from "@/lib/db-template";

type Tab = "branding" | "overview" | "valueprops" | "casestudies" | "supporting";

const TABS: { id: Tab; label: string }[] = [
  { id: "branding", label: "Branding" },
  { id: "overview", label: "Overview" },
  { id: "valueprops", label: "Value Props" },
  { id: "casestudies", label: "Case Studies" },
  { id: "supporting", label: "Stats & Points" },
];

// ── Reusable field components ──────────────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
        {hint && <span className="ml-1.5 font-normal text-gray-400">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
const textareaCls = inputCls + " resize-none";

// ── Array item editors ─────────────────────────────────────────────────────

type ValueProp = StoredTemplate["value_props"][number];
type CaseStudy = StoredTemplate["case_studies"][number];
type SpeakingPoint = StoredTemplate["speaking_points"][number];
type Stat = StoredTemplate["stats"][number];

function ValuePropEditor({
  items,
  onChange,
}: {
  items: ValueProp[];
  onChange: (items: ValueProp[]) => void;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const update = (i: number, patch: Partial<ValueProp>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => {
    onChange(items.filter((_, idx) => idx !== i));
    setOpen(null);
  };

  const add = () => {
    onChange([...items, { title: "", body: "", metric: "" }]);
    setOpen(items.length);
  };

  return (
    <div className="space-y-2">
      {items.map((vp, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm font-medium text-gray-800 truncate pr-4">
              {vp.title || <span className="text-gray-300 italic">Untitled value prop</span>}
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
              <Field label="Title">
                <input className={inputCls} value={vp.title} onChange={e => update(i, { title: e.target.value })} />
              </Field>
              <Field label="Body" hint="2–3 sentences">
                <textarea className={textareaCls} rows={3} value={vp.body} onChange={e => update(i, { body: e.target.value })} />
              </Field>
              <Field label="Metric" hint="key stat or proof point">
                <input className={inputCls} value={vp.metric} onChange={e => update(i, { metric: e.target.value })} />
              </Field>
              <button
                onClick={() => remove(i)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove this value prop
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
      >
        + Add value prop
      </button>
    </div>
  );
}

function CaseStudyEditor({
  items,
  onChange,
}: {
  items: CaseStudy[];
  onChange: (items: CaseStudy[]) => void;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const update = (i: number, patch: Partial<CaseStudy>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => {
    onChange(items.filter((_, idx) => idx !== i));
    setOpen(null);
  };

  const add = () => {
    onChange([...items, { customer: "", challenge: "", solution: "", result: "" }]);
    setOpen(items.length);
  };

  return (
    <div className="space-y-2">
      {items.map((cs, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm font-medium text-gray-800 truncate pr-4">
              {cs.customer || <span className="text-gray-300 italic">Unnamed customer</span>}
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
              <Field label="Customer" hint="name or description">
                <input className={inputCls} value={cs.customer} onChange={e => update(i, { customer: e.target.value })} />
              </Field>
              <Field label="Challenge">
                <textarea className={textareaCls} rows={3} value={cs.challenge} onChange={e => update(i, { challenge: e.target.value })} />
              </Field>
              <Field label="Solution">
                <textarea className={textareaCls} rows={3} value={cs.solution} onChange={e => update(i, { solution: e.target.value })} />
              </Field>
              <Field label="Result" hint="outcomes and metrics">
                <textarea className={textareaCls} rows={3} value={cs.result} onChange={e => update(i, { result: e.target.value })} />
              </Field>
              <button
                onClick={() => remove(i)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove this case study
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
      >
        + Add case study
      </button>
    </div>
  );
}

function SpeakingPointEditor({
  items,
  onChange,
}: {
  items: SpeakingPoint[];
  onChange: (items: SpeakingPoint[]) => void;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const update = (i: number, patch: Partial<SpeakingPoint>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => {
    onChange(items.filter((_, idx) => idx !== i));
    setOpen(null);
  };

  const add = () => {
    onChange([...items, { topic: "", point: "" }]);
    setOpen(items.length);
  };

  return (
    <div className="space-y-2">
      {items.map((sp, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm font-medium text-gray-800 truncate pr-4">
              {sp.topic || <span className="text-gray-300 italic">Untitled topic</span>}
            </span>
            <svg
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
              <Field label="Topic" hint="e.g. ROI, Security, Implementation">
                <input className={inputCls} value={sp.topic} onChange={e => update(i, { topic: e.target.value })} />
              </Field>
              <Field label="Speaking point">
                <textarea className={textareaCls} rows={3} value={sp.point} onChange={e => update(i, { point: e.target.value })} />
              </Field>
              <button
                onClick={() => remove(i)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
      >
        + Add speaking point
      </button>
    </div>
  );
}

function StatEditor({
  items,
  onChange,
}: {
  items: Stat[];
  onChange: (items: Stat[]) => void;
}) {
  const update = (i: number, patch: Partial<Stat>) => {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  const add = () => onChange([...items, { number: "", label: "", context: "" }]);

  return (
    <div className="space-y-3">
      {items.map((stat, i) => (
        <div key={i} className="grid grid-cols-3 gap-3 items-start p-3 bg-gray-50 rounded-xl">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Number</label>
            <input className={inputCls} placeholder="99.4%" value={stat.number} onChange={e => update(i, { number: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Label</label>
            <input className={inputCls} placeholder="extraction accuracy" value={stat.label} onChange={e => update(i, { label: e.target.value })} />
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-400 block mb-1">Context</label>
              <input className={inputCls} placeholder="across 300+ document types" value={stat.context} onChange={e => update(i, { context: e.target.value })} />
            </div>
            <button onClick={() => remove(i)} className="mt-6 text-gray-300 hover:text-red-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
      >
        + Add stat
      </button>
    </div>
  );
}

// ── Main admin page ────────────────────────────────────────────────────────

export default function AdminPage() {
  const [template, setTemplate] = useState<StoredTemplate>(DEFAULT_TEMPLATE);
  const [activeTab, setActiveTab] = useState<Tab>("branding");
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/template")
      .then((r) => r.json())
      .then((data) => {
        if (data) setTemplate(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const set = useCallback(<K extends keyof StoredTemplate>(key: K, value: StoredTemplate[K]) => {
    setTemplate((prev) => ({ ...prev, [key]: value }));
  }, []);

  async function handleSave() {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(template),
      });
      if (res.ok) {
        setSavedAt(new Date().toLocaleTimeString());
      }
    } finally {
      setIsSaving(false);
    }
  }

  const c = template.primary_color;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sm text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1.5 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to generator
            </Link>
            <span className="text-gray-200">|</span>
            <span className="text-sm font-semibold text-gray-800">Content Admin</span>
          </div>
          <div className="flex items-center gap-3">
            {savedAt && (
              <span className="text-xs text-green-600">Saved at {savedAt}</span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50 transition-colors"
              style={{ backgroundColor: c }}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8 flex gap-8">
        {/* Sidebar tabs */}
        <div className="w-44 shrink-0">
          <nav className="space-y-1 sticky top-24">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`}
                style={activeTab === tab.id ? { backgroundColor: c } : {}}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-100 p-8 space-y-6">

            {/* BRANDING TAB */}
            {activeTab === "branding" && (
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">Branding</h2>
                  <p className="text-xs text-gray-400">Company identity that appears in all generated materials.</p>
                </div>

                <Field label="Company Name">
                  <input
                    className={inputCls}
                    value={template.company}
                    onChange={e => set("company", e.target.value)}
                    placeholder="Lumina"
                  />
                </Field>

                <Field label="Tagline" hint="short descriptor below the name">
                  <input
                    className={inputCls}
                    value={template.tagline}
                    onChange={e => set("tagline", e.target.value)}
                    placeholder="Intelligent Document Processing"
                  />
                </Field>

                <Field label="Brand Color" hint="used for headers, buttons, highlights">
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={template.primary_color}
                      onChange={e => set("primary_color", e.target.value)}
                      className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5"
                    />
                    <input
                      className={inputCls + " w-36"}
                      value={template.primary_color}
                      onChange={e => set("primary_color", e.target.value)}
                      placeholder="#4f46e5"
                    />
                    <div className="flex-1 h-10 rounded-lg" style={{ backgroundColor: template.primary_color }} />
                  </div>
                </Field>

                {/* Color preview */}
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  <div className="px-6 py-4 text-white text-sm" style={{ backgroundColor: c }}>
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: alpha(c, 0.6) }}>
                      {template.company} · {template.tagline}
                    </span>
                    <div className="font-bold mt-1">Header preview — this is how it looks</div>
                  </div>
                  <div className="px-6 py-4 flex gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: c }}>1</div>
                    <div className="text-sm" style={{ color: c }}>Accent text and metric badges</div>
                    <span className="ml-auto text-xs font-medium px-2 py-1 rounded" style={{ color: c, backgroundColor: alpha(c, 0.1) }}>Metric badge</span>
                  </div>
                </div>
              </>
            )}

            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">Company Overview</h2>
                  <p className="text-xs text-gray-400">The foundation of all generated content. Claude transforms this for each buyer.</p>
                </div>

                <Field label="Elevator Pitch" hint="2–3 sentences, what the product does and who it's for">
                  <textarea
                    className={textareaCls}
                    rows={4}
                    value={template.elevator_pitch}
                    onChange={e => set("elevator_pitch", e.target.value)}
                  />
                </Field>

                <Field label="Default CTA" hint="what you want the buyer to do — Claude adapts it to their stage">
                  <textarea
                    className={textareaCls}
                    rows={4}
                    value={template.cta}
                    onChange={e => set("cta", e.target.value)}
                  />
                </Field>
              </>
            )}

            {/* VALUE PROPS TAB */}
            {activeTab === "valueprops" && (
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">Value Propositions</h2>
                  <p className="text-xs text-gray-400">Claude selects and rewrites the most relevant props for each buyer&apos;s role and industry.</p>
                </div>
                <ValuePropEditor items={template.value_props} onChange={v => set("value_props", v)} />
              </>
            )}

            {/* CASE STUDIES TAB */}
            {activeTab === "casestudies" && (
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">Case Studies</h2>
                  <p className="text-xs text-gray-400">Claude picks the most relevant case study and reframes it for the buyer&apos;s industry.</p>
                </div>
                <CaseStudyEditor items={template.case_studies} onChange={v => set("case_studies", v)} />
              </>
            )}

            {/* SUPPORTING TAB */}
            {activeTab === "supporting" && (
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">Stats &amp; Speaking Points</h2>
                  <p className="text-xs text-gray-400">Stats appear in the materials; speaking points inform how Claude frames arguments for each buyer.</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Key Stats</h3>
                  <StatEditor items={template.stats} onChange={v => set("stats", v)} />
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Speaking Points</h3>
                  <SpeakingPointEditor items={template.speaking_points} onChange={v => set("speaking_points", v)} />
                </div>
              </>
            )}
          </div>

          {/* Bottom save */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50 transition-colors"
              style={{ backgroundColor: c }}
            >
              {isSaving ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
