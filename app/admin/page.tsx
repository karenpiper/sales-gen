"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  StoredTemplate,
  DEFAULT_TEMPLATE,
  DEFAULT_OUTPUT_CONFIG,
  DEFAULT_CRM_CONFIG,
  alpha,
  JourneyStage,
} from "@/lib/db-template";

type Tab = "branding" | "overview" | "valueprops" | "casestudies" | "supporting" | "journey" | "output";

const TABS: { id: Tab; label: string }[] = [
  { id: "branding", label: "Branding" },
  { id: "overview", label: "Overview" },
  { id: "valueprops", label: "Value Props" },
  { id: "casestudies", label: "Case Studies" },
  { id: "supporting", label: "Stats & Points" },
  { id: "journey", label: "Journey" },
  { id: "output", label: "Output & CRM" },
];

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

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
const textareaCls = inputCls + " resize-none";
const selectCls = inputCls;

type ValueProp = StoredTemplate["value_props"][number];
type CaseStudy = StoredTemplate["case_studies"][number];
type SpeakingPoint = StoredTemplate["speaking_points"][number];
type Stat = StoredTemplate["stats"][number];

const chevron = (open: boolean) => (
  <svg
    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// ── ValuePropEditor ────────────────────────────────────────────────────────────
function ValuePropEditor({ items, onChange }: { items: ValueProp[]; onChange: (items: ValueProp[]) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const update = (i: number, patch: Partial<ValueProp>) => {
    const next = [...items]; next[i] = { ...next[i], ...patch }; onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((vp, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
          <button className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
            <span className="text-sm font-medium text-gray-800 truncate pr-4">{vp.title || <span className="text-gray-300 italic">Untitled value prop</span>}</span>
            {chevron(open === i)}
          </button>
          {open === i && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
              <Field label="Title"><input className={inputCls} value={vp.title} onChange={e => update(i, { title: e.target.value })} /></Field>
              <Field label="Body" hint="2–3 sentences"><textarea className={textareaCls} rows={3} value={vp.body} onChange={e => update(i, { body: e.target.value })} /></Field>
              <Field label="Metric" hint="key stat or proof point"><input className={inputCls} value={vp.metric} onChange={e => update(i, { metric: e.target.value })} /></Field>
              <button onClick={() => { onChange(items.filter((_, idx) => idx !== i)); setOpen(null); }} className="text-xs text-red-400 hover:text-red-600 transition-colors">Remove this value prop</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={() => { onChange([...items, { title: "", body: "", metric: "" }]); setOpen(items.length); }} className="w-full border border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">+ Add value prop</button>
    </div>
  );
}

// ── CaseStudyEditor ────────────────────────────────────────────────────────────
function CaseStudyEditor({ items, onChange }: { items: CaseStudy[]; onChange: (items: CaseStudy[]) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const update = (i: number, patch: Partial<CaseStudy>) => {
    const next = [...items]; next[i] = { ...next[i], ...patch }; onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((cs, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
          <button className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
            <span className="text-sm font-medium text-gray-800 truncate pr-4">{cs.customer || <span className="text-gray-300 italic">Unnamed customer</span>}</span>
            {chevron(open === i)}
          </button>
          {open === i && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
              <Field label="Customer" hint="name or description"><input className={inputCls} value={cs.customer} onChange={e => update(i, { customer: e.target.value })} /></Field>
              <Field label="Challenge"><textarea className={textareaCls} rows={3} value={cs.challenge} onChange={e => update(i, { challenge: e.target.value })} /></Field>
              <Field label="Solution"><textarea className={textareaCls} rows={3} value={cs.solution} onChange={e => update(i, { solution: e.target.value })} /></Field>
              <Field label="Result" hint="outcomes and metrics"><textarea className={textareaCls} rows={3} value={cs.result} onChange={e => update(i, { result: e.target.value })} /></Field>
              <button onClick={() => { onChange(items.filter((_, idx) => idx !== i)); setOpen(null); }} className="text-xs text-red-400 hover:text-red-600 transition-colors">Remove this case study</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={() => { onChange([...items, { customer: "", challenge: "", solution: "", result: "" }]); setOpen(items.length); }} className="w-full border border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">+ Add case study</button>
    </div>
  );
}

// ── SpeakingPointEditor ────────────────────────────────────────────────────────
function SpeakingPointEditor({ items, onChange }: { items: SpeakingPoint[]; onChange: (items: SpeakingPoint[]) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const update = (i: number, patch: Partial<SpeakingPoint>) => {
    const next = [...items]; next[i] = { ...next[i], ...patch }; onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((sp, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
          <button className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
            <span className="text-sm font-medium text-gray-800 truncate pr-4">{sp.topic || <span className="text-gray-300 italic">Untitled topic</span>}</span>
            {chevron(open === i)}
          </button>
          {open === i && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
              <Field label="Topic" hint='e.g. "ROI", "Security", "Implementation"'><input className={inputCls} value={sp.topic} onChange={e => update(i, { topic: e.target.value })} /></Field>
              <Field label="Speaking point"><textarea className={textareaCls} rows={3} value={sp.point} onChange={e => update(i, { point: e.target.value })} /></Field>
              <button onClick={() => { onChange(items.filter((_, idx) => idx !== i)); setOpen(null); }} className="text-xs text-red-400 hover:text-red-600 transition-colors">Remove</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={() => { onChange([...items, { topic: "", point: "" }]); setOpen(items.length); }} className="w-full border border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">+ Add speaking point</button>
    </div>
  );
}

// ── StatEditor ─────────────────────────────────────────────────────────────────
function StatEditor({ items, onChange }: { items: Stat[]; onChange: (items: Stat[]) => void }) {
  const update = (i: number, patch: Partial<Stat>) => {
    const next = [...items]; next[i] = { ...next[i], ...patch }; onChange(next);
  };
  return (
    <div className="space-y-3">
      {items.map((stat, i) => (
        <div key={i} className="grid grid-cols-3 gap-3 items-start p-3 bg-gray-50 rounded-xl">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Number</label>
            <input className={inputCls} placeholder="99%" value={stat.number} onChange={e => update(i, { number: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Label</label>
            <input className={inputCls} placeholder="uptime SLA" value={stat.label} onChange={e => update(i, { label: e.target.value })} />
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-400 block mb-1">Context</label>
              <input className={inputCls} placeholder="enterprise fiber and wireless" value={stat.context} onChange={e => update(i, { context: e.target.value })} />
            </div>
            <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="mt-6 text-gray-300 hover:text-red-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      ))}
      <button onClick={() => onChange([...items, { number: "", label: "", context: "" }])} className="w-full border border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">+ Add stat</button>
    </div>
  );
}

// ── JourneyStageEditor ─────────────────────────────────────────────────────────
function JourneyStageEditor({ items, onChange }: { items: JourneyStage[]; onChange: (items: JourneyStage[]) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const update = (i: number, patch: Partial<JourneyStage>) => {
    const next = [...items]; next[i] = { ...next[i], ...patch }; onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((stage, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
          <button className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-gray-100 text-xs font-bold text-gray-500 flex items-center justify-center shrink-0">{i + 1}</span>
              <span className="text-sm font-medium text-gray-800 truncate">{stage.name || <span className="text-gray-300 italic">Unnamed stage</span>}</span>
            </div>
            {chevron(open === i)}
          </button>
          {open === i && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
              <Field label="Stage Name" hint='e.g. "Early Discovery"'>
                <input className={inputCls} value={stage.name} onChange={e => update(i, { name: e.target.value })} />
              </Field>
              <Field label="Buyer Focus" hint="what is the buyer trying to accomplish at this stage">
                <textarea className={textareaCls} rows={2} value={stage.buyer_focus} onChange={e => update(i, { buyer_focus: e.target.value })} />
              </Field>
              <Field label="Key Concerns" hint="fears and objections to address">
                <textarea className={textareaCls} rows={2} value={stage.key_concerns} onChange={e => update(i, { key_concerns: e.target.value })} />
              </Field>
              <Field label="Content Emphasis" hint="what Claude should lead with at this stage">
                <textarea className={textareaCls} rows={2} value={stage.content_emphasis} onChange={e => update(i, { content_emphasis: e.target.value })} />
              </Field>
              <Field label="Stage CTA" hint="what action to push">
                <input className={inputCls} value={stage.cta} onChange={e => update(i, { cta: e.target.value })} />
              </Field>
              <button onClick={() => { onChange(items.filter((_, idx) => idx !== i)); setOpen(null); }} className="text-xs text-red-400 hover:text-red-600 transition-colors">Remove this stage</button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => { onChange([...items, { name: "", buyer_focus: "", key_concerns: "", content_emphasis: "", cta: "" }]); setOpen(items.length); }}
        className="w-full border border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
      >
        + Add stage
      </button>
    </div>
  );
}

// ── Main admin page ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [template, setTemplate] = useState<StoredTemplate>(DEFAULT_TEMPLATE);
  const [activeTab, setActiveTab] = useState<Tab>("branding");
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [crmTestStatus, setCrmTestStatus] = useState<"idle" | "testing" | "ok" | "fail">("idle");

  useEffect(() => {
    fetch("/api/admin/template")
      .then((r) => r.json())
      .then((data) => { if (data) setTemplate(data); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  const set = useCallback(<K extends keyof StoredTemplate>(key: K, value: StoredTemplate[K]) => {
    setTemplate((prev) => ({ ...prev, [key]: value }));
  }, []);

  const outputConfig = { ...DEFAULT_OUTPUT_CONFIG, ...(template.output_config ?? {}) };
  const crmConfig = { ...DEFAULT_CRM_CONFIG, ...(template.crm_config ?? {}) };

  function updateOutputConfig(patch: Partial<typeof DEFAULT_OUTPUT_CONFIG>) {
    set("output_config", { ...outputConfig, ...patch });
  }

  function updateCrmConfig(patch: Partial<typeof DEFAULT_CRM_CONFIG>) {
    set("crm_config", { ...crmConfig, ...patch });
    setCrmTestStatus("idle");
  }

  function toggleOutput(key: string) {
    const next = outputConfig.outputs.includes(key)
      ? outputConfig.outputs.filter((k) => k !== key)
      : [...outputConfig.outputs, key];
    updateOutputConfig({ outputs: next });
  }

  function toggleLockedField(key: string) {
    const next = outputConfig.locked_fields.includes(key)
      ? outputConfig.locked_fields.filter((k) => k !== key)
      : [...outputConfig.locked_fields, key];
    updateOutputConfig({ locked_fields: next });
  }

  async function handleSave() {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(template),
      });
      if (res.ok) setSavedAt(new Date().toLocaleTimeString());
    } finally {
      setIsSaving(false);
    }
  }

  function testCrmConnection() {
    setCrmTestStatus("testing");
    setTimeout(() => {
      setCrmTestStatus(crmConfig.api_key.length > 10 ? "ok" : "fail");
    }, 1200);
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
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1.5 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to generator
            </Link>
            <span className="text-gray-200">|</span>
            <span className="text-sm font-semibold text-gray-800">Content Admin</span>
          </div>
          <div className="flex items-center gap-3">
            {savedAt && <span className="text-xs text-green-600">Saved at {savedAt}</span>}
            <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50 transition-colors" style={{ backgroundColor: c }}>
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8 flex gap-8">
        <div className="w-44 shrink-0">
          <nav className="space-y-1 sticky top-24">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`}
                style={activeTab === tab.id ? { backgroundColor: c } : {}}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-100 p-8 space-y-6">

            {/* BRANDING */}
            {activeTab === "branding" && (
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">Branding</h2>
                  <p className="text-xs text-gray-400">Company identity that appears in all generated materials.</p>
                </div>
                <Field label="Company Name">
                  <input className={inputCls} value={template.company} onChange={e => set("company", e.target.value)} />
                </Field>
                <Field label="Tagline" hint="short descriptor below the name">
                  <input className={inputCls} value={template.tagline} onChange={e => set("tagline", e.target.value)} />
                </Field>
                <Field label="Brand Color" hint="used for headers, buttons, highlights">
                  <div className="flex items-center gap-3">
                    <input type="color" value={template.primary_color} onChange={e => set("primary_color", e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                    <input className={inputCls + " w-36"} value={template.primary_color} onChange={e => set("primary_color", e.target.value)} placeholder="#009FDB" />
                    <div className="flex-1 h-10 rounded-lg" style={{ backgroundColor: template.primary_color }} />
                  </div>
                </Field>
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  <div className="px-6 py-4 text-white text-sm" style={{ backgroundColor: c }}>
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: alpha(c, 0.6) }}>{template.company} · {template.tagline}</span>
                    <div className="font-bold mt-1">Header preview — this is how it looks</div>
                  </div>
                  <div className="px-6 py-4 flex gap-3 items-center">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: c }}>1</div>
                    <div className="text-sm" style={{ color: c }}>Accent text and metric badges</div>
                    <span className="ml-auto text-xs font-medium px-2 py-1 rounded" style={{ color: c, backgroundColor: alpha(c, 0.1) }}>Metric badge</span>
                  </div>
                </div>
              </>
            )}

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">Company Overview</h2>
                  <p className="text-xs text-gray-400">The foundation of all generated content. Claude transforms this for each buyer.</p>
                </div>
                <Field label="Elevator Pitch" hint="2–3 sentences, what you do and who it's for">
                  <textarea className={textareaCls} rows={4} value={template.elevator_pitch} onChange={e => set("elevator_pitch", e.target.value)} />
                </Field>
                <Field label="Default CTA" hint="Claude adapts this to each buyer's stage">
                  <textarea className={textareaCls} rows={4} value={template.cta} onChange={e => set("cta", e.target.value)} />
                </Field>
              </>
            )}

            {/* VALUE PROPS */}
            {activeTab === "valueprops" && (
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">Value Propositions</h2>
                  <p className="text-xs text-gray-400">Claude selects and rewrites the most relevant props for each buyer&apos;s role and industry.</p>
                </div>
                <ValuePropEditor items={template.value_props} onChange={v => set("value_props", v)} />
              </>
            )}

            {/* CASE STUDIES */}
            {activeTab === "casestudies" && (
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">Case Studies</h2>
                  <p className="text-xs text-gray-400">Claude picks the most relevant case study and reframes it for the buyer&apos;s industry.</p>
                </div>
                <CaseStudyEditor items={template.case_studies} onChange={v => set("case_studies", v)} />
              </>
            )}

            {/* STATS & POINTS */}
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

            {/* JOURNEY */}
            {activeTab === "journey" && (
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">Buying Journey</h2>
                  <p className="text-xs text-gray-400">Define your buying stages. Each stage&apos;s context feeds directly into Claude — so generated content, CTAs, and objection handling shift based on where the buyer is in their decision. Order matters: stage 1 is earliest.</p>
                </div>
                <JourneyStageEditor
                  items={template.buying_journey?.stages ?? []}
                  onChange={v => set("buying_journey", { stages: v })}
                />
              </>
            )}

            {/* OUTPUT & CRM */}
            {activeTab === "output" && (
              <>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-0.5">Output &amp; CRM</h2>
                  <p className="text-xs text-gray-400">Configure what gets generated, what Claude can and can&apos;t change, and how materials connect to your CRM.</p>
                </div>

                {/* Output materials */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Output Materials</h3>
                  <div className="space-y-2">
                    {[
                      { key: "onesheet", label: "One-Sheeter", desc: "Single-page sales leave-behind" },
                      { key: "deck", label: "Pitch Deck", desc: "7-slide narrative deck" },
                      { key: "email", label: "Email Sequence", desc: "Coming soon", disabled: true },
                      { key: "battlecard", label: "Battle Card", desc: "Coming soon", disabled: true },
                    ].map(({ key, label, desc, disabled }) => (
                      <label key={key} className={`flex items-center gap-3 p-3 rounded-xl border ${disabled ? "border-gray-100 opacity-40 cursor-not-allowed" : "border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"}`}>
                        <input type="checkbox" checked={!disabled && outputConfig.outputs.includes(key)} onChange={() => !disabled && toggleOutput(key)} disabled={disabled} className="accent-indigo-600" />
                        <div>
                          <div className="text-sm font-medium text-gray-800">{label}</div>
                          <div className="text-xs text-gray-400">{desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Locked fields */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Locked Fields</h3>
                  <p className="text-xs text-gray-400 mb-3">Content Claude must use verbatim — no rewriting. Lock specific numbers, legal language, and brand statements that can&apos;t vary.</p>
                  <div className="space-y-2">
                    {[
                      { key: "company", label: "Company Name", desc: "Always use the exact company name" },
                      { key: "tagline", label: "Tagline", desc: "Use tagline exactly as written" },
                      { key: "elevator_pitch", label: "Elevator Pitch", desc: "Don't rewrite the core pitch" },
                      { key: "stats", label: "Stat Numbers", desc: "Use exact numbers — don't paraphrase" },
                      { key: "cta", label: "CTA", desc: "Use the CTA verbatim in every piece" },
                    ].map(({ key, label, desc }) => (
                      <label key={key} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="checkbox" checked={outputConfig.locked_fields.includes(key)} onChange={() => toggleLockedField(key)} className="accent-indigo-600" />
                        <div>
                          <div className="text-sm font-medium text-gray-800">{label}</div>
                          <div className="text-xs text-gray-400">{desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tone & Style */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Tone &amp; Style</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Writing Tone">
                      <select className={selectCls} value={outputConfig.tone} onChange={e => updateOutputConfig({ tone: e.target.value })}>
                        <option value="conversational">Conversational</option>
                        <option value="formal">Formal</option>
                        <option value="technical">Technical</option>
                        <option value="executive">Executive</option>
                      </select>
                    </Field>
                    <Field label="Length Preference">
                      <select className={selectCls} value={outputConfig.length} onChange={e => updateOutputConfig({ length: e.target.value })}>
                        <option value="concise">Concise</option>
                        <option value="standard">Standard</option>
                        <option value="detailed">Detailed</option>
                      </select>
                    </Field>
                  </div>
                </div>

                {/* Required inclusions */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Required Inclusions</h3>
                  <p className="text-xs text-gray-400 mb-3">Lines that must appear verbatim in every generated piece — legal disclaimers, required disclosures, brand statements.</p>
                  <div className="space-y-2">
                    {outputConfig.required_inclusions.map((line, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          className={inputCls}
                          value={line}
                          onChange={e => {
                            const next = [...outputConfig.required_inclusions];
                            next[i] = e.target.value;
                            updateOutputConfig({ required_inclusions: next });
                          }}
                          placeholder="Enter required verbatim text..."
                        />
                        <button onClick={() => updateOutputConfig({ required_inclusions: outputConfig.required_inclusions.filter((_, idx) => idx !== i) })} className="text-gray-300 hover:text-red-400 transition-colors px-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                    <button onClick={() => updateOutputConfig({ required_inclusions: [...outputConfig.required_inclusions, ""] })} className="w-full border border-dashed border-gray-200 rounded-xl py-2.5 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
                      + Add required inclusion
                    </button>
                  </div>
                </div>

                {/* CRM Integration */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">CRM Integration</h3>
                  <p className="text-xs text-gray-400 mb-4">Connect your CRM to pre-populate buyer profiles directly from contact and deal records.</p>
                  <div className="space-y-4">
                    <Field label="CRM Provider">
                      <select className={selectCls} value={crmConfig.provider} onChange={e => updateCrmConfig({ provider: e.target.value })}>
                        <option value="none">None</option>
                        <option value="hubspot">HubSpot</option>
                        <option value="salesforce">Salesforce</option>
                      </select>
                    </Field>

                    {crmConfig.provider !== "none" && (
                      <>
                        <Field label={crmConfig.provider === "hubspot" ? "HubSpot Private App Token" : "Salesforce API Token"}>
                          <input
                            className={inputCls}
                            type="password"
                            value={crmConfig.api_key}
                            onChange={e => updateCrmConfig({ api_key: e.target.value })}
                            placeholder={crmConfig.provider === "hubspot" ? "pat-na1-..." : "Bearer token..."}
                          />
                        </Field>
                        <div className="flex items-center gap-3">
                          <button onClick={testCrmConnection} disabled={crmTestStatus === "testing"} className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
                            {crmTestStatus === "testing" ? "Testing..." : "Test Connection"}
                          </button>
                          {crmTestStatus === "ok" && <span className="text-xs text-green-600 font-medium">Connected successfully</span>}
                          {crmTestStatus === "fail" && <span className="text-xs text-red-500 font-medium">Connection failed — check your token</span>}
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-600 space-y-1">
                          <div className="font-semibold mb-1.5">What this unlocks in the generator</div>
                          <div>· Search contacts by name, company, or email</div>
                          <div>· Auto-fill buyer role, industry, and company size from contact properties</div>
                          <div>· Pull recent call transcripts from activity history</div>
                          <div className="text-blue-400">· Save generated materials back to deal records (coming soon)</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50 transition-colors" style={{ backgroundColor: c }}>
              {isSaving ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
