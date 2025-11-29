import { Odontogram } from '../../domain/odontogram/odontogram.entity';
import { IOdontogramRepository } from './interfaces/IOdontogramRepository';

/**
 * GetOdontogramByIdUseCase
 * 
 * Caso de uso para OBTENER un odontograma por su ID
 * 
 * Entrada: odontogramId
 * Salida: Odontograma con todos sus dientes o error si no existe
 */
export class GetOdontogramByIdUseCase {
  constructor(private odontogramRepository: IOdontogramRepository) {}

  async execute(odontogramId: string): Promise<Odontogram> {
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
