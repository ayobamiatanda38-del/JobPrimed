-- Run this once against your EXISTING database (the one you already created
-- the users table in). It adds the new "plan" column without losing your
-- existing accounts. If you're setting up a brand-new database instead, just
-- use schema.sql — it already includes this column.
ALTER TABLE users ADD COLUMN IF NOT EXISTS plan TEXT NOT NULL DEFAULT 'free';
