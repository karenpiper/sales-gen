"use client";

import { useState } from "react";
import Link from "next/link";

interface Transcript {
  id: string;
  persona: string;
  role: string;
  company: string;
  stage: string;
  industry: string;
  summary: string;
  text: string;
}

const TRANSCRIPTS: Transcript[] = [
  {
    id: "marcus",
    persona: "Marcus Thompson",
    role: "VP of Infrastructure",
    company: "NationalRetail Co",
    stage: "Early Discovery",
    industry: "Retail / Omnichannel Commerce",
    summary: "CEO just made AI a board-level priority after a rough earnings call. Marcus is fielding vendor noise and hasn't started evaluating yet. He knows his legacy network can't support what's being asked of it.",
    text: `[Discovery call — AT&T Business AE with Marcus T., VP Infrastructure, NationalRetail Co]

AE: Marcus, appreciate you making time. I know you've had a lot of vendors in your inbox since the earnings call. I want to skip the pitch and just understand what you're actually dealing with. What does your infrastructure look like across the store footprint right now?

Marcus: We're running a mix — MPLS to the distribution centers, broadband at the stores, and we've got some SD-WAN pilots in the Northeast that I honestly don't have enough bandwidth to properly evaluate. The CEO came out of that earnings call talking about "AI everywhere" and now I've got 14 vendors in my inbox and no way to filter any of them.

AE: That's pretty much what I expected. The AI narrative is hitting retail infrastructure teams hard right now. Can I ask — when the CEO says "AI," what's the use case he's actually talking about internally? Is it inventory, customer experience, loss prevention?

Marcus: All of it, honestly. Inventory optimization is the loudest one because that's where we took the hit publicly. But we also have a real-time loss prevention initiative that's been in planning for two years and keeps getting blocked because our in-store network can't support the camera and edge compute requirements.

AE: The camera and edge problem is almost always a last-mile bandwidth issue plus latency. What's your current uplink at a typical store — is it a single circuit or do you have redundancy?

Marcus: Single circuit at about 70% of locations. It's a legacy decision and I know it's a problem. But replacing circuits across 19,000 stores is not something I can just decide on a Tuesday.

AE: Right — that's a phased conversation, not a rip-and-replace. Let me ask you a different question. When this eventually goes to your CFO for budget approval, what does she need to see to say yes?

Marcus: She needs to see a number she can defend. Not "improved network performance." An actual dollar figure tied to inventory accuracy or shrink reduction. We lost real margin to shrink last year and everyone knows it.

AE: We can build that model. We've done it for three other retailers in your size range. I'd want to pull in one of our retail specialists — she came out of supply chain operations before AT&T, she's done this exact analysis. Can we get her on a follow-up call with you and maybe your finance lead?

Marcus: Yeah, that would actually be useful. I've had a lot of conversations with people who know networking but don't know retail. If she's got actual operations context, that's different.

AE: Good. One more thing before we wrap — is your legal team going to be in this evaluation? I ask because PCI compliance at store scale is usually where deals slow down and I'd rather get them the documentation they need early.

Marcus: Yes, they'll be involved. And they've killed two vendor conversations already because the security documentation wasn't there.

AE: Understood. We'll bring the compliance package to the next call. Let's get something on the calendar.`,
  },
  {
    id: "sarah",
    persona: "Sarah Chen",
    role: "Chief Information Officer",
    company: "RegionalBank Group",
    stage: "Evaluating Solutions",
    industry: "Financial Services / Banking",
    summary: "Three acquisitions in four years left the bank on four incompatible network architectures. Sarah is actively shortlisting vendors for consolidation. She's technical and skeptical — previous vendors promised simplicity and delivered complexity.",
    text: `[Evaluation call — AT&T Business AE with Sarah Chen, CIO, RegionalBank Group]

AE: Sarah, thanks for the time. I know you're actively evaluating right now so I'll be direct — what's the primary criterion you're using to narrow the shortlist?

Sarah: Honestly? Proof that you've done this before at our scale, with our constraints. We're not a greenfield. We've got four network architectures from three acquisitions, a core banking platform that cannot go down, and a risk committee that will scrutinize everything before they sign anything.

AE: What does "done this before" look like to you — are you looking for reference customers, for technical documentation, or for something else?

Sarah: Both. I want a reference call with a bank that ran a migration of similar complexity without a major incident. And I want your solutions architect in a room with my team explaining exactly what changes and what doesn't during cutover. The last vendor we evaluated had a beautiful deck and couldn't answer basic questions about our specific topology.

AE: That's fair. Can I ask about the core banking constraint specifically — what's the actual uptime requirement? Is it 99.99%, contractual SLA, or something more informal?

Sarah: It's contractual. We have 15-minute maximum downtime windows twice a year for scheduled maintenance. Everything else is unplanned and unacceptable. The migration has to happen inside those windows or in parallel with zero impact to the live environment.

AE: That's a zero-downtime migration requirement. We've done it — that's actually the architecture we'd propose, not a cutover. We'd run parallel environments through the transition. I want to be honest with you though — that adds 4–6 weeks to the timeline versus a hard cutover. Is that a trade-off you can make?

Sarah: That's the right trade-off. Timeline flexibility is easier to sell internally than downtime risk.

AE: Good. One thing I want to flag early — your risk and compliance team. How involved are they going to be, and what have they required from previous vendor evaluations?

Sarah: They've vetoed two vendors already. What they need is a governance framework — not just SOC 2. They want to understand the change management process, the rollback plan, who owns what during the migration, and how incidents get escalated. One of the vendors we cut actually had better technology than the one we kept, but their security documentation was a mess.

AE: We have a standard governance package for financial services that addresses exactly that. I'd suggest we get your risk team on a call with our compliance team before we get too far into the technical evaluation — so they're not a bottleneck at the end.

Sarah: That's the right instinct. The last time we did it the other way around we wasted three months.

AE: Let's make that the next step then. Who on your risk team owns vendor evaluations?

Sarah: That would be our Chief Risk Officer and our head of information security. I'll set it up.`,
  },
  {
    id: "james",
    persona: "Dr. James Okafor",
    role: "CISO",
    company: "HealthSystem Partners",
    stage: "Late Evaluation",
    industry: "Healthcare / Health Systems",
    summary: "Down to two vendors after a six-month evaluation. James is the security gatekeeper — he's killed deals before and will again. HIPAA compliance documentation is the blocker. He's exhausted by vendor marketing and speaks in specifics.",
    text: `[Late evaluation call — AT&T Business AE with Dr. James Okafor, CISO, HealthSystem Partners]

AE: Dr. Okafor, I know you're deep in the evaluation so I'll get straight to it. What's the remaining gap between us and your other finalist?

James: Documentation. You've told me the right things in every conversation. So has the other vendor. What I don't have yet is the paper that proves it. Specifically: your BAA structure for the private network segment, your incident response SLA for PHI-adjacent events, and your third-party audit results from the last 18 months.

AE: All three of those exist. The BAA and incident response SLA are standard — I can have legal get them to your team by end of week. The third-party audit is more recent than you might expect — we completed a HITRUST assessment in Q4 and the results are available under NDA.

James: HITRUST is more than I expected. That moves things. What's the NDA process on that?

AE: Standard mutual NDA, usually a two-day turnaround. I can initiate it today if you want.

James: Yes, do that. Now the other thing I need to understand — the private network architecture you've proposed. When you say patient data doesn't traverse the public internet, I need that to be a technical reality, not a marketing statement. Walk me through the path.

AE: The architecture uses dedicated private connectivity — physically separate from the public network — between your facilities and the core infrastructure. Traffic doesn't touch the internet at any point. Your data doesn't share infrastructure with other customers. I can get our solutions architect on a call with your network security team to go through the actual topology diagrams.

James: That call needs to happen before I can recommend moving forward. My team will have detailed questions and I need them answered by someone who can actually defend the architecture, not someone who will take notes and follow up.

AE: Understood. That's a better use of everyone's time anyway. What's your team's availability next week?

James: Tuesday afternoon or Thursday morning.

AE: I'll confirm Thursday morning and send the calendar invite with the architect's name and credentials so your team can review their background in advance.

James: Good. One more thing — your implementation team. The other vendor is proposing a shared services model where we'd be one of several active implementations. I want to understand your staffing model.

AE: We assign a dedicated team for the duration of the engagement — not shared across accounts. For a deployment at your scale, that's a project lead, a solutions architect, a healthcare compliance specialist, and a dedicated escalation path to leadership if something goes wrong. They're yours from kickoff through the post-go-live stability period.

James: That's what I needed to hear. Get me the NDA today and confirm Thursday.

AE: Done. I'll send both within the hour.`,
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        copied
          ? "bg-green-50 text-green-600 border border-green-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent"
      }`}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy transcript
        </>
      )}
    </button>
  );
}

const STAGE_COLORS: Record<string, string> = {
  "Early Discovery": "bg-blue-50 text-blue-600",
  "Evaluating Solutions": "bg-amber-50 text-amber-600",
  "Late Evaluation": "bg-orange-50 text-orange-600",
  "Ready to Buy": "bg-green-50 text-green-600",
};

export default function TranscriptsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1.5 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to generator
            </Link>
            <span className="text-gray-200">|</span>
            <span className="text-sm font-semibold text-gray-800">Example Transcripts</span>
          </div>
          <Link
            href="/"
            className="text-xs font-medium text-white px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Open generator →
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Example Call Transcripts</h1>
          <p className="text-sm text-gray-500 max-w-2xl">
            Copy any of these into the transcript field in the generator to see how SalesLens personalizes content for different buyer profiles and stages. Each transcript represents a distinct buying persona and stage in the AT&T Business journey.
          </p>
        </div>

        <div className="space-y-4">
          {TRANSCRIPTS.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap mb-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STAGE_COLORS[t.stage] ?? "bg-gray-100 text-gray-500"}`}>
                        {t.stage}
                      </span>
                      <span className="text-xs text-gray-400">{t.industry}</span>
                    </div>
                    <div className="text-base font-bold text-gray-900">{t.persona}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{t.role} · {t.company}</div>
                    <p className="text-xs text-gray-400 mt-2.5 leading-relaxed max-w-xl">{t.summary}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <CopyButton text={t.text} />
                    <button
                      onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-transparent transition-colors"
                    >
                      {expanded === t.id ? "Hide" : "Preview"}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform ${expanded === t.id ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {expanded === t.id && (
                <div className="border-t border-gray-100">
                  <div className="px-6 py-4 bg-gray-50">
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed font-mono max-h-96 overflow-y-auto">
                      {t.text}
                    </pre>
                  </div>
                  <div className="px-6 py-3 border-t border-gray-100 flex justify-end">
                    <CopyButton text={t.text} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-blue-50 border border-blue-100 rounded-xl">
          <div className="text-sm font-semibold text-blue-800 mb-1.5">How to use these</div>
          <ol className="text-xs text-blue-700 space-y-1.5 list-decimal list-inside">
            <li>Copy a transcript above</li>
            <li>In the generator, select the matching buyer role, industry, company size, and buying stage</li>
            <li>Paste the transcript into the Call Transcript field</li>
            <li>Generate — the AI will pull in the buyer&apos;s specific language, objections, and concerns</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
