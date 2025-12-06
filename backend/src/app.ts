import express, { Application } from 'express';
// ... (imports y middlewares) ...
import { mainRouter } from './interfaces/http/routes/index.routes'; 
// Importamos el controlador ensamblado desde el contenedor de dependencias (DI)
import { patientController } from './di/dependency-container'; 
// Importamos la función que crea las rutas específicas para pacientes
import { PatientRouter } from './interfaces/http/routes/patient.routes'; 
import { corsMiddleware } from './interfaces/http/middlewares/cors.middleware';
import { globalErrorHandler, notFoundHandler } from './interfaces/http/middlewares/global-error.middleware';

/**
 * Función que configura la aplicación Express
 */
const app: Application = express();

// --- Middlewares de Seguridad (CORS debe ir primero) ---
// CORS seguro - valida orígenes permitidos
app.use(corsMiddleware);

// --- Middlewares de Parseo ---
// JSON parser middleware
app.use(express.json({ limit: '50mb' }));

// URL-encoded parser middleware
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- Ensamblaje de Rutas ---

// Montamos el router principal con todas las rutas (auth, pacientes, citas, odontogramas)
app.use('/api', mainRouter);

// --- Manejo de Errores (DEBE ir al final) ---

// 404 - Ruta no encontrada (debe ir después de todas las rutas)
app.use(notFoundHandler);

// Global Error Handler (DEBE ser el último middleware)
app.use(globalErrorHandler); 

export default app;