// Base content for Lumina — AI-powered document intelligence platform
// This is the raw material that gets rewritten through the customer's lens

export const BASE_TEMPLATE = {
  company: "Lumina",
  tagline: "Intelligent Document Processing",
  elevator_pitch:
    "Lumina turns unstructured documents into structured, actionable data using AI — automating the manual extraction, classification, and routing work that slows down your most critical business processes.",

  value_props: [
    {
      title: "Extract and Understand Any Document",
      body: "Lumina reads contracts, invoices, forms, reports, and correspondence with human-level comprehension. It extracts the data you need, classifies it correctly, and flags exceptions — without templates or rules configuration.",
      metric: "99.4% extraction accuracy across 300+ document types",
    },
    {
      title: "Plug Into the Systems You Already Use",
      body: "Pre-built connectors for Salesforce, SAP, ServiceNow, Epic, and 80+ enterprise systems. Custom APIs for anything else. Lumina fits into your existing workflows — it doesn't ask you to rebuild them.",
      metric: "Average deployment time: 6 weeks",
    },
    {
      title: "Audit-Ready and Compliant by Design",
      body: "Every extraction decision is logged, explained, and reviewable. SOC 2 Type II, HIPAA, FedRAMP Moderate certified. Role-based access controls and full data lineage from document in to data out.",
      metric: "Zero compliance incidents across 140 enterprise customers",
    },
  ],

  case_studies: [
    {
      customer: "Regional bank (Top 50 US)",
      challenge:
        "Loan origination team processing 4,200 loan packages per month. Each package required manual extraction from 40–60 documents. Turnaround time was 18 days on average; underwriters spent 60% of their time on data entry, not decisions.",
      solution:
        "Lumina automated extraction from all document types in the loan package — income statements, tax returns, property appraisals, title documents. Integrated directly with their LOS system.",
      result:
        "Loan processing time dropped from 18 days to 4.5 days. Underwriter capacity increased 3x. $4.1M annual savings in processing costs. Zero regulatory findings in two subsequent audits.",
    },
    {
      customer: "National health system (12 hospitals)",
      challenge:
        "Prior authorization team handling 22,000 requests per month, with a 31% initial denial rate due to missing or mismatched documentation. Staff of 85 dedicated to the process.",
      solution:
        "Lumina automated extraction and completeness checking against payer rules before submission. Integrated with Epic for automated status updates and denial tracking.",
      result:
        "Initial denial rate dropped from 31% to 11%. Authorization cycle time reduced by 67%. Staff redeployed from data entry to exception handling and payer negotiation.",
    },
    {
      customer: "Global manufacturer (Fortune 500)",
      challenge:
        "AP team processing 180,000 invoices per year across 14 countries, in 9 languages, from 2,400 suppliers. 40% required manual intervention. Three-way match was manual.",
      solution:
        "Lumina automated extraction, currency normalization, and three-way match against POs and receiving documents. Exception queue reduced to only genuine discrepancies.",
      result:
        "$2.3M annual cost reduction. Invoice processing time from 9 days to same-day. Early payment discount capture increased 28%. Supplier disputes reduced 44%.",
    },
  ],

  speaking_points: [
    {
      topic: "ROI",
      point:
        "Manual document handling costs $15–25 per document when you factor in labor, errors, and rework. Lumina brings that below $1.50. For most enterprise customers, payback period is under 9 months.",
    },
    {
      topic: "AI accuracy",
      point:
        "Most document AI fails on the exceptions — handwritten fields, poor scan quality, unusual formats. That's exactly where we've invested. Our accuracy on degraded documents is 94%; industry average is under 70%.",
    },
    {
      topic: "Implementation risk",
      point:
        "We've done 140 enterprise deployments. We know where the risk is — it's in data migration and change management, not the technology. We have a proven 6-week deployment methodology and a dedicated success team.",
    },
    {
      topic: "Build vs buy",
      point:
        "Teams that try to build this internally typically spend 18–24 months and $2–4M before they have something production-ready. Then they discover they've built a point solution that can't keep up with evolving document formats or regulatory changes.",
    },
    {
      topic: "Security",
      point:
        "Documents contain your most sensitive business information. Lumina processes everything in your cloud tenant — nothing touches our infrastructure. We are SOC 2 Type II certified with annual third-party audits.",
    },
  ],

  stats: [
    { number: "99.4%", label: "extraction accuracy", context: "across 300+ document types" },
    { number: "80%+", label: "reduction in manual handling", context: "average across customers" },
    { number: "6 weeks", label: "to production", context: "average enterprise deployment" },
    { number: "$1.50", label: "per document cost", context: "down from $15–25 manually" },
    { number: "140+", label: "enterprise customers", context: "across 12 industries" },
    { number: "9 months", label: "average payback period", context: "across all deployments" },
  ],

  cta: "Let's map a 30-minute proof of concept to your specific document types. We'll show you what Lumina does with your actual data — no commitment, no IT involvement required.",
};

export const ROLES = [
  "Chief Financial Officer (CFO)",
  "Chief Technology Officer (CTO)",
  "Chief Operating Officer (COO)",
  "Chief Information Officer (CIO)",
  "VP of Finance / Finance Director",
  "VP of Operations",
  "VP of Information Technology",
  "VP of Sales / Revenue Operations",
  "Director of Accounts Payable",
  "Director of Shared Services",
  "Head of Digital Transformation",
  "Procurement Director",
];

export const INDUSTRIES = [
  "Financial Services / Banking",
  "Insurance",
  "Healthcare / Health Systems",
  "Pharmaceuticals / Life Sciences",
  "Manufacturing",
  "Retail / Consumer Goods",
  "Logistics / Supply Chain",
  "Professional Services",
  "Government / Public Sector",
  "Real Estate",
  "Energy / Utilities",
  "Technology / SaaS",
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
