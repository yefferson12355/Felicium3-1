"use strict";
// --- 1. CONEXIONES ---
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePatientUseCase = void 0;
// Importamos la entidad (que sigue llamándose Paciente en Español)
const patient_entity_1 = require("../../domain/patient/patient.entity");
// ✅ NUEVO: Importamos el validador de firmas
const signature_validator_1 = require("../../../shared/validators/signature.validator");
class CreatePatientUseCase {
    constructor(
    // Inyección de Dependencia usando el nombre CORRECTO
    patientRepository) {
        this.patientRepository = patientRepository;
    }
    async ejecutar(datos) {
        // ✅ NUEVO: Validar firma digital
        const validationResult = signature_validator_1.SignatureValidator.validate(datos.firmaDigital);
        if (!validationResult.valid) {
            throw new Error(validationResult.error);
        }
        // 1. Crear la entidad (Validación de reglas de negocio)
        const nuevoPaciente = patient_entity_1.Paciente.crear({
            dni: datos.dni,
            nombre: datos.nombre,
            apellido: datos.apellido,
            email: datos.email,
            fechaNacimiento: new Date(datos.fechaNacimiento),
            firmaDigital: datos.firmaDigital,
            odontograma: datos.odontograma,
            telefono: datos.telefono,
            nombreApoderado: datos.nombreApoderado,
            direccion: datos.direccion,
            observaciones: datos.observaciones ? [datos.observaciones] : [] // Conversión aquí
        });
        // 2. Guardar en Base de Datos y recibir la entidad actualizada con ID
        const pacienteGuardado = await this.patientRepository.guardar(nuevoPaciente);
        // 3. Devolver el paciente guardado (con ID asignado)
        return pacienteGuardado;
    }
}
exports.CreatePatientUseCase = CreatePatientUseCase;
