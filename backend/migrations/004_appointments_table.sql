-- Migration: 004_appointments_table
-- Drop if exists
DROP TABLE IF EXISTS appointments CASCADE;

-- Create appointments table
CREATE TABLE appointments (
  id VARCHAR(255) PRIMARY KEY,
  patient_id VARCHAR(255) NOT NULL,
  dentist_id VARCHAR(255),
  fecha_hora TIMESTAMP NOT NULL,
  razon_consulta VARCHAR(255),
  notas TEXT[] DEFAULT '{}',
  status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_dentist ON appointments(dentist_id);
CREATE INDEX idx_appointments_fecha_hora ON appointments(fecha_hora);
CREATE INDEX idx_appointments_status ON appointments(status);
