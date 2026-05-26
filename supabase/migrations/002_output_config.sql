-- Run this in your Supabase project's SQL Editor after 001_templates.sql
-- Dashboard → SQL Editor → New query → paste and run

ALTER TABLE public.templates
  ADD COLUMN IF NOT EXISTS output_config jsonb DEFAULT '{
    "outputs": ["onesheet", "deck"],
    "locked_fields": [],
    "required_inclusions": [],
    "tone": "conversational",
    "length": "standard"
  }'::jsonb,
  ADD COLUMN IF NOT EXISTS buying_journey jsonb DEFAULT '{"stages": []}'::jsonb,
  ADD COLUMN IF NOT EXISTS crm_config jsonb DEFAULT '{"provider": "none", "api_key": ""}'::jsonb;
