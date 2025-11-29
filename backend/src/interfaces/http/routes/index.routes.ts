import { Router } from 'express';

// 1. Importamos la Fábrica de rutas
import { PatientRouter } from './patient.routes';
import { createOdontogramRoutes } from './odontogram.routes';
import { createAuthRoutes } from './auth.routes';
import { createAppointmentRoutes } from './appointment.routes';
import { createDashboardRoutes } from './dashboard.routes';

// 2. Importamos los Controladores YA ENSAMBLADOS desde nuestro contenedor
import { patientController, odontogramController, authController, appointmentController, dashboardController } from '../../../di/dependency-container';

const router = Router();

/**
 * Montamos las rutas
 */

// A. Rutas de Autenticación
router.use('/auth', createAuthRoutes(authController));

// B. Rutas de Pacientes
router.use('/patients', PatientRouter(patientController));

// C. Rutas de Odontogramas
router.use('/odontogram', createOdontogramRoutes(odontogramController));

// D. Rutas de Citas
router.use('/appointments', createAppointmentRoutes(appointmentController));

// E. Rutas de Dashboard
router.use('/dashboard', createDashboardRoutes(dashboardController));

// Endpoint de salud (Health Check) - Útil para Docker
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'API running', version: '1.0' });
});

export const mainRouter = router;