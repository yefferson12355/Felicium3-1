-- Migration: 001_patients_table
-- Drop if exists (for fresh start)
DROP TABLE IF EXISTS patients CASCADE;

-- Create patients table
CREATE TABLE patients (
  id VARCHAR(255) PRIMARY KEY,
  dni VARCHAR(20) NOT NULL UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  telefono VARCHAR(20),
  direccion TEXT,
  nombre_apoderado VARCHAR(100),
  fecha_nacimiento DATE NOT NULL,
  firma_digital TEXT NOT NULL,
  odontograma TEXT,
  observaciones TEXT[] DEFAULT '{}',
  esta_activo BOOLEAN DEFAULT true,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_patients_dni ON patients(dni);
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_esta_activo ON patients(esta_activo);
