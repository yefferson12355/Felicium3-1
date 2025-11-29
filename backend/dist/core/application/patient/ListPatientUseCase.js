"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPatientUseCase = void 0;
class ListPatientUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async ejecutar() {
        return await this.repository.obtenerTodos();
    }
}
exports.ListPatientUseCase = ListPatientUseCase;
