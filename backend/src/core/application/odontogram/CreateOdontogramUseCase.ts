import { Odontogram } from '../../domain/odontogram/odontogram.entity';
import { IOdontogramRepository } from './interfaces/IOdontogramRepository';

/**
 * CreateOdontogramUseCase
 * 
 * Caso de uso para CREAR un nuevo odontograma para un paciente
 * 
 * Entrada: patientId, patientAge, dentureType
 * Salida: Odontograma creado con todos sus dientes inicializados
 * 
 * Responsabilidades:
 * - Validar que el paciente no tenga ya un odontograma
 * - Validar edad coherente
 * - Crear odontograma con dientes inicializados
 * - Guardar en BD
 */
export class CreateOdontogramUseCase {
  constructor(private odontogramRepository: IOdontogramRepository) {}

  /**
   * Ejecuta el caso de uso
   */
  async execute(params: {
    patientId: string;
    patientAge: number;
    dentureType: 'PERMANENT' | 'TEMPORARY';
  }): Promise<Odontogram> {
    // 1. Validar que el paciente no tenga ya un odontograma
    const existingOdontogram = await this.odontogramRepository.findByPatientId(
      params.patientId
    );

    if (existingOdontogram) {
      throw new Error(
        `El paciente ${params.patientId} ya tiene un odontograma registrado`
      );
    }

    // 2. Validar edad
    if (params.patientAge < 0 || params.patientAge > 150) {
      throw new Error(`Edad inválida: ${params.patientAge}`);
    }

    // 3. Generar ID único para el odontograma
    const odontogramId = `odon-${params.patientId}-${Date.now()}`;

    // 4. Crear la entidad Odontogram
    // Esto inicializa automáticamente todos los dientes con estado HEALTHY
    const odontogram = new Odontogram(
      odontogramId,
      params.patientId,
      params.patientAge,
      params.dentureType
    );

    // 5. Guardar en la BD
    const savedOdontogram = await this.odontogramRepository.save(odontogram);

    return savedOdontogram;
  }
}
