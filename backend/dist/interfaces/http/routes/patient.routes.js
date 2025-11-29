"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRouter = void 0;
const express_1 = require("express");
// Importamos solo las dependencias de Express y Middlewares
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
// Esta función recibe el controlador YA ENSAMBLADO.
// Ya no tiene el error de inicialización manual.
const PatientRouter = (controller) => {
    const router = (0, express_1.Router)();
    // RUTA: POST /api/patients
    router.post('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)(['ADMIN', 'RECEPTIONIST', 'RECEPCIONISTE']), 
    // Paso 3: Pasa la petición al controlador inyectado
    (req, res) => controller.crearPaciente(req, res));
    // RUTA: GET /api/patients/:id
    router.get('/:id', auth_middleware_1.authMiddleware, (req, res) => controller.getPatientById(req, res) // Ahora 'controller' es el inyectado
    );
    // RUTA: GET /api/patients
    router.get('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)(['ADMIN', 'DOCTOR', 'RECEPTIONIST']), (req, res) => controller.listPatients(req, res));
    return router; // Devuelve el router configurado
};
exports.PatientRouter = PatientRouter;
