-- Pix Chatbot Database Schema
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  name text, email text, company text, website text,
  industry text, country text, team_size text,
  service_interest text, urgency text, language text DEFAULT 'English',
  score integer DEFAULT 0,
  classification text DEFAULT 'cold' CHECK (classification IN ('cold','warm','hot','urgent')),
  status text DEFAULT 'new', notes text, signals text,
  created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  messages jsonb DEFAULT '[]',
  message_count integer DEFAULT 0,
  language text DEFAULT 'English',
  started_at timestamptz DEFAULT now(),
  last_message_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quality_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  ai_rating integer CHECK (ai_rating BETWEEN 1 AND 10),
  ai_notes text,
  visitor_rating integer CHECK (visitor_rating BETWEEN 1 AND 5),
  visitor_comment text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS questions_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE,
  question text NOT NULL,
  topic text,
  language text DEFAULT 'English',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_session ON leads(session_id);
CREATE INDEX IF NOT EXISTS idx_leads_class ON leads(classification);
CREATE INDEX IF NOT EXISTS idx_conv_session ON conversations(session_id);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN new.updated_at = now(); RETURN new; END;
$$;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
