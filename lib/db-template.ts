import { BASE_TEMPLATE } from "./template";

export interface JourneyStage {
  name: string;
  buyer_focus: string;
  key_concerns: string;
  content_emphasis: string;
  cta: string;
}

export interface OutputConfig {
  outputs: string[];
  locked_fields: string[];
  required_inclusions: string[];
  tone: string;
  length: string;
}

export interface CrmConfig {
  provider: string;
  api_key: string;
}

export interface StoredTemplate {
  id?: string;
  company: string;
  tagline: string;
  elevator_pitch: string;
  value_props: { title: string; body: string; metric: string }[];
  case_studies: { customer: string; challenge: string; solution: string; result: string }[];
  speaking_points: { topic: string; point: string }[];
  stats: { number: string; label: string; context: string }[];
  cta: string;
  primary_color: string;
  output_config?: OutputConfig;
  buying_journey?: { stages: JourneyStage[] };
  crm_config?: CrmConfig;
  updated_at?: string;
}

export const DEFAULT_JOURNEY_STAGES: JourneyStage[] = [
  {
    name: "Early Discovery",
    buyer_focus: "Understanding whether modernizing is worth the effort and why now",
    key_concerns: "Not ready to commit time; wary of being sold to; just trying to learn",
    content_emphasis: "Lead with the problem and industry data. Use market stats as the entry point, not the product.",
    cta: "Offer a 30-minute industry briefing or thought leadership report — no demo",
  },
  {
    name: "Evaluating Solutions",
    buyer_focus: "Building a shortlist and understanding how we differ from competitors",
    key_concerns: "Fear of picking the wrong provider; needs to justify shortlist to leadership",
    content_emphasis: "Lead with differentiation, industry-specific expertise, and reference customers in their vertical",
    cta: "Offer a focused discovery call with a vertical specialist, not a generic sales rep",
  },
  {
    name: "Late Evaluation",
    buyer_focus: "Pressure-testing finalists and aligning the buying group on a decision",
    key_concerns: "Implementation risk, switching costs, getting legal and compliance to sign off",
    content_emphasis: "Lead with proof — implementation methodology, references, compliance documentation, risk mitigation",
    cta: "Offer a pilot proposal, reference customer call, or compliance documentation package",
  },
  {
    name: "Ready to Buy",
    buyer_focus: "Getting to contract — needs a business case for CFO and legal review",
    key_concerns: "CFO scrutiny on ROI, legal review of SLAs, procurement timeline pressure",
    content_emphasis: "Lead with ROI model, contractual SLA commitments, and total cost of ownership vs. current state",
    cta: "Offer a formal proposal with implementation timeline and dedicated success team assignment",
  },
];

export const DEFAULT_OUTPUT_CONFIG: OutputConfig = {
  outputs: ["onesheet", "deck"],
  locked_fields: [],
  required_inclusions: [],
  tone: "conversational",
  length: "standard",
};

export const DEFAULT_CRM_CONFIG: CrmConfig = {
  provider: "none",
  api_key: "",
};

export const DEFAULT_TEMPLATE: StoredTemplate = {
  company: BASE_TEMPLATE.company,
  tagline: BASE_TEMPLATE.tagline,
  elevator_pitch: BASE_TEMPLATE.elevator_pitch,
  value_props: BASE_TEMPLATE.value_props,
  case_studies: BASE_TEMPLATE.case_studies,
  speaking_points: BASE_TEMPLATE.speaking_points,
  stats: BASE_TEMPLATE.stats,
  cta: BASE_TEMPLATE.cta,
  primary_color: "#009FDB",
  output_config: DEFAULT_OUTPUT_CONFIG,
  buying_journey: { stages: DEFAULT_JOURNEY_STAGES },
  crm_config: DEFAULT_CRM_CONFIG,
};

export function alpha(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}
