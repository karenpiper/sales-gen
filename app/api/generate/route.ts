import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";
import { CustomerContext, GeneratedContent } from "@/lib/types";
import { getAdminClient } from "@/lib/supabase";
import { DEFAULT_TEMPLATE } from "@/lib/db-template";

const client = new Anthropic();

async function fetchTemplate() {
  try {
    const db = getAdminClient();
    const { data } = await db.from("templates").select("*").eq("id", "default").single();
    return data ?? DEFAULT_TEMPLATE;
  } catch {
    return DEFAULT_TEMPLATE;
  }
}

export async function POST(req: NextRequest) {
  try {
    const context: CustomerContext = await req.json();

    if (!context.role || !context.industry || !context.stage) {
      return NextResponse.json({ error: "role, industry, and stage are required" }, { status: 400 });
    }

    const template = await fetchTemplate();

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: buildSystemPrompt(),
      messages: [
        {
          role: "user",
          content: buildUserPrompt(context, template),
        },
      ],
    });

    const rawText = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonText = rawText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

    const generated: GeneratedContent = JSON.parse(jsonText);
    return NextResponse.json(generated);
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
