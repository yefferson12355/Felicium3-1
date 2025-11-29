"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = exports.appointmentController = exports.getAvailableSlotsUseCase = exports.confirmAppointmentUseCase = exports.cancelAppointmentUseCase = exports.listAppointmentsUseCase = exports.getAppointmentUseCase = exports.createAppointmentUseCase = exports.odontogramController = exports.deleteOdontogramUseCase = exports.updateOdontogramUseCase = exports.getOdontogramByPatientUseCase = exports.getOdontogramByIdUseCase = exports.createOdontogramUseCase = exports.authController = exports.verifyTokenUseCase = exports.logoutUseCase = exports.loginUseCase = exports.registerUseCase = exports.patientController = exports.deletePatientUseCase = exports.updatePatientUseCase = exports.listPatientUseCase = exports.getPatientByIdUseCase = exports.createPatientUseCase = void 0;
const PatientRepository_1 = require("../infrastructure/database/postgres/PatientRepository");
const UserRepository_1 = require("../infrastructure/database/postgres/UserRepository");
const CreatePatientUseCase_1 = require("../core/application/patient/CreatePatientUseCase");
const GetPatientByIdUseCase_1 = require("../core/application/patient/GetPatientByIdUseCase");
const ListPatientUseCase_1 = require("../core/application/patient/ListPatientUseCase");
const UpdatePatientUseCase_1 = require("../core/application/patient/UpdatePatientUseCase");
const DeletePatientUseCase_1 = require("../core/application/patient/DeletePatientUseCase");
const RegisterUseCase_1 = require("../core/application/auth/RegisterUseCase");
const LoginUseCase_1 = require("../core/application/auth/LoginUseCase");
const LogoutUseCase_1 = require("../core/application/auth/LogoutUseCase");
const VerifyTokenUseCase_1 = require("../core/application/auth/VerifyTokenUseCase");
const patient_controller_1 = require("../interfaces/http/controllers/patient.controller");
const auth_controller_1 = require("../interfaces/http/controllers/auth.controller");
const dashboard_controller_1 = require("../interfaces/http/controllers/dashboard.controller");
const odontogram_1 = require("../core/application/odontogram");
const OdontogramRepository_1 = require("../infrastructure/database/postgres/OdontogramRepository");
const odontogram_controller_1 = require("../interfaces/http/controllers/odontogram.controller");
const appointment_1 = require("../core/application/appointment");
const AppointmentRepository_1 = require("../infrastructure/database/postgres/AppointmentRepository");
const appointment_controller_1 = require("../interfaces/http/controllers/appointment.controller");
// --- A. PATIENT - Repositorios ---
const patientRepository = new PatientRepository_1.PatientRepository();
// --- B. PATIENT - Casos de Uso ---
exports.createPatientUseCase = new CreatePatientUseCase_1.CreatePatientUseCase(patientRepository);
exports.getPatientByIdUseCase = new GetPatientByIdUseCase_1.GetPatientByIdUseCase(patientRepository);
exports.listPatientUseCase = new ListPatientUseCase_1.ListPatientUseCase(patientRepository);
exports.updatePatientUseCase = new UpdatePatientUseCase_1.UpdatePatientUseCase(patientRepository);
exports.deletePatientUseCase = new DeletePatientUseCase_1.DeletePatientUseCase(patientRepository);
// --- C. PATIENT - Controladores ---
exports.patientController = new patient_controller_1.PatientController(exports.createPatientUseCase, exports.getPatientByIdUseCase, exports.listPatientUseCase);
// --- D. AUTH - Repositorios ---
const userRepository = new UserRepository_1.UserRepository();
// --- E. AUTH - Casos de Uso ---
exports.registerUseCase = new RegisterUseCase_1.RegisterUseCase(userRepository);
exports.loginUseCase = new LoginUseCase_1.LoginUseCase(userRepository);
exports.logoutUseCase = new LogoutUseCase_1.LogoutUseCase();
exports.verifyTokenUseCase = new VerifyTokenUseCase_1.VerifyTokenUseCase(userRepository);
// --- F. AUTH - Controladores ---
exports.authController = new auth_controller_1.AuthController(exports.registerUseCase, exports.loginUseCase, exports.logoutUseCase, exports.verifyTokenUseCase);
// --- G. ODONTOGRAM - Repositorios ---
const odontogramRepository = new OdontogramRepository_1.OdontogramRepository();
// --- H. ODONTOGRAM - Casos de Uso ---
exports.createOdontogramUseCase = new odontogram_1.CreateOdontogramUseCase(odontogramRepository);
exports.getOdontogramByIdUseCase = new odontogram_1.GetOdontogramByIdUseCase(odontogramRepository);
exports.getOdontogramByPatientUseCase = new odontogram_1.GetOdontogramByPatientUseCase(odontogramRepository);
exports.updateOdontogramUseCase = new odontogram_1.UpdateOdontogramUseCase(odontogramRepository);
exports.deleteOdontogramUseCase = new odontogram_1.DeleteOdontogramUseCase(odontogramRepository);
// --- I. ODONTOGRAM - Controladores ---
exports.odontogramController = new odontogram_controller_1.OdontogramController(exports.createOdontogramUseCase, exports.getOdontogramByIdUseCase, exports.getOdontogramByPatientUseCase, exports.updateOdontogramUseCase, exports.deleteOdontogramUseCase);
// --- J. APPOINTMENT - Repositorios ---
const appointmentRepository = new AppointmentRepository_1.AppointmentRepository();
// --- K. APPOINTMENT - Casos de Uso ---
exports.createAppointmentUseCase = new appointment_1.CreateAppointmentUseCase(appointmentRepository);
exports.getAppointmentUseCase = new appointment_1.GetAppointmentUseCase(appointmentRepository);
exports.listAppointmentsUseCase = new appointment_1.ListAppointmentsUseCase(appointmentRepository);
exports.cancelAppointmentUseCase = new appointment_1.CancelAppointmentUseCase(appointmentRepository);
exports.confirmAppointmentUseCase = new appointment_1.ConfirmAppointmentUseCase(appointmentRepository);
exports.getAvailableSlotsUseCase = new appointment_1.GetAvailableSlotsUseCase(appointmentRepository);
// --- L. APPOINTMENT - Controladores ---
exports.appointmentController = new appointment_controller_1.AppointmentController(exports.createAppointmentUseCase, exports.getAppointmentUseCase, exports.listAppointmentsUseCase, exports.cancelAppointmentUseCase, exports.confirmAppointmentUseCase, exports.getAvailableSlotsUseCase);
// --- M. DASHBOARD - Controladores ---
exports.dashboardController = new dashboard_controller_1.DashboardController(appointmentRepository, patientRepository, userRepository);
