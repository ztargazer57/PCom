-- Enable UUID extension (needed for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--------------------------------------------------
-- 🎨 Artwork
--------------------------------------------------
CREATE TABLE artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  description text,
  category text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

--------------------------------------------------
-- 👤 Profile
--------------------------------------------------
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text NOT NULL,
  tagline text,
  avatar_url text,
  twitter text,
  instagram text,
  facebook text,
  email text
);

--------------------------------------------------
-- ⚙️ Commission Settings
--------------------------------------------------
CREATE TABLE commission_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  is_open boolean NOT NULL,
  availability text,
  pricing_text text NOT NULL,
  terms_text text NOT NULL,
  process_text text
);

--------------------------------------------------
-- 📌 Commission Status ENUM
--------------------------------------------------
CREATE TYPE commission_status AS ENUM (
  'PENDING',
  'ACCEPTED',
  'IN_PROGRESS',
  'DONE',
  'REJECTED'
);

--------------------------------------------------
-- 💌 Commission
--------------------------------------------------
CREATE TABLE commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  contact text NOT NULL,
  description text NOT NULL,
  reference text,
  status commission_status DEFAULT 'PENDING',
  created_at timestamp with time zone DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_artworks_updated_at
BEFORE UPDATE ON artworks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert commissions"
ON commissions
FOR INSERT
WITH CHECK (true);
