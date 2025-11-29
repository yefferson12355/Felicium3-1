"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOdontogramUseCase = void 0;
/**
 * DeleteOdontogramUseCase
 *
 * Caso de uso para ELIMINAR un odontograma
 *
 * Entrada: odontogramId
 * Salida: Confirmación de eliminación
 *
 * ⚠️ IMPORTANTE:
 * Esto es un borrado lógico en producción (marcar como eliminado).
 * No se recomienda borrar odontogramas históricos de la BD.
 */
class DeleteOdontogramUseCase {
    constructor(odontogramRepository) {
        this.odontogramRepository = odontogramRepository;
    }
    async execute(odontogramId) {
        if (!odontogramId || odontogramId.trim() === '') {
            throw new Error('ID del odontograma requerido');
        }
        // Verificar que existe antes de eliminarlo
        const odontogram = await this.odontogramRepository.findById(odontogramId);
        if (!odontogram) {
            throw new Error(`Odontograma ${odontogramId} no encontrado`);
        }
        // Eliminar
        const deleted = await this.odontogramRepository.delete(odontogramId);
        if (!deleted) {
            throw new Error('Error al eliminar el odontograma');
        }
        return true;
    }
}
exports.DeleteOdontogramUseCase = DeleteOdontogramUseCase;
