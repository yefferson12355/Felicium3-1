-- Migration: 005_seed_users
-- Seed initial users for testing

-- Admin user
INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at)
VALUES (
  'admin-001',
  'admin@felicium.com',
  '$2b$10$sEOdy4agJCeoIEiiTQK/guyrIb7aSmxo..UdfXnJoLRO62f22sj8e',
  'Carlos',
  'Administrador',
  'ADMIN',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Dentist user
INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at)
VALUES (
  'dentist-001',
  'dentista@felicium.com',
  '$2b$10$KAeROtKY5YEK0cQGsHKz6.Y3PVfcHBBGBpNPokudUG9N9WfmE4OHa',
  'María',
  'López',
  'DENTIST',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Receptionist user
INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at)
VALUES (
  'receptionist-001',
  'recepcion@felicium.com',
  '$2b$10$hTLaWSwmljC9LiIGthPiYOBxvfnTH6Ovmg1cmm2yT7CR3Sp8EIeT2',
  'Ana',
  'Recepcionista',
  'RECEPTIONIST',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Patient user
INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at)
VALUES (
  'patient-001',
  'paciente@felicium.com',
  '$2b$10$6G0D/c/EpmFMzKqYYLTbPe2vTWUY.DCwgrSvxgEvHW.evAm8y9sAK',
  'Juan',
  'Pérez',
  'PATIENT',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Comentarios con credenciales para testing:
-- Admin: admin@felicium.com / admin123
-- Dentista: dentista@felicium.com / dentista123
-- Recepcionista: recepcion@felicium.com / recep123
-- Paciente: paciente@felicium.com / paciente123
