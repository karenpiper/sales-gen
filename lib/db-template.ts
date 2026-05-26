import { BASE_TEMPLATE } from "./template";

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
  updated_at?: string;
}

export const DEFAULT_TEMPLATE: StoredTemplate = {
  company: BASE_TEMPLATE.company,
  tagline: BASE_TEMPLATE.tagline,
  elevator_pitch: BASE_TEMPLATE.elevator_pitch,
  value_props: BASE_TEMPLATE.value_props,
  case_studies: BASE_TEMPLATE.case_studies,
  speaking_points: BASE_TEMPLATE.speaking_points,
  stats: BASE_TEMPLATE.stats,
  cta: BASE_TEMPLATE.cta,
  primary_color: "#4f46e5",
};

export function alpha(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}
