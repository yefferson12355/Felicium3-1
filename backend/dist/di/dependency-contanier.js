"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.odontogramController = exports.patientController = exports.updateOdontogramUseCase = exports.getOdontogramByPatientUseCase = exports.getOdontogramByIdUseCase = exports.deleteOdontogramUseCase = exports.createOdontogramUseCase = exports.updatePatientUseCase = exports.listPatientUseCase = exports.getPatientByIdUseCase = exports.deletePatientUseCase = exports.createPatientUseCase = void 0;
// --------------------------------------------------------------------------
// 1. IMPORTACIÓN DE REPOSITORIOS (Infraestructura)
// --------------------------------------------------------------------------
const PatientRepository_1 = require("../infrastructure/database/postgres/PatientRepository");
const OdontogramRepository_1 = require("../infrastructure/database/postgres/OdontogramRepository");
// Futuros repositorios:
// import { AppointmentRepository } from '../infrastructure/database/postgres/AppointmentRepository';
// import { UserRepository } from '../infrastructure/database/postgres/UserRepository';
// import { AuthRepository } from '../infrastructure/database/postgres/AuthRepository';
// --------------------------------------------------------------------------
// 2. IMPORTACIÓN DE CASOS DE USO (Aplicación)
// --------------------------------------------------------------------------
// --- Patient Module ---
const CreatePatientUseCase_1 = require("../core/application/patient/CreatePatientUseCase");
const DeletePatientUseCase_1 = require("../core/application/patient/DeletePatientUseCase");
const GetPatientByIdUseCase_1 = require("../core/application/patient/GetPatientByIdUseCase");
const ListPatientUseCase_1 = require("../core/application/patient/ListPatientUseCase");
const UpdatePatientUseCase_1 = require("../core/application/patient/UpdatePatientUseCase");
// --- Odontogram Module ---
const CreateOdontogramUseCase_1 = require("../core/application/odontogram/CreateOdontogramUseCase");
const DeleteOdontogramUseCase_1 = require("../core/application/odontogram/DeleteOdontogramUseCase");
const GetOdontogramByIdUseCase_1 = require("../core/application/odontogram/GetOdontogramByIdUseCase");
const GetOdontogramByPatientUseCase_1 = require("../core/application/odontogram/GetOdontogramByPatientUseCase");
const UpdateOdontogramUseCase_1 = require("../core/application/odontogram/UpdateOdontogramUseCase");
// Futuros módulos:
// import { CreateAppointmentUseCase } ...
// import { LoginUseCase } ...
// --------------------------------------------------------------------------
// 3. IMPORTACIÓN DE CONTROLADORES (Interface Adapters)
// --------------------------------------------------------------------------
const patient_controller_1 = require("../interfaces/http/controllers/patient.controller");
const odontogram_controller_1 = require("../interfaces/http/controllers/odontogram.controller");
// --------------------------------------------------------------------------
// 4. INSTANCIACIÓN DE DEPENDENCIAS (Inyección)
// --------------------------------------------------------------------------
// A. Repositorios (No necesitan parámetros - importan pgClient directamente)
const patientRepository = new PatientRepository_1.PatientRepository();
const odontogramRepository = new OdontogramRepository_1.OdontogramRepository();
// Futuros repositorios:
// const appointmentRepository = new AppointmentRepository(pgClient);
// const userRepository = new UserRepository(pgClient);
// const authRepository = new AuthRepository(pgClient);
// B. Casos de Uso (Inyectamos Repositorios)
// -- Patient --
exports.createPatientUseCase = new CreatePatientUseCase_1.CreatePatientUseCase(patientRepository);
exports.deletePatientUseCase = new DeletePatientUseCase_1.DeletePatientUseCase(patientRepository);
exports.getPatientByIdUseCase = new GetPatientByIdUseCase_1.GetPatientByIdUseCase(patientRepository);
exports.listPatientUseCase = new ListPatientUseCase_1.ListPatientUseCase(patientRepository);
exports.updatePatientUseCase = new UpdatePatientUseCase_1.UpdatePatientUseCase(patientRepository);
// -- Odontogram --
exports.createOdontogramUseCase = new CreateOdontogramUseCase_1.CreateOdontogramUseCase(odontogramRepository);
exports.deleteOdontogramUseCase = new DeleteOdontogramUseCase_1.DeleteOdontogramUseCase(odontogramRepository);
exports.getOdontogramByIdUseCase = new GetOdontogramByIdUseCase_1.GetOdontogramByIdUseCase(odontogramRepository);
exports.getOdontogramByPatientUseCase = new GetOdontogramByPatientUseCase_1.GetOdontogramByPatientUseCase(odontogramRepository);
exports.updateOdontogramUseCase = new UpdateOdontogramUseCase_1.UpdateOdontogramUseCase(odontogramRepository);
// C. Controladores (Inyectamos Casos de Uso)
exports.patientController = new patient_controller_1.PatientController(exports.createPatientUseCase, exports.getPatientByIdUseCase, exports.listPatientUseCase
// Agrega update/delete aquí si tu controlador los pide en el constructor
);
exports.odontogramController = new odontogram_controller_1.OdontogramController(exports.createOdontogramUseCase, exports.getOdontogramByIdUseCase, exports.getOdontogramByPatientUseCase, exports.updateOdontogramUseCase, exports.deleteOdontogramUseCase);
