import { Odontogram } from '../../domain/odontogram/odontogram.entity';
import { IOdontogramRepository } from './interfaces/IOdontogramRepository';

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
export class DeleteOdontogramUseCase {
  constructor(private odontogramRepository: IOdontogramRepository) {}

  async execute(odontogramId: string): Promise<boolean> {
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
