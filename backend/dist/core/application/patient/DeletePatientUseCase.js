"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePatientUseCase = void 0;
const patient_behavior_1 = require("../../domain/patient/patient.behavior");
class DeletePatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async ejecutar(id) {
        // 1. Buscar
        const paciente = await this.repository.buscarPorId(id);
        if (!paciente) {
            throw new Error(`Paciente con ID ${id} no encontrado.`);
        }
        // 2. Aplicar Comportamiento (Soft Delete)
        // Llamamos a la función 'desactivar' que creamos en el archivo behavior
        const pacienteDesactivado = patient_behavior_1.ComportamientoPaciente.desactivar(paciente);
        // 3. Guardar el cambio (el repositorio hará un UPDATE set estaActivo = false)
        await this.repository.guardar(pacienteDesactivado);
    }
}
exports.DeletePatientUseCase = DeletePatientUseCase;
