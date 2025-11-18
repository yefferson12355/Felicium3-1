import { pgClient } from '../infrastructure/config/database.config';
import { PatientRepository } from '../infrastructure/database/postgres/PatientRepository';

import { CreatePatientUseCase } from '../core/application/patient/CreatePatientUseCase';
import { GetPatientByIdUseCase } from '../core/application/patient/GetPatientByIdUseCase';
import { ListPatientUseCase } from '../core/application/patient/ListPatientUseCase';
import { UpdatePatientUseCase } from '../core/application/patient/UpdatePatientUseCase';
import { DeletePatientUseCase } from '../core/application/patient/DeletePatientUseCase';

import { PatientController } from '../interfaces/http/controllers/patient.controller';

// --- A. Repositorios ---
const patientRepository = new PatientRepository(pgClient);

// --- B. Casos de Uso ---
export const createPatientUseCase = new CreatePatientUseCase(patientRepository);
export const getPatientByIdUseCase = new GetPatientByIdUseCase(patientRepository);
export const listPatientUseCase = new ListPatientUseCase(patientRepository);
export const updatePatientUseCase = new UpdatePatientUseCase(patientRepository);
export const deletePatientUseCase = new DeletePatientUseCase(patientRepository);

// --- C. Controladores ---
export const patientController = new PatientController(
  createPatientUseCase,
  getPatientByIdUseCase,
  listPatientUseCase,
  updatePatientUseCase,
  deletePatientUseCase
);