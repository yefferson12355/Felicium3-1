-- Migration: 006_seed_test_data
-- Seed test patients and appointments

-- Sample patients
INSERT INTO patients (id, dni, nombre, apellido, email, telefono, direccion, nombre_apoderado, fecha_nacimiento, firma_digital, esta_activo)
VALUES 
  ('pat-001', '12345678', 'Juan', 'Pérez', 'juan.perez@email.com', '987654321', 'Av. Principal 123', NULL, '1985-05-15', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg', true),
  ('pat-002', '87654321', 'María', 'García', 'maria.garcia@email.com', '987654322', 'Calle Secundaria 456', NULL, '1990-08-20', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg', true),
  ('pat-003', '11223344', 'Carlos', 'Rojas', 'carlos.rojas@email.com', '987654323', 'Jr. Los Andes 789', NULL, '1995-03-10', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg', true),
  ('pat-004', '44332211', 'Lucía', 'Torres', 'lucia.torres@email.com', '987654324', 'Av. Los Pinos 321', NULL, '2000-12-05', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg', true),
  ('pat-005', '55667788', 'Pedro', 'Martínez', 'pedro.martinez@email.com', '987654325', 'Calle Las Flores 654', NULL, '1988-07-25', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg', true);

-- Sample odontograms
INSERT INTO odontograms (id, patient_id, data)
VALUES 
  ('odon-001', 'pat-001', '{"18": {"status": "healthy"}, "17": {"status": "caries"}}'),
  ('odon-002', 'pat-002', '{"11": {"status": "healthy"}, "21": {"status": "healthy"}}');

-- Sample appointments (past, present, future)
INSERT INTO appointments (id, patient_id, dentist_id, fecha_hora, razon_consulta, status)
VALUES 
  -- Citas completadas (pasadas)
  ('app-001', 'pat-001', 'dentist-001', '2025-11-20 09:00:00', 'Limpieza dental', 'COMPLETED'),
  ('app-002', 'pat-002', 'dentist-001', '2025-11-21 10:00:00', 'Consulta general', 'COMPLETED'),
  ('app-003', 'pat-003', 'dentist-001', '2025-11-22 11:00:00', 'Extracción', 'COMPLETED'),
  
  -- Citas de hoy
  ('app-004', 'pat-004', 'dentist-001', '2025-11-28 09:30:00', 'Limpieza dental', 'CONFIRMED'),
  ('app-005', 'pat-005', 'dentist-001', '2025-11-28 11:00:00', 'Empaste', 'PENDING'),
  ('app-006', 'pat-001', 'dentist-001', '2025-11-28 14:00:00', 'Control', 'CONFIRMED'),
  
  -- Citas futuras
  ('app-007', 'pat-002', 'dentist-001', '2025-11-29 10:00:00', 'Endodoncia', 'CONFIRMED'),
  ('app-008', 'pat-003', 'dentist-001', '2025-11-30 15:00:00', 'Ortodoncia', 'PENDING'),
  ('app-009', 'pat-004', 'dentist-001', '2025-12-01 09:00:00', 'Limpieza profunda', 'CONFIRMED'),
  ('app-010', 'pat-005', 'dentist-001', '2025-12-02 10:30:00', 'Revisión', 'PENDING');

-- Comentarios: 
-- Pacientes: 5 pacientes de prueba
-- Citas: 10 citas (3 completadas, 3 hoy, 4 futuras)
-- Todos asignados al dentista María López (dentist-001)
