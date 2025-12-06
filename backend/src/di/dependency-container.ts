import { pgClient } from '../infrastructure/config/database.config';
import { PatientRepository } from '../infrastructure/database/postgres/PatientRepository';
import { UserRepository } from '../infrastructure/database/postgres/UserRepository';

import { CreatePatientUseCase } from '../core/application/patient/CreatePatientUseCase';
import { GetPatientByIdUseCase } from '../core/application/patient/GetPatientByIdUseCase';
import { ListPatientUseCase } from '../core/application/patient/ListPatientUseCase';
import { UpdatePatientUseCase } from '../core/application/patient/UpdatePatientUseCase';
import { DeletePatientUseCase } from '../core/application/patient/DeletePatientUseCase';

import { RegisterUseCase } from '../core/application/auth/RegisterUseCase';
import { LoginUseCase } from '../core/application/auth/LoginUseCase';
import { LogoutUseCase } from '../core/application/auth/LogoutUseCase';
import { VerifyTokenUseCase } from '../core/application/auth/VerifyTokenUseCase';

import { PatientController } from '../interfaces/http/controllers/patient.controller';
import { AuthController } from '../interfaces/http/controllers/auth.controller';
import { DashboardController } from '../interfaces/http/controllers/dashboard.controller';

import {
  CreateOdontogramUseCase,
  DeleteOdontogramUseCase,
  GetOdontogramByIdUseCase,
  GetOdontogramByPatientUseCase,
  UpdateOdontogramUseCase,
} from '../core/application/odontogram';
import { OdontogramRepository } from '../infrastructure/database/postgres/OdontogramRepository';
import { OdontogramController } from '../interfaces/http/controllers/odontogram.controller';

import {
  CreateAppointmentUseCase,
  GetAppointmentUseCase,
  ListAppointmentsUseCase,
  CancelAppointmentUseCase,
  ConfirmAppointmentUseCase,
  GetAvailableSlotsUseCase,
} from '../core/application/appointment';
import { AppointmentRepository } from '../infrastructure/database/postgres/AppointmentRepository';
import { AppointmentController } from '../interfaces/http/controllers/appointment.controller';

// --- A. PATIENT - Repositorios ---
const patientRepository = new PatientRepository();

// --- B. PATIENT - Casos de Uso ---
export const createPatientUseCase = new CreatePatientUseCase(patientRepository);
export const getPatientByIdUseCase = new GetPatientByIdUseCase(patientRepository);
export const listPatientUseCase = new ListPatientUseCase(patientRepository);
export const updatePatientUseCase = new UpdatePatientUseCase(patientRepository);
export const deletePatientUseCase = new DeletePatientUseCase(patientRepository);

// --- C. PATIENT - Controladores ---
export const patientController = new PatientController(
  createPatientUseCase,
  getPatientByIdUseCase,
  listPatientUseCase,
  updatePatientUseCase,
  deletePatientUseCase
);

// --- D. AUTH - Repositorios ---
const userRepository = new UserRepository();

// --- E. AUTH - Casos de Uso ---
export const registerUseCase = new RegisterUseCase(userRepository);
export const loginUseCase = new LoginUseCase(userRepository);
export const logoutUseCase = new LogoutUseCase();
export const verifyTokenUseCase = new VerifyTokenUseCase(userRepository);

// --- F. AUTH - Controladores ---
export const authController = new AuthController(
  registerUseCase,
  loginUseCase,
  logoutUseCase,
  verifyTokenUseCase
);

// --- G. ODONTOGRAM - Repositorios ---
const odontogramRepository = new OdontogramRepository();

// --- H. ODONTOGRAM - Casos de Uso ---
export const createOdontogramUseCase = new CreateOdontogramUseCase(odontogramRepository);
export const getOdontogramByIdUseCase = new GetOdontogramByIdUseCase(odontogramRepository);
export const getOdontogramByPatientUseCase = new GetOdontogramByPatientUseCase(odontogramRepository);
export const updateOdontogramUseCase = new UpdateOdontogramUseCase(odontogramRepository);
export const deleteOdontogramUseCase = new DeleteOdontogramUseCase(odontogramRepository);

// --- I. ODONTOGRAM - Controladores ---
export const odontogramController = new OdontogramController(
  createOdontogramUseCase,
  getOdontogramByIdUseCase,
  getOdontogramByPatientUseCase,
  updateOdontogramUseCase,
  deleteOdontogramUseCase
);

// --- J. APPOINTMENT - Repositorios ---
const appointmentRepository = new AppointmentRepository();

// --- K. APPOINTMENT - Casos de Uso ---
export const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository);
export const getAppointmentUseCase = new GetAppointmentUseCase(appointmentRepository);
export const listAppointmentsUseCase = new ListAppointmentsUseCase(appointmentRepository);
export const cancelAppointmentUseCase = new CancelAppointmentUseCase(appointmentRepository);
export const confirmAppointmentUseCase = new ConfirmAppointmentUseCase(appointmentRepository);
export const getAvailableSlotsUseCase = new GetAvailableSlotsUseCase(appointmentRepository);

// --- L. APPOINTMENT - Controladores ---
export const appointmentController = new AppointmentController(
  createAppointmentUseCase,
  getAppointmentUseCase,
  listAppointmentsUseCase,
  cancelAppointmentUseCase,
  confirmAppointmentUseCase,
  getAvailableSlotsUseCase
);

// --- M. DASHBOARD - Controladores ---
export const dashboardController = new DashboardController(
  appointmentRepository,
  patientRepository,
  userRepository
);