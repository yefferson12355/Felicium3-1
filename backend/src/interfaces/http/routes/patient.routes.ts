import { Router } from 'express';
// Importamos solo las dependencias de Express y Middlewares
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
// Importamos la CLASE, pero no la instanciamos aquí (la recibimos lista en la función)
import { PatientController } from '../controllers/patient.controller'; 

// Esta función recibe el controlador YA ENSAMBLADO.
// Ya no tiene el error de inicialización manual.
export const PatientRouter = (controller: PatientController) => {
    const router = Router();

    // RUTA: POST /api/patients
    router.post(
        '/',
        //authMiddleware,                           
        //requireRole(['ADMIN', 'RECEPCIONISTE']),  
        // Paso 3: Pasa la petición al controlador inyectado
        (req, res) => controller.crearPaciente(req, res) 
    );

    // RUTA: GET /api/patients/:id
    router.get(
        '/:id',
        //authMiddleware,
        (req, res) => controller.getPatientById(req, res) // Ahora 'controller' es el inyectado
    );

    // RUTA: GET /api/patients
    router.get(
        '/',
        //authMiddleware,
        //requireRole(['ADMIN', 'DOCTOR']),
        (req, res) => controller.listPatients(req, res)
    );

    return router; // Devuelve el router configurado
}