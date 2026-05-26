"use client";

import { useState, useEffect } from "react";
import InputForm from "@/components/InputForm";
import OneSheeter from "@/components/OneSheeter";
import DeckView from "@/components/DeckView";
import { CustomerContext, GeneratedContent } from "@/lib/types";
import { DEFAULT_TEMPLATE, StoredTemplate } from "@/lib/db-template";

type ViewMode = "one_sheeter" | "deck";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("one_sheeter");
  const [template, setTemplate] = useState<StoredTemplate>(DEFAULT_TEMPLATE);

  useEffect(() => {
    fetch("/api/admin/template")
      .then((r) => r.json())
      .then((data) => { if (data) setTemplate(data); })
      .catch(() => {});
  }, []);

  const branding = {
    company: template.company,
    tagline: template.tagline,
    primaryColor: template.primary_color,
  };

  async function handleGenerate(context: CustomerContext) {
    setIsLoading(true);
    setError(null);
    setContent(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(context),
      });

      if (!res.ok) {
        throw new Error("Generation failed");
      }

      const data: GeneratedContent = await res.json();
      setContent(data);
    } catch (err) {
      setError("Something went wrong. Check that ANTHROPIC_API_KEY is set.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900">SalesLens</span>
            <span className="text-gray-300 text-sm">·</span>
            <span className="text-sm text-gray-500">Sales Materials Generator</span>
          </div>
          <div className="flex items-center gap-3">
            {content && (
              <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                {content.customer_label}
              </div>
            )}
            <a href="/admin" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Edit Content
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-8 py-8 flex gap-8">
        {/* Left panel — input */}
        <div className="w-72 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-8">
            <h2 className="text-sm font-bold text-gray-900 mb-1">Buyer Profile</h2>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Tell us about your buyer and we&apos;ll rewrite the materials through their lens.
            </p>
            <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
        </div>

        {/* Right panel — output */}
        <div className="flex-1 min-w-0">
          {!content && !isLoading && !error && (
            <div className="h-80 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">No materials generated yet</h3>
              <p className="text-xs text-gray-400 max-w-xs">
                Fill out the buyer profile on the left and click Generate to see a one-sheeter and pitch deck customized for your buyer.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="h-80 flex flex-col items-center justify-center text-center border border-gray-100 rounded-xl bg-white">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <svg className="animate-spin w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Generating materials...</h3>
              <p className="text-xs text-gray-400">Rewriting everything through your buyer&apos;s lens</p>
            </div>
          )}

          {error && (
            <div className="border border-red-100 bg-red-50 rounded-xl p-6 text-sm text-red-600">
              {error}
            </div>
          )}

          {content && (
            <div className="space-y-5">
              {/* View toggle */}
              <div className="flex items-center justify-between">
                <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                  <button
                    onClick={() => setViewMode("one_sheeter")}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "one_sheeter"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    One-Sheeter
                  </button>
                  <button
                    onClick={() => setViewMode("deck")}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "deck"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Pitch Deck
                  </button>
                </div>
                <button
                  onClick={() => window.print()}
                  className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print / Save PDF
                </button>
              </div>

              {/* Output */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                {viewMode === "one_sheeter" && <OneSheeter content={content} branding={branding} />}
                {viewMode === "deck" && (
                  <div className="p-6">
                    <DeckView content={content} branding={branding} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
