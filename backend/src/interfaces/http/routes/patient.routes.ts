import { Router } from 'express';
// Importamos solo las dependencias de Express y Middlewares
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { validateDto, validateParams } from '../middlewares/validation.middleware';
import { asyncHandler } from '../middlewares/global-error.middleware';
// DTOs con validación
import { CreatePatientDTO } from '../dtos/patient/CreatePatientDTO';
import { UpdatePatientDTO } from '../dtos/patient/UpdatePatientDTO';
import { IdParamDTO } from '../dtos/common/ParamsDTO';
// Importamos la CLASE, pero no la instanciamos aquí (la recibimos lista en la función)
import { PatientController } from '../controllers/patient.controller'; 

// Esta función recibe el controlador YA ENSAMBLADO.
// Ya no tiene el error de inicialización manual.
export const PatientRouter = (controller: PatientController) => {
    const router = Router();

    // RUTA: POST /api/patients
    // Validación: CreatePatientDTO verifica todos los campos requeridos
    router.post(
        '/',
        authMiddleware,                           
        requireRole(['ADMIN', 'RECEPTIONIST', 'RECEPCIONISTE']),
        validateDto(CreatePatientDTO),
        asyncHandler((req, res, next) => controller.crearPaciente(req, res, next))
    );

    // RUTA: GET /api/patients/:id
    // Validación: IdParamDTO verifica que el ID sea un UUID válido
    router.get(
        '/:id',
        authMiddleware,
        validateParams(IdParamDTO),
        asyncHandler((req, res, next) => controller.getPatientById(req, res, next))
    );

    // RUTA: PUT /api/patients/:id
    // Validación: UpdatePatientDTO permite campos opcionales
    router.put(
        '/:id',
        authMiddleware,
        requireRole(['ADMIN', 'RECEPTIONIST']),
        validateParams(IdParamDTO),
        validateDto(UpdatePatientDTO, true),
        asyncHandler((req, res, next) => controller.updatePatient(req, res, next))
    );

    // RUTA: DELETE /api/patients/:id
    router.delete(
        '/:id',
        authMiddleware,
        requireRole(['ADMIN']),
        validateParams(IdParamDTO),
        asyncHandler((req, res, next) => controller.deletePatient(req, res, next))
    );

    // RUTA: GET /api/patients
    router.get(
        '/',
        authMiddleware,
        requireRole(['ADMIN', 'DOCTOR', 'RECEPTIONIST']),
        asyncHandler((req, res, next) => controller.listPatients(req, res, next))
    );

    return router; // Devuelve el router configurado
}