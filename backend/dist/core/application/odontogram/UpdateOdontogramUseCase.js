"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOdontogramUseCase = void 0;
const odontogram_behavior_1 = require("../../domain/odontogram/odontogram.behavior");
/**
 * UpdateOdontogramUseCase
 *
 * Caso de uso para ACTUALIZAR un odontograma
 *
 * Entrada: odontogramId, cambios (estado de dientes, notas, etc.)
 * Salida: Odontograma actualizado
 *
 * Responsabilidades:
 * - Validar que el odontograma exista
 * - Validar que los cambios de estado sean válidos clínicamente
 * - Aplicar comportamientos del dominio
 * - Guardar cambios
 */
class UpdateOdontogramUseCase {
    constructor(odontogramRepository) {
        this.odontogramRepository = odontogramRepository;
    }
    async execute(params) {
        // 1. Validar parámetros
        if (!params.odontogramId || !params.odontogramId.trim()) {
            throw new Error('ID del odontograma requerido');
        }
        if (!params.toothNumber || params.toothNumber < 0) {
            throw new Error('Número de diente inválido');
        }
        if (!params.newState) {
            throw new Error('Nuevo estado requerido');
        }
        // 2. Obtener odontograma actual
        const odontogram = await this.odontogramRepository.findById(params.odontogramId);
        if (!odontogram) {
            throw new Error(`Odontograma ${params.odontogramId} no encontrado`);
        }
        // 3. Aplicar cambio de estado con validación de reglas
        // OdontogramBehavior valida que la transición sea clínicamente permitida
        try {
            odontogram_behavior_1.OdontogramBehavior.changeToothStateWithValidation(odontogram, params.toothNumber, params.newState, params.notes || '');
        }
        catch (error) {
            throw new Error(`Error al actualizar diente: ${error.message}`);
        }
        // 4. Guardar cambios en BD
        const updatedOdontogram = await this.odontogramRepository.update(params.odontogramId, odontogram);
        if (!updatedOdontogram) {
            throw new Error('Error al guardar cambios del odontograma');
        }
        return updatedOdontogram;
    }
}
exports.UpdateOdontogramUseCase = UpdateOdontogramUseCase;
