"use client";

import { useState } from "react";
import { CustomerContext } from "@/lib/types";
import { ROLES, INDUSTRIES, STAGES, COMPANY_SIZES } from "@/lib/template";
import { JourneyStage } from "@/lib/db-template";

interface CrmContact {
  name: string;
  title: string;
  company: string;
  industry: string;
  role: string;
  companySize: string;
  lastActivity: string;
  activityNote: string;
}

const MOCK_CONTACTS: CrmContact[] = [
  {
    name: "Marcus Thompson",
    title: "VP of Infrastructure",
    company: "NationalRetail Co",
    industry: "Retail / Omnichannel Commerce",
    role: "VP of Infrastructure / Solutions Architect",
    companySize: "Large Enterprise (50,000+ employees)",
    lastActivity: "Discovery call, 2 weeks ago",
    activityNote: "Mentioned AI readiness pressure from CEO; 19K store footprint is key complexity",
  },
  {
    name: "Sarah Chen",
    title: "Chief Information Officer",
    company: "RegionalBank Group",
    industry: "Financial Services / Banking",
    role: "Chief Information Officer (CIO)",
    companySize: "Enterprise (5,000–50,000 employees)",
    lastActivity: "RFP submitted, last week",
    activityNote: "Down to 2 vendors; technical deep-dive scheduled with architecture team",
  },
  {
    name: "Dr. James Okafor",
    title: "CISO",
    company: "HealthSystem Partners",
    industry: "Healthcare / Health Systems",
    role: "CISO / VP of Information Security",
    companySize: "Enterprise (5,000–50,000 employees)",
    lastActivity: "Security review, 3 days ago",
    activityNote: "HIPAA compliance is primary blocker; needs documentation before legal proceeds",
  },
];

interface InputFormProps {
  onGenerate: (context: CustomerContext) => void;
  isLoading: boolean;
  journeyStages?: JourneyStage[];
  crmProvider?: string;
}

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

export default function InputForm({ onGenerate, isLoading, journeyStages, crmProvider }: InputFormProps) {
  const [form, setForm] = useState<CustomerContext>({
    role: "",
    industry: "",
    stage: "",
    companySize: "",
    transcript: "",
  });
  const [crmModalOpen, setCrmModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(form);
  };

  const isValid = form.role && form.industry && form.stage && form.companySize;

  const filteredContacts = MOCK_CONTACTS.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.industry.toLowerCase().includes(q)
    );
  });

  function importContact(contact: CrmContact) {
    setForm((prev) => ({
      ...prev,
      role: contact.role,
      industry: contact.industry,
      companySize: contact.companySize,
    }));
    setCrmModalOpen(false);
    setSearchQuery("");
    setSearched(false);
  }

  function openModal() {
    setSearchQuery("");
    setSearched(false);
    setCrmModalOpen(true);
  }

  const useJourneyStages = journeyStages && journeyStages.length > 0;
  const crmLabel = crmProvider === "hubspot" ? "HubSpot" : crmProvider === "salesforce" ? "Salesforce" : null;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {crmLabel && (
          <button
            type="button"
            onClick={openModal}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-dashed border-gray-200 rounded-lg text-xs text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import from {crmLabel}
          </button>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Buyer Role <span className="text-red-500">*</span>
          </label>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputCls} required>
            <option value="">Select role...</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Industry <span className="text-red-500">*</span>
          </label>
          <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className={inputCls} required>
            <option value="">Select industry...</option>
            {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Company Size <span className="text-red-500">*</span>
          </label>
          <select value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })} className={inputCls} required>
            <option value="">Select size...</option>
            {COMPANY_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Buying Stage <span className="text-red-500">*</span>
          </label>
          <div className="space-y-1.5">
            {useJourneyStages
              ? journeyStages!.map((s) => (
                  <label key={s.name} className="flex items-start gap-2.5 cursor-pointer group p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="stage"
                      value={s.name}
                      checked={form.stage === s.name}
                      onChange={(e) => setForm({ ...form, stage: e.target.value })}
                      className="mt-0.5 accent-indigo-600 shrink-0"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{s.name}</div>
                      {s.buyer_focus && (
                        <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{s.buyer_focus}</div>
                      )}
                    </div>
                  </label>
                ))
              : STAGES.map((s) => (
                  <label key={s} className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="stage"
                      value={s}
                      checked={form.stage === s}
                      onChange={(e) => setForm({ ...form, stage: e.target.value })}
                      className="mt-0.5 accent-indigo-600"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{s}</span>
                  </label>
                ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Call Transcript
            <span className="ml-1.5 text-xs font-normal text-gray-400">optional — paste notes or transcript</span>
          </label>
          <textarea
            value={form.transcript}
            onChange={(e) => setForm({ ...form, transcript: e.target.value })}
            placeholder="Paste call notes or transcript here. The AI will pull in the buyer's specific language, objections, and pain points..."
            rows={6}
            className={inputCls + " resize-none placeholder:text-gray-300"}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </span>
          ) : "Generate Sales Materials"}
        </button>
      </form>

      {/* CRM Modal */}
      {crmModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setCrmModalOpen(false); } }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Import from {crmLabel}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Search contacts to pre-fill the buyer profile</p>
              </div>
              <button onClick={() => setCrmModalOpen(false)} className="text-gray-300 hover:text-gray-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 pt-4 pb-3">
              <div className="flex gap-2">
                <input
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setSearched(true); }}
                  onKeyDown={(e) => e.key === "Enter" && setSearched(true)}
                  placeholder="Name, company, or role..."
                  className={inputCls}
                  autoFocus
                />
                <button
                  onClick={() => setSearched(true)}
                  className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors shrink-0"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="px-6 pb-6 max-h-80 overflow-y-auto">
              {!searched ? (
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 mb-2">Recent contacts</p>
                  {MOCK_CONTACTS.map((contact, i) => (
                    <ContactRow key={i} contact={contact} onImport={importContact} />
                  ))}
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-400">No contacts found</p>
                  <p className="text-xs text-gray-300 mt-1">Try a different name, company, or role</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 mb-2">{filteredContacts.length} contact{filteredContacts.length !== 1 ? "s" : ""} found</p>
                  {filteredContacts.map((contact, i) => (
                    <ContactRow key={i} contact={contact} onImport={importContact} />
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-400">
                  Prototype mode — showing sample contacts. Configure your API token in Content Admin → Output &amp; CRM to connect live data.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ContactRow({ contact, onImport }: { contact: CrmContact; onImport: (c: CrmContact) => void }) {
  return (
    <button
      onClick={() => onImport(contact)}
      className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900">{contact.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">{contact.title} · {contact.company}</div>
          <div className="text-xs text-gray-400 mt-1 leading-relaxed">{contact.activityNote}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs text-gray-300 mb-1">{contact.lastActivity}</div>
          <span className="text-xs font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">Import →</span>
        </div>
      </div>
    </button>
  );
}
