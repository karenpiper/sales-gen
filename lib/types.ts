export interface CustomerContext {
  role: string;
  industry: string;
  stage: string;
  companySize: string;
  transcript: string;
}

export interface ValueProp {
  title: string;
  body: string;
  metric: string;
}

export interface CaseStudy {
  customer: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface Stat {
  number: string;
  label: string;
  context?: string;
}

export type SlideType = "title" | "problem" | "solution" | "capabilities" | "case_study" | "stats" | "cta";

export interface DeckSlide {
  type: SlideType;
  title?: string;
  subtitle?: string;
  body?: string;
  points?: string[];
  differentiators?: string[];
  capabilities?: { name: string; description: string; metric: string }[];
  customer?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  stats?: Stat[];
  next_steps?: string[];
  closing?: string;
}

export interface GeneratedContent {
  customer_label: string;
  one_sheeter: {
    headline: string;
    subheadline: string;
    problem_statement: string;
    solution_overview: string;
    value_props: ValueProp[];
    case_study: CaseStudy;
    stats: Stat[];
    cta: string;
  };
  deck_slides: DeckSlide[];
}
