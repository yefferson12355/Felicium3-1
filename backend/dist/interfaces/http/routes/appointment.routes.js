"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointmentRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
/**
 * Create Appointment routes
 */
const createAppointmentRoutes = (appointmentController) => {
    const router = (0, express_1.Router)();
    /**
     * POST /appointments - Create new appointment (requires auth)
     */
    router.post('/', auth_middleware_1.verifyToken, (req, res) => appointmentController.createAppointment(req, res));
    /**
     * GET /appointments/available-slots - Get available time slots (BEFORE /:id)
     */
    router.get('/available-slots', (req, res) => appointmentController.getAvailableSlots(req, res));
    /**
     * GET /appointments/:id - Get appointment by ID (requires auth)
     */
    router.get('/:id', auth_middleware_1.verifyToken, (req, res) => appointmentController.getAppointment(req, res));
    /**
     * GET /appointments - List appointments with filters (requires auth)
     */
    router.get('/', auth_middleware_1.verifyToken, (req, res) => appointmentController.listAppointments(req, res));
    /**
     * POST /appointments/:id/confirm - Confirm appointment (requires auth)
     */
    router.post('/:id/confirm', auth_middleware_1.verifyToken, (req, res) => appointmentController.confirmAppointment(req, res));
    /**
     * DELETE /appointments/:id - Cancel appointment (requires auth)
     */
    router.delete('/:id', auth_middleware_1.verifyToken, (req, res) => appointmentController.cancelAppointment(req, res));
    return router;
};
exports.createAppointmentRoutes = createAppointmentRoutes;
