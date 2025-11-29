"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePatientUseCase = void 0;
// ¡AQUÍ ESTÁ LA CONEXIÓN! Importamos al "Chef" (Behavior)
const patient_behavior_1 = require("../../domain/patient/patient.behavior");
// ✅ NUEVO: Importamos el validador de firmas
const signature_validator_1 = require("../../../shared/validators/signature.validator");
class UpdatePatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async ejecutar(id, datos) {
        // 1. Buscar al paciente actual
        const paciente = await this.repository.buscarPorId(id);
        if (!paciente) {
            throw new Error(`Paciente con ID ${id} no encontrado.`);
        }
        // ✅ NUEVO: Si se intenta cambiar firma, validar que sea válida
        if (datos.firmaDigital) {
            const validationResult = signature_validator_1.SignatureValidator.validate(datos.firmaDigital);
            if (!validationResult.valid) {
                throw new Error(validationResult.error);
            }
        }
        // 2. Usar el COMPORTAMIENTO (Chef) para aplicar los cambios
        // El Caso de Uso NO modifica los datos directamente (ej: paciente.nombre = ...).
        // Le pide al experto (Comportamiento) que lo haga.
        const pacienteActualizado = patient_behavior_1.ComportamientoPaciente.actualizar(paciente, {
            nombre: datos.nombre,
            apellido: datos.apellido,
            email: datos.email,
            telefono: datos.telefono,
            fechaNacimiento: datos.fechaNacimiento ? new Date(datos.fechaNacimiento) : undefined,
            firmaDigital: datos.firmaDigital,
            odontograma: datos.odontograma,
            nombreApoderado: datos.nombreApoderado,
            direccion: datos.direccion
        });
        // 3. Guardar los cambios
        await this.repository.guardar(pacienteActualizado);
        return pacienteActualizado;
    }
}
exports.UpdatePatientUseCase = UpdatePatientUseCase;
