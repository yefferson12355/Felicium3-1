import { Odontogram } from '../../domain/odontogram/odontogram.entity';
import { IOdontogramRepository } from './interfaces/IOdontogramRepository';

/**
 * GetOdontogramByPatientUseCase
 * 
 * Caso de uso para OBTENER el odontograma de un PACIENTE
 * 
 * Entrada: patientId
 * Salida: Odontograma del paciente o error si no existe
 * 
 * Diferencia con GetOdontogramByIdUseCase:
 * - Este busca por ID del paciente (más común en la app)
 * - El otro busca por ID del odontograma (menos frecuente)
 */
export class GetOdontogramByPatientUseCase {
  constructor(private odontogramRepository: IOdontogramRepository) {}

  async execute(patientId: string): Promise<Odontogram> {
    if (!patientId || patientId.trim() === '') {
      throw new Error('ID del paciente requerido');
    }

    const odontogram = await this.odontogramRepository.findByPatientId(patientId);

    if (!odontogram) {
      throw new Error(
        `No hay odontograma registrado para el paciente ${patientId}`
      );
    }

    return odontogram;
  }
}
