"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const PatientMapper_1 = require("../mappers/PatientMapper");
const errors_1 = require("../../../shared/errors"); // (Asegúrate de usar tu index o rutas correctas)
class PatientController {
    // 3. Actualizar el CONSTRUCTOR para recibir los 3 argumentos
    constructor(createPatientUseCase, getPatientByIdUseCase, // <--- NUEVO
    listPatientUseCase // <--- NUEVO
    ) {
        this.createPatientUseCase = createPatientUseCase;
        this.getPatientByIdUseCase = getPatientByIdUseCase;
        this.listPatientUseCase = listPatientUseCase;
    }
    // --- MÉTODO CREAR (Ya lo tenías) ---
    async crearPaciente(req, res) {
        try {
            // 1. Mapear los campos del request a los campos del DTO
            // Request viene en inglés, DTO espera español
            const inputData = {
                dni: req.body.dni || req.body.documentNumber || '',
                nombre: req.body.firstName || req.body.nombre || '',
                apellido: req.body.lastName || req.body.apellido || '',
                email: req.body.email || '',
                fechaNacimiento: req.body.dateBirth || req.body.fechaNacimiento || '',
                firmaDigital: req.body.firmaDigital || '',
                telefono: req.body.phone || req.body.telefono,
                nombreApoderado: req.body.nombreApoderado,
                direccion: req.body.address || req.body.direccion,
                observaciones: req.body.observations || req.body.observaciones,
                odontograma: req.body.odontograma || ''
            };
            // 2. Llama al Director (Caso de Uso)
            const pacienteCreado = await this.createPatientUseCase.ejecutar(inputData);
            // 3. Determinar el Rol del Usuario
            const userRole = req.user?.role;
            // 4. Mapear la respuesta según el rol
            const responseDTO = PatientMapper_1.PatientMapper.toDTO(pacienteCreado, userRole);
            // 5. Enviar respuesta
            return res.status(201).json({
                success: true,
                data: responseDTO,
                message: 'Paciente creado exitosamente.'
            });
        }
        catch (error) {
            // Manejo de Errores
            if (error instanceof errors_1.ValidationError) {
                return res.status(400).json({ message: error.message });
            }
            if (error instanceof errors_1.NotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            console.error('Error en crearPaciente:', error);
            return res.status(500).json({
                message: 'Error interno del servidor. Contacte a soporte.',
                error: error?.message
            });
        }
    }
    // --- NUEVO: MÉTODO GET POR ID ---
    async getPatientById(req, res) {
        try {
            const { id } = req.params;
            // Llamar al Director de Get
            const paciente = await this.getPatientByIdUseCase.ejecutar(Number(id));
            // Mappear respuesta (Aquí uso toDTO genérico, o podrías usar toMedical si es doctor)
            const userRole = req.user?.role || 'RECEPTIONIST';
            const response = PatientMapper_1.PatientMapper.toDTO(paciente, userRole);
            return res.status(200).json(response);
        }
        catch (error) {
            // Manejo simple de error (mejorar con error handler)
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
    }
    // --- NUEVO: MÉTODO LISTAR ---
    async listPatients(req, res) {
        try {
            // Llamar al Director de List
            const pacientes = await this.listPatientUseCase.ejecutar();
            const userRole = req.user?.role || 'RECEPTIONIST';
            // Mappear la lista completa
            const response = pacientes.map(p => PatientMapper_1.PatientMapper.toDTO(p, userRole));
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al listar pacientes' });
        }
    }
}
exports.PatientController = PatientController;
