CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email citext UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'hotel_finance_user',
  is_active boolean NOT NULL DEFAULT true,
  failed_login_attempts integer NOT NULL DEFAULT 0,
  locked_until timestamptz,
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  replaced_by uuid REFERENCES refresh_tokens(id),
  user_agent text,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS refresh_tokens_user_id_idx ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS refresh_tokens_expires_at_idx ON refresh_tokens(expires_at);

CREATE TABLE IF NOT EXISTS organizations (
  id text PRIMARY KEY,
  name text NOT NULL,
  gst text,
  credit_period text,
  payment_terms text,
  registration_number text,
  registered_address text,
  contact_email citext,
  contact_phone text,
  status text NOT NULL DEFAULT 'active',
  corporate_user_id text UNIQUE NOT NULL,
  corporate_password_hash text NOT NULL,
  password_reset_required boolean NOT NULL DEFAULT true,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE organizations
  ADD COLUMN IF NOT EXISTS registration_number text,
  ADD COLUMN IF NOT EXISTS registered_address text,
  ADD COLUMN IF NOT EXISTS contact_email citext,
  ADD COLUMN IF NOT EXISTS contact_phone text,
  ADD COLUMN IF NOT EXISTS password_reset_required boolean NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS organizations_name_idx ON organizations(name);
CREATE INDEX IF NOT EXISTS organizations_status_idx ON organizations(status);
CREATE UNIQUE INDEX IF NOT EXISTS organizations_contact_email_uniq
  ON organizations(contact_email)
  WHERE contact_email IS NOT NULL;

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_set_updated_at ON users;
CREATE TRIGGER users_set_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS organizations_set_updated_at ON organizations;
CREATE TRIGGER organizations_set_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();
