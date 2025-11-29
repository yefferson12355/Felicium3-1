import express, { Application } from 'express';
// ... (imports y middlewares) ...
import { mainRouter } from './interfaces/http/routes/index.routes'; 
// Importamos el controlador ensamblado desde el contenedor de dependencias (DI)
import { patientController } from './di/dependency-container'; 
// Importamos la función que crea las rutas específicas para pacientes
import { PatientRouter } from './interfaces/http/routes/patient.routes'; 
import { errorHandler } from './interfaces/http/middlewares/error-handler.middleware';

/**
 * Función que configura la aplicación Express
 */
const app: Application = express();

// --- Middlewares de Parseo y Seguridad ---
// JSON parser middleware
app.use(express.json({ limit: '50mb' }));

// URL-encoded parser middleware
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// CORS headers (basic)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// --- Ensamblaje de Rutas ---

// Montamos el router principal con todas las rutas (auth, pacientes, citas, odontogramas)
app.use('/api', mainRouter);

// Middleware de Manejo de Errores (DEBE ir al final)
app.use(errorHandler); 

export default app;