import express, { Application } from 'express';
// ... (imports y middlewares) ...
import { mainRouter } from './interfaces/http/routes/index.routes'; 
// Importamos el controlador ensamblado desde el contenedor de dependencias (DI)
import { patientController } from './di/dependency-contanier'; 
// Importamos la función que crea las rutas específicas para pacientes
import { PatientRouter } from './interfaces/http/routes/patient.routes'; 
import { errorHandler } from './interfaces/http/middlewares/error-handler.middleware';

/**
 * Función que configura la aplicación Express
 */
const app: Application = express();

// ... (middlewares de seguridad y parser) ...

// --- Ensamblaje de Rutas ---

// Aquí usamos la función PatientRouter y le pasamos el Controlador YA ENSAMBLADO.
const patientRouter = PatientRouter(patientController);

// Montamos el router específico de pacientes BAJO el prefijo /api
app.use('/api', patientRouter); // <--- CAMBIO: Montamos el router específico

// Si tienes un router principal index.routes que agrupa todo, lo montas así:
// app.use('/api', mainRouter); // (Asumiendo que mainRouter agrupa los demás)

// Middleware de Manejo de Errores (DEBE ir al final)
app.use(errorHandler); 

export default app;