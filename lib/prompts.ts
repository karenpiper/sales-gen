import { CustomerContext } from "./types";
import { StoredTemplate } from "./db-template";

export function buildSystemPrompt(): string {
  return `You are a senior B2B sales enablement specialist. You rewrite sales materials so they speak directly to a specific buyer — their role, their industry, their stage in the buying process, and their language.

Your job is to take base content and transform it so:
- The headline immediately names the buyer's specific pain
- Value props lead with what this buyer cares about most (not what the product does)
- Case studies are chosen and reframed to match the buyer's industry and role
- Speaking points anticipate the objections and questions this specific buyer will raise
- The CTA matches where they are in their buying journey
- The language mirrors how this buyer talks about their work — not how a product team talks about software

You must return valid JSON that matches the exact structure requested. No markdown, no explanation — only the JSON object.`;
}

export function buildUserPrompt(context: CustomerContext, template: StoredTemplate): string {
  const transcriptSection = context.transcript.trim()
    ? `\n\n## CALL TRANSCRIPT\nThe salesperson spoke with this buyer. Here is what they said:\n${context.transcript.trim()}\n\nIMPORTANT: Use language and pain points from this transcript throughout the materials. Quote or closely mirror their exact words where relevant.`
    : "";

  return `## BUYER CONTEXT
- Role: ${context.role}
- Industry: ${context.industry}
- Buying Stage: ${context.stage}
- Company Size: ${context.companySize}${transcriptSection}

## BASE CONTENT TO TRANSFORM
Company: ${template.company} — ${template.tagline}
Elevator Pitch: ${template.elevator_pitch}

### Value Propositions
${template.value_props.map((vp, i) => `${i + 1}. ${vp.title}\n   Body: ${vp.body}\n   Metric: ${vp.metric}`).join("\n\n")}

### Case Studies
${template.case_studies.map((cs, i) => `${i + 1}. Customer: ${cs.customer}\n   Challenge: ${cs.challenge}\n   Solution: ${cs.solution}\n   Result: ${cs.result}`).join("\n\n")}

### Speaking Points
${template.speaking_points.map((sp) => `- ${sp.topic}: ${sp.point}`).join("\n")}

### Stats
${template.stats.map((s) => `- ${s.number} ${s.label} (${s.context})`).join("\n")}

### CTA
${template.cta}

## YOUR TASK
Rewrite all of this content from the perspective of the buyer above. Return a JSON object with EXACTLY this structure:

{
  "customer_label": "A short phrase like 'For the CFO in Financial Services'",
  "one_sheeter": {
    "headline": "A punchy, specific headline that names their exact pain (not a product claim)",
    "subheadline": "One sentence expanding the headline — what changes if they solve this",
    "problem_statement": "2–3 sentences describing the problem from their perspective in their language",
    "solution_overview": "2–3 sentences on how ${template.company} solves it — written for this role/industry",
    "value_props": [
      {
        "title": "Value prop title rewritten for this buyer",
        "body": "2–3 sentences rewritten to lead with their specific priority",
        "metric": "The most relevant metric for this buyer"
      }
    ],
    "case_study": {
      "customer": "The most relevant case study customer (from the list above)",
      "challenge": "Reframed to emphasize what this buyer would recognize",
      "solution": "What ${template.company} did — in language this buyer understands",
      "result": "Results that this buyer would care about most"
    },
    "stats": [
      {
        "number": "Stat number",
        "label": "Stat label rewritten for this buyer",
        "context": "Why this matters to them specifically"
      }
    ],
    "cta": "CTA rewritten for their buying stage — early discovery gets education, ready-to-buy gets a decision action"
  },
  "deck_slides": [
    {
      "type": "title",
      "title": "Deck title — punchy, buyer-specific",
      "subtitle": "One line framing the conversation"
    },
    {
      "type": "problem",
      "title": "Slide title naming their pain",
      "points": ["3–4 bullet points describing the problem in their world"]
    },
    {
      "type": "solution",
      "title": "What changes with ${template.company}",
      "body": "2 sentences on the solution",
      "differentiators": ["3 differentiators that matter most to this buyer"]
    },
    {
      "type": "capabilities",
      "title": "What ${template.company} does for you",
      "capabilities": [
        {
          "name": "Capability name rewritten for this buyer",
          "description": "What it does in their context",
          "metric": "The metric they care about"
        }
      ]
    },
    {
      "type": "case_study",
      "customer": "Customer type (anonymized as appropriate)",
      "challenge": "The challenge",
      "solution": "The approach",
      "result": "The outcome"
    },
    {
      "type": "stats",
      "title": "The numbers that matter",
      "stats": [
        {
          "number": "Stat",
          "label": "Label",
          "context": "Why this matters to them"
        }
      ]
    },
    {
      "type": "cta",
      "title": "Next step title appropriate for their buying stage",
      "next_steps": ["2–3 concrete next steps appropriate for their stage"],
      "closing": "One closing line that earns the meeting"
    }
  ]
}

Select the 3 most relevant stats from the base content for the one-sheeter stats array.
Select 3 value props and include all 3 capabilities in the deck.
Pick the single most relevant case study for both the one-sheeter and the case study slide.`;
}
