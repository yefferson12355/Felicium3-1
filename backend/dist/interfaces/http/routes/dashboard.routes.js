"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDashboardRoutes = void 0;
const express_1 = require("express");
const JwtMiddleware_1 = require("../../../infrastructure/auth/JwtMiddleware");
/**
 * Dashboard Routes
 *
 * GET /api/dashboard/stats - Estadísticas generales
 * GET /api/dashboard/stats/appointments - Estadísticas de citas
 * GET /api/dashboard/stats/revenue - Estadísticas de ingresos
 * GET /api/dashboard/stats/patients - Estadísticas de pacientes
 */
const createDashboardRoutes = (dashboardController) => {
    const router = (0, express_1.Router)();
    /**
     * GET /stats - Estadísticas generales del dashboard
     */
    router.get('/stats', JwtMiddleware_1.verifyToken, (req, res) => dashboardController.getStats(req, res));
    /**
     * GET /stats/appointments - Estadísticas de citas
     */
    router.get('/stats/appointments', JwtMiddleware_1.verifyToken, (req, res) => dashboardController.getAppointmentStats(req, res));
    /**
     * GET /stats/revenue - Estadísticas de ingresos
     */
    router.get('/stats/revenue', JwtMiddleware_1.verifyToken, (req, res) => dashboardController.getRevenueStats(req, res));
    /**
     * GET /stats/patients - Estadísticas de pacientes
     */
    router.get('/stats/patients', JwtMiddleware_1.verifyToken, (req, res) => dashboardController.getPatientStats(req, res));
    return router;
};
exports.createDashboardRoutes = createDashboardRoutes;
exports.default = exports.createDashboardRoutes;
