"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPatientByIdUseCase = void 0;
class GetPatientByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async ejecutar(id) {
        const paciente = await this.repository.buscarPorId(id);
        if (!paciente) {
            throw new Error(`Paciente con ID ${id} no encontrado.`);
        }
        return paciente;
    }
}
exports.GetPatientByIdUseCase = GetPatientByIdUseCase;
