import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";
import { DEFAULT_TEMPLATE, StoredTemplate } from "@/lib/db-template";

export async function GET() {
  try {
    const client = getAdminClient();
    const { data, error } = await client
      .from("templates")
      .select("*")
      .eq("id", "default")
      .single();

    if (error || !data) {
      return NextResponse.json(DEFAULT_TEMPLATE);
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(DEFAULT_TEMPLATE);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: StoredTemplate = await req.json();
    const client = getAdminClient();

    const { error } = await client.from("templates").upsert({
      ...body,
      id: "default",
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Save template error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Save template error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
