export const BASE_TEMPLATE = {
  company: "AT&T Business",
  tagline: "Enterprise Connectivity & Solutions",
  elevator_pitch:
    "AT&T Business brings 150+ years of network expertise to the moment enterprise connectivity matters most — when buying committees are overwhelmed by AI vendor noise and need a partner who understands their specific industry, not just their bandwidth requirements. We don't pitch technology. We translate it into outcomes your board, your IT team, and your legal team can all get behind.",

  value_props: [
    {
      title: "Expert-to-Expert Engagement",
      body: "AT&T Business matches every member of your buying group with a peer-level specialist who speaks their language. Your infrastructure lead talks to ours. Your CFO gets a CFO-caliber business case, not a spec sheet. Your legal team gets documented compliance answers, not promises. We call it nerd-to-nerd — and it's why our deals close when competitors stall.",
      metric: "80% of enterprise buyers say industry-specific expertise is their #1 selection criterion",
    },
    {
      title: "AI-Ready Network Infrastructure",
      body: "93% of enterprise buyers say AI is already reshaping their connectivity requirements — but most networks weren't built for it. AT&T's fiber and wireless infrastructure is purpose-engineered for the bandwidth, latency, and security demands of AI workloads, edge computing, and hybrid cloud architectures at scale.",
      metric: "99.9% uptime SLA across our enterprise-grade fiber and wireless network",
    },
    {
      title: "Implementation You Can Count On",
      body: "AT&T assigns a dedicated solutions team from first conversation through full deployment. We've documented every migration failure mode across 150 years of infrastructure experience — and built our process around avoiding them. Industry-specific playbooks mean your onboarding reflects how healthcare, retail, or financial services actually operates.",
      metric: "97% of enterprise customers go live within committed project timeline",
    },
  ],

  case_studies: [
    {
      customer: "National Retailer (19,000 locations)",
      challenge:
        "VP of Infrastructure faced intense CEO pressure to modernize for AI after a public earnings call. Dozens of vendor pitches with no clear evaluation framework for their scale — omnichannel operations, real-time inventory AI, and PCI compliance across 19,000 stores. The buying committee was fragmented: IT wanted technical depth, Finance wanted ROI, Legal wanted compliance documentation.",
      solution:
        "AT&T Business engaged each buying group member individually. Infrastructure deep-dive with the VP, board-level ROI narrative for the CFO, full PCI/compliance documentation package for Legal. Proposed a phased migration with dedicated implementation support and weekly milestone reporting.",
      result:
        "Deployment completed 3 weeks ahead of schedule. Network downtime reduced 78%. AI-powered inventory optimization now live across all stores. Became AT&T's largest retail reference account in the region.",
    },
    {
      customer: "Regional Health System (8 hospitals, 40 clinics)",
      challenge:
        "HIPAA compliance requirements were blocking a planned telemedicine expansion. IT team was stretched thin managing existing infrastructure. Multiple vendors promised connectivity solutions but couldn't demonstrate healthcare-specific expertise or provide the compliance documentation the legal team required.",
      solution:
        "AT&T's healthcare specialist team designed a dedicated private network for patient data, integrating with existing Epic and Meditech systems. Delivered a complete HIPAA compliance documentation package prepared specifically for their legal and compliance review process.",
      result:
        "Telemedicine throughput increased 4x within 90 days of go-live. Zero HIPAA findings in the subsequent annual audit. Network operations headcount stayed flat despite adding 40 remote care sites to the infrastructure.",
    },
    {
      customer: "Top 25 US Regional Bank",
      challenge:
        "A series of acquisitions had left the bank running four incompatible network architectures. Core banking modernization required unifying them without any disruption to 24/7 uptime requirements. The risk and compliance team had effectively held veto authority over the previous two vendor evaluations.",
      solution:
        "AT&T designed a consolidated MPLS + SD-WAN architecture with full redundancy and zero-downtime cutover windows. Provided the risk and compliance team a dedicated governance framework with contractual SLA commitments. Migration was phased across 18 months with weekly executive briefings.",
      result:
        "Network operating costs reduced 34%. Compliance team signed off in under 6 weeks — the fastest vendor approval in their procurement history. Core banking modernization project unblocked, delivering $18M in projected annual efficiency savings.",
    },
  ],

  speaking_points: [
    {
      topic: "ROI and Business Case",
      point:
        "Enterprise connectivity decisions stall at the CFO stage when ROI is expressed in uptime percentages rather than dollars. We build the business case from your actual cost structure — downtime cost per hour, transaction volume at risk, AI productivity multiplier, and compliance exposure. Your financial approver gets a model they can defend to the board, not a vendor estimate.",
    },
    {
      topic: "Implementation Roadmap",
      point:
        "The biggest risk in a connectivity migration isn't the technology — it's what the vendor doesn't tell you about the transition period. We give process owners a week-by-week implementation plan, dedicated change management support, and SLA commitments that are contractually binding. Scope creep and hidden complexity are the top two fears we eliminate before contract signature.",
    },
    {
      topic: "Technical Architecture",
      point:
        "Our solutions architects carry current credentials in the platforms you're already running. Before we propose anything, we document your current-state architecture and show exactly what changes — and what doesn't. We don't propose rip-and-replace when a targeted augmentation achieves the same outcome. Your team can verify everything we claim.",
    },
    {
      topic: "Security and Compliance",
      point:
        "We've built compliance frameworks for healthcare, financial services, retail, and government — which means your legal and security team isn't starting from scratch. We deliver the documentation package they need to evaluate us, and we've answered every question they're likely to raise before they raise it. Legal approval typically runs 40% faster than industry average.",
    },
    {
      topic: "AI Transformation Readiness",
      point:
        "93% of enterprise buyers say AI is already reshaping their connectivity requirements — but most haven't updated their network contracts to reflect it. We audit your current infrastructure against projected AI workload demands and identify the gaps before a vendor failure or a board-level incident forces the conversation. This is the briefing your CTO and CIO should have before any AI initiative goes to procurement.",
    },
    {
      topic: "Industry Expertise Proof",
      point:
        "Anyone can claim industry expertise. We prove ours by deploying vertical specialists — not generalists — who carry industry certifications, have prior operator experience in your sector, and can walk your team through how we've solved your specific problem for comparable organizations. Ask us for reference customers in your industry and your company size. We'll have them on a call within a week.",
    },
  ],

  stats: [
    { number: "93%", label: "of buyers say AI is reshaping connectivity needs", context: "AT&T Business Buyer Sentiment Survey, 2026" },
    { number: "80%", label: "prioritize industry-specific expertise", context: "top selection criterion for enterprise providers" },
    { number: "150+", label: "years of network infrastructure expertise", context: "since the invention of the telephone" },
    { number: "99.9%", label: "enterprise network uptime SLA", context: "across fiber and wireless infrastructure" },
    { number: "34%", label: "average reduction in network operating costs", context: "post-migration across enterprise customers" },
    { number: "97%", label: "on-time delivery rate", context: "enterprise customers live within committed timeline" },
  ],

  cta: "Let's set up a 45-minute expert briefing — matched to your industry and your buying team's specific roles. No pitch deck, no demo. A direct conversation between our specialists and yours about what enterprise AI readiness actually requires and where your current infrastructure stands.",
};

export const SAMPLE_TRANSCRIPT = `[Discovery call — AT&T Business AE with Marcus T., VP Infrastructure, National Retail Co.]

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

AE: Understood. We'll bring the compliance package to the next call. Let's get something on the calendar.`;

export const ROLES = [
  "Chief Technology Officer (CTO)",
  "Chief Information Officer (CIO)",
  "VP of Infrastructure / Solutions Architect",
  "VP of Network Operations",
  "CISO / VP of Information Security",
  "Chief Financial Officer (CFO)",
  "CEO / President",
  "VP of Digital Transformation",
  "Director of Enterprise Architecture",
  "Director of IT Operations",
  "General Counsel / VP Legal",
  "VP of Procurement",
];

export const INDUSTRIES = [
  "Financial Services / Banking",
  "Insurance",
  "Healthcare / Health Systems",
  "Retail / Omnichannel Commerce",
  "Manufacturing",
  "Logistics / Supply Chain",
  "Government / Public Sector",
  "Energy / Utilities",
  "Technology / SaaS",
  "Professional Services",
  "Media & Entertainment",
  "Real Estate",
];

export const STAGES = [
  "Early Discovery — learning about the space",
  "Evaluating Solutions — building a shortlist",
  "Late Evaluation — down to 2–3 vendors",
  "Ready to Buy — needs approval / business case",
];

export const COMPANY_SIZES = [
  "SMB (under 500 employees)",
  "Mid-Market (500–5,000 employees)",
  "Enterprise (5,000–50,000 employees)",
  "Large Enterprise (50,000+ employees)",
];
