import { Router } from 'express';
// Importamos los routers específicos que ya hemos planeado:
import patientRouter from './patient.routes'; 
import userRouter from './user.routes'; 
import authRouter from './auth.routes'; 
// (En un proyecto real, se importarían todos los demás routers aquí)

const router = Router();

/**
 * Montamos los routers bajo el prefijo principal de la API.
 * El uso de router.use() con el path inicial monta todos los endpoints
 * de ese router secundario bajo esa ruta.
 */

// Ejemplo: Todas las rutas de patient.routes.ts serán /api/patients/...
router.use('/patients', patientRouter);

// Ejemplo: Todas las rutas de user.routes.ts serán /api/users/...
router.use('/users', userRouter);

// Ejemplo: Todas las rutas de auth.routes.ts serán /api/auth/...
router.use('/auth', authRouter);

// Puedes añadir aquí un endpoint de salud
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'API running', version: '1.0' });
});

// Exportamos el router principal para que app.ts lo pueda usar
export const mainRouter = router;