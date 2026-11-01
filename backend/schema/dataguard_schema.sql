-- DataGuard: Data Integrity + Auto-Patching Schema
-- PostgreSQL 18 - Nobara KDE - For 5432 prod / 5433 recovery
-- Run: psql -p 5432 -h localhost -U postgres -d yourdb -f dataguard_schema.sql

-- 1. INTEGRITY LEDGER (WORM - Write Once, Never Update/Delete)
CREATE TABLE IF NOT EXISTS integrity_ledger (
    id BIGSERIAL PRIMARY KEY,
    table_name TEXT NOT NULL,
    row_id TEXT NOT NULL,  -- PK of monitored row (e.g., customers.id)
    row_hash TEXT NOT NULL, -- SHA-256 of entire row
    prev_hash TEXT,         -- Previous hash for chain (Merkle-like)
    operation CHAR(1) NOT NULL CHECK (operation IN ('I','U','D')), -- Insert/Update/Delete
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_by TEXT DEFAULT CURRENT_USER,
    txid BIGINT DEFAULT txid_current(),
    UNIQUE(table_name, row_id, created_at)
);
-- Make it WORM: No UPDATE/DELETE allowed
CREATE OR REPLACE FUNCTION prevent_ledger_tamper() RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'integrity_ledger is WORM - no UPDATE/DELETE allowed';
    RETURN NULL;
END; $$ LANGUAGE plpgsql;
CREATE TRIGGER ledger_no_update BEFORE UPDATE OR DELETE ON integrity_ledger
FOR EACH ROW EXECUTE FUNCTION prevent_ledger_tamper();
REVOKE UPDATE, DELETE ON integrity_ledger FROM PUBLIC;

-- 2. SECURITY EVENTS (Tamper alerts)
CREATE TABLE IF NOT EXISTS security_events (
    id BIGSERIAL PRIMARY KEY,
    event_type TEXT NOT NULL, -- 'TAMPER_DETECTED', 'HASH_MISMATCH', 'UNAUTHORIZED_UPDATE'
    table_name TEXT NOT NULL,
    row_id TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('LOW','MEDIUM','HIGH','CRITICAL')) DEFAULT 'HIGH',
    old_hash TEXT,
    new_hash TEXT,
    detected_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN','INVESTIGATED','HEALED','FALSE_POSITIVE')),
    details JSONB
);
CREATE INDEX idx_security_events_status ON security_events(status);

-- 3. SECURITY PATCHES (Auto-patching log)
CREATE TABLE IF NOT EXISTS security_patches (
    id BIGSERIAL PRIMARY KEY,
    check_id TEXT NOT NULL, -- CIS-4.1, etc.
    check_name TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('LOW','MEDIUM','HIGH','CRITICAL')),
    table_name TEXT, -- For table-level checks
    old_value TEXT,
    new_value TEXT,
    patched_at TIMESTAMPTZ DEFAULT NOW(),
    patched_by TEXT DEFAULT CURRENT_USER,
    rollback_sql TEXT, -- How to undo
    po_pia_ref TEXT -- POPIA compliance mapping
);

-- 4. CIS BENCHMARK CHECKS (What to patch)
CREATE TABLE IF NOT EXISTS cis_checks (
    check_id TEXT PRIMARY KEY,
    category TEXT, -- 'Authentication', 'Authorization', 'Logging'
    description TEXT,
    query TEXT, -- SQL to detect misconfig
    expected_value TEXT,
    severity TEXT,
    auto_patch BOOLEAN DEFAULT false
);
-- Seed 5 critical checks
INSERT INTO cis_checks VALUES
('CIS-3.1', 'Authentication', 'No trust auth in pg_hba.conf', 'trust', '0 rows with trust', 'CRITICAL', true),
('CIS-3.2', 'Authorization', 'No public schema writable', 'public writable', 'revoked', 'HIGH', true),
('CIS-4.5', 'Logging', 'log_connections enabled', 'log_connections', 'on', 'MEDIUM', true),
('CIS-5.1', 'Passwords', 'No superuser with weak password', 'superuser weak', '0 weak', 'CRITICAL', false),
('CIS-6.1', 'SSL', 'ssl = on', 'ssl', 'on', 'HIGH', true)
ON CONFLICT DO NOTHING;

-- 5. MERKLE ROOTS (Daily integrity snapshot)
CREATE TABLE IF NOT EXISTS merkle_roots (
    id BIGSERIAL PRIMARY KEY,
    table_name TEXT NOT NULL,
    root_hash TEXT NOT NULL,
    row_count BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(table_name, created_at)
);