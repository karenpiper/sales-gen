"use client";

import { useState } from "react";
import { CustomerContext } from "@/lib/types";
import { ROLES, INDUSTRIES, STAGES, COMPANY_SIZES } from "@/lib/template";

interface InputFormProps {
  onGenerate: (context: CustomerContext) => void;
  isLoading: boolean;
}

export default function InputForm({ onGenerate, isLoading }: InputFormProps) {
  const [form, setForm] = useState<CustomerContext>({
    role: "",
    industry: "",
    stage: "",
    companySize: "",
    transcript: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(form);
  };

  const isValid = form.role && form.industry && form.stage && form.companySize;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Buyer Role <span className="text-red-500">*</span>
        </label>
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        >
          <option value="">Select role...</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Industry <span className="text-red-500">*</span>
        </label>
        <select
          value={form.industry}
          onChange={(e) => setForm({ ...form, industry: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        >
          <option value="">Select industry...</option>
          {INDUSTRIES.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Company Size <span className="text-red-500">*</span>
        </label>
        <select
          value={form.companySize}
          onChange={(e) => setForm({ ...form, companySize: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        >
          <option value="">Select size...</option>
          {COMPANY_SIZES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Buying Stage <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {STAGES.map((s) => (
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
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none placeholder:text-gray-300"
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
        ) : (
          "Generate Sales Materials"
        )}
      </button>
    </form>
  );
}
