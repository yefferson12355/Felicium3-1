-- Migration: 002_odontogram_schema
-- Drop if exists
DROP TABLE IF EXISTS odontograms CASCADE;

-- Create odontograms table
CREATE TABLE odontograms (
  id VARCHAR(255) PRIMARY KEY,
  patient_id VARCHAR(255) NOT NULL,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_odontograms_patient ON odontograms(patient_id);
CREATE INDEX idx_odontograms_data ON odontograms USING GIN(data);
