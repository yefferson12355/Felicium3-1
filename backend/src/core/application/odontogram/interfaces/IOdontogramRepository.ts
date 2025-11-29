import { Odontogram } from '../../../domain/odontogram/odontogram.entity';

/**
 * Interfaz IOdontogramRepository
 * Define el contrato que debe cumplir cualquier implementación de repositorio
 * de odontogramas. Esto permite cambiar la BD sin afectar la lógica de negocio.
 * 
 * Patrón: Repository Pattern (abstracción de acceso a datos)
 */
export interface IOdontogramRepository {
  /**
   * Guarda un nuevo odontograma en la BD
   * @param odontogram Odontograma a guardar
   * @returns Promise con el odontograma guardado
   */
  save(odontogram: Odontogram): Promise<Odontogram>;

  /**
   * Obtiene un odontograma por su ID
   * @param id ID del odontograma
   * @returns Promise con el odontograma o null si no existe
   */
  findById(id: string): Promise<Odontogram | null>;

  /**
   * Obtiene el odontograma de un paciente específico
   * @param patientId ID del paciente
   * @returns Promise con el odontograma o null si no existe
   */
  findByPatientId(patientId: string): Promise<Odontogram | null>;

  /**
   * Obtiene todos los odontogramas
   * Útil para reporting general (usar con cuidado en producción con paginación)
   * @returns Promise con array de todos los odontogramas
   */
  findAll(): Promise<Odontogram[]>;

  /**
   * Actualiza un odontograma existente
   * @param id ID del odontograma a actualizar
   * @param odontogram Datos actualizados
   * @returns Promise con el odontograma actualizado o null si no existe
   */
  update(id: string, odontogram: Odontogram): Promise<Odontogram | null>;

  /**
   * Elimina un odontograma
   * @param id ID del odontograma a eliminar
   * @returns Promise con boolean indicando si se eliminó
   */
  delete(id: string): Promise<boolean>;

  /**
   * Verifica si existe un odontograma para un paciente
   * @param patientId ID del paciente
   * @returns Promise con boolean
   */
  existsByPatientId(patientId: string): Promise<boolean>;
}
