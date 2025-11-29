"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOdontogramByIdUseCase = void 0;
/**
 * GetOdontogramByIdUseCase
 *
 * Caso de uso para OBTENER un odontograma por su ID
 *
 * Entrada: odontogramId
 * Salida: Odontograma con todos sus dientes o error si no existe
 */
class GetOdontogramByIdUseCase {
    constructor(odontogramRepository) {
        this.odontogramRepository = odontogramRepository;
    }
    async execute(odontogramId) {
        if (!odontogramId || odontogramId.trim() === '') {
            throw new Error('ID del odontograma requerido');
        }
        const odontogram = await this.odontogramRepository.findById(odontogramId);
        if (!odontogram) {
            throw new Error(`Odontograma ${odontogramId} no encontrado`);
        }
        return odontogram;
    }
}
exports.GetOdontogramByIdUseCase = GetOdontogramByIdUseCase;
