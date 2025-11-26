import { Router } from 'express';

// 1. Importamos la Fábrica de rutas de Pacientes (La función)
import { PatientRouter } from './patient.routes';

// 2. Importamos el Controlador YA ENSAMBLADO desde nuestro contenedor
import { patientController } from '../../../di/dependency-container';

// 3. (Comentamos los que aún no existen)
// import userRouter from './user.routes'; 
// import authRouter from './auth.routes'; 

const router = Router();

/**
 * Montamos las rutas
 */

// A. Rutas de Pacientes
// Llamamos a la función PatientRouter pasándole el controlador inyectado
router.use('/patients', PatientRouter(patientController));

// B. Rutas de Usuarios (Pendiente)
// router.use('/users', userRouter);

// C. Rutas de Auth (Pendiente)
// router.use('/auth', authRouter);

// Endpoint de salud (Health Check) - Útil para Docker
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'API running', version: '1.0' });
});

export const mainRouter = router;