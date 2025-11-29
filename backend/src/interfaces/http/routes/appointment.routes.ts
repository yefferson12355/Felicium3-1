import { Router, Request, Response } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { verifyToken } from '../middlewares/auth.middleware';

/**
 * Create Appointment routes
 */
export const createAppointmentRoutes = (appointmentController: AppointmentController): Router => {
  const router = Router();

  /**
   * POST /appointments - Create new appointment (requires auth)
   */
  router.post('/', verifyToken, (req: Request, res: Response) =>
    appointmentController.createAppointment(req, res)
  );

  /**
   * GET /appointments/available-slots - Get available time slots (BEFORE /:id)
   */
  router.get('/available-slots', (req: Request, res: Response) =>
    appointmentController.getAvailableSlots(req, res)
  );

  /**
   * GET /appointments/:id - Get appointment by ID (requires auth)
   */
  router.get('/:id', verifyToken, (req: Request, res: Response) =>
    appointmentController.getAppointment(req, res)
  );

  /**
   * GET /appointments - List appointments with filters (requires auth)
   */
  router.get('/', verifyToken, (req: Request, res: Response) =>
    appointmentController.listAppointments(req, res)
  );

  /**
   * POST /appointments/:id/confirm - Confirm appointment (requires auth)
   */
  router.post('/:id/confirm', verifyToken, (req: Request, res: Response) =>
    appointmentController.confirmAppointment(req, res)
  );

  /**
   * DELETE /appointments/:id - Cancel appointment (requires auth)
   */
  router.delete('/:id', verifyToken, (req: Request, res: Response) =>
    appointmentController.cancelAppointment(req, res)
  );

  return router;
};
