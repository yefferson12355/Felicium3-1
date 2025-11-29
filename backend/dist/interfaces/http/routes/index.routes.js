"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
// 1. Importamos la Fábrica de rutas
const patient_routes_1 = require("./patient.routes");
const odontogram_routes_1 = require("./odontogram.routes");
const auth_routes_1 = require("./auth.routes");
const appointment_routes_1 = require("./appointment.routes");
const dashboard_routes_1 = require("./dashboard.routes");
// 2. Importamos los Controladores YA ENSAMBLADOS desde nuestro contenedor
const dependency_container_1 = require("../../../di/dependency-container");
const router = (0, express_1.Router)();
/**
 * Montamos las rutas
 */
// A. Rutas de Autenticación
router.use('/auth', (0, auth_routes_1.createAuthRoutes)(dependency_container_1.authController));
// B. Rutas de Pacientes
router.use('/patients', (0, patient_routes_1.PatientRouter)(dependency_container_1.patientController));
// C. Rutas de Odontogramas
router.use('/odontogram', (0, odontogram_routes_1.createOdontogramRoutes)(dependency_container_1.odontogramController));
// D. Rutas de Citas
router.use('/appointments', (0, appointment_routes_1.createAppointmentRoutes)(dependency_container_1.appointmentController));
// E. Rutas de Dashboard
router.use('/dashboard', (0, dashboard_routes_1.createDashboardRoutes)(dependency_container_1.dashboardController));
// Endpoint de salud (Health Check) - Útil para Docker
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'API running', version: '1.0' });
});
exports.mainRouter = router;
