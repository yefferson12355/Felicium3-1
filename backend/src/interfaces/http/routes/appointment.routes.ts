import { Router, Request, Response, NextFunction } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { validateDto, validateParams } from '../middlewares/validation.middleware';
import { asyncHandler } from '../middlewares/global-error.middleware';
import { CreateAppointmentDTO } from '../dtos/appointment/CreateAppointmentDTO';
import { IdParamDTO } from '../dtos/common/ParamsDTO';

/**
 * Create Appointment routes
 */
export const createAppointmentRoutes = (appointmentController: AppointmentController): Router => {
  const router = Router();

  /**
   * POST /appointments - Create new appointment (requires auth)
   */
  router.post('/', 
    verifyToken, 
    validateDto(CreateAppointmentDTO),
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
      appointmentController.createAppointment(req, res, next)
    )
  );

  /**
   * GET /appointments/available-slots - Get available time slots (BEFORE /:id)
   */
  router.get('/available-slots', 
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
      appointmentController.getAvailableSlots(req, res, next)
    )
  );

  /**
   * GET /appointments/:id - Get appointment by ID (requires auth)
   */
  router.get('/:id', 
    verifyToken, 
    validateParams(IdParamDTO),
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
      appointmentController.getAppointment(req, res, next)
    )
  );

  /**
   * GET /appointments - List appointments with filters (requires auth)
   */
  router.get('/', 
    verifyToken, 
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
      appointmentController.listAppointments(req, res, next)
    )
  );

  /**
   * POST /appointments/:id/confirm - Confirm appointment (requires auth)
   */
  router.post('/:id/confirm', 
    verifyToken, 
    validateParams(IdParamDTO),
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
      appointmentController.confirmAppointment(req, res, next)
    )
  );

  /**
   * DELETE /appointments/:id - Cancel appointment (requires auth)
   */
  router.delete('/:id', 
    verifyToken, 
    validateParams(IdParamDTO),
    asyncHandler((req: Request, res: Response, next: NextFunction) =>
      appointmentController.cancelAppointment(req, res, next)
    )
  );

  return router;
};
