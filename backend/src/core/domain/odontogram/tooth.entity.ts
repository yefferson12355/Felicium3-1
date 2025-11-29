import { ToothState } from './tooth-state.enum';
import { ToothSurface } from './tooth-surface.enum';

/**
 * Entidad Tooth (Diente)
 * Representa un diente individual en el odontograma
 * 
 * Sistema de numeración dental:
 * - 11-18: Dientes superiores derechos
 * - 21-28: Dientes superiores izquierdos
 * - 31-38: Dientes inferiores izquierdos
 * - 41-48: Dientes inferiores derechos
 * 
 * En dientes temporales (niños):
 * - 51-55: Dientes superiores derechos
 * - 61-65: Dientes superiores izquierdos
 * - 71-75: Dientes inferiores izquierdos
 * - 81-85: Dientes inferiores derechos
 */
export class Tooth {
  // Propiedades identificadores
  private number: number;              // Número FDI (11-48 adultos, 51-85 niños)
  private toothType: 'INCISOR' | 'CANINE' | 'PREMOLAR' | 'MOLAR'; // Tipo de diente

  // Estado principal del diente
  private state: ToothState;           // Estado actual del diente

  // Problemas por superficie (mapeo: superficie -> si tiene problema)
  private surfaceProblems: Map<ToothSurface, boolean>;

  // Notas clínicas específicas
  private clinicalNotes: string;       // Notas del dentista sobre este diente
  private lastReview: Date;            // Última revisión de este diente

  constructor(
    number: number,
    toothType: 'INCISOR' | 'CANINE' | 'PREMOLAR' | 'MOLAR',
    state: ToothState = ToothState.HEALTHY
  ) {
    this.validateToothNumber(number);
    
    this.number = number;
    this.toothType = toothType;
    this.state = state;
    this.surfaceProblems = new Map();
    this.clinicalNotes = '';
    this.lastReview = new Date();

    // Inicializar todas las superficies sin problemas
    this.initializeSurfaces();
  }

  /**
   * Valida que el número de diente sea válido
   */
  private validateToothNumber(number: number): void {
    const validRanges = [
      { min: 11, max: 48 },  // Dientes permanentes
      { min: 51, max: 85 },  // Dientes temporales
    ];

    const isValid = validRanges.some(
      range => number >= range.min && number <= range.max
    );

    if (!isValid) {
      throw new Error(`Número de diente inválido: ${number}. Debe estar entre 11-48 (adultos) o 51-85 (niños)`);
    }
  }

  /**
   * Inicializa todas las superficies del diente
   * Al crear un diente nuevo, todas las superficies están sanas
   */
  private initializeSurfaces(): void {
    Object.values(ToothSurface).forEach(surface => {
      this.surfaceProblems.set(surface as ToothSurface, false);
    });
  }

  // ==================== GETTERS ====================

  getNumber(): number {
    return this.number;
  }

  getToothType(): 'INCISOR' | 'CANINE' | 'PREMOLAR' | 'MOLAR' {
    return this.toothType;
  }

  getState(): ToothState {
    return this.state;
  }

  getClinicalNotes(): string {
    return this.clinicalNotes;
  }

  getLastReview(): Date {
    return this.lastReview;
  }

  /**
   * Obtiene todas las superficies con problemas
   */
  getSurfacesWithProblems(): ToothSurface[] {
    return Array.from(this.surfaceProblems.entries())
      .filter(([_, hasProblem]) => hasProblem)
      .map(([surface, _]) => surface);
  }

  /**
   * Verifica si una superficie específica tiene problema
   */
  hasSurfaceProblem(surface: ToothSurface): boolean {
    return this.surfaceProblems.get(surface) || false;
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Cambia el estado del diente
   * @param newState Nuevo estado del diente
   * @param notes Notas adicionales sobre el cambio
   */
  changeState(newState: ToothState, notes: string = ''): void {
    this.state = newState;
    if (notes) {
      this.clinicalNotes += `\n[${new Date().toISOString()}] ${notes}`;
    }
    this.lastReview = new Date();
  }

  /**
   * Marca una superficie como problemática
   * @param surface Superficie del diente
   * @param hasProblem true si tiene problema, false si está sano
   */
  markSurfaceProblem(surface: ToothSurface, hasProblem: boolean): void {
    this.surfaceProblems.set(surface, hasProblem);
  }

  /**
   * Marca múltiples superficies como problemáticas
   * @param surfaces Superficies a marcar
   */
  markMultipleSurfaceProblems(surfaces: ToothSurface[]): void {
    // Primero, limpiar todas las superficies
    this.surfaceProblems.forEach((_, key) => {
      this.surfaceProblems.set(key, false);
    });

    // Luego marcar las especificadas
    surfaces.forEach(surface => {
      this.surfaceProblems.set(surface, true);
    });
  }

  /**
   * Limpia todas las superficies (marca como sanas)
   */
  clearAllSurfaceProblems(): void {
    this.surfaceProblems.forEach((_, key) => {
      this.surfaceProblems.set(key, false);
    });
  }

  /**
   * Agrega notas clínicas sobre este diente
   */
  addClinicalNote(note: string): void {
    const timestamp = new Date().toISOString();
    this.clinicalNotes += `\n[${timestamp}] ${note}`;
  }

  /**
   * Convierte el diente a objeto JSON para almacenamiento
   */
  toJSON() {
    return {
      number: this.number,
      toothType: this.toothType,
      state: this.state,
      surfaceProblems: Array.from(this.surfaceProblems.entries()).reduce(
        (acc, [surface, hasProblem]) => {
          acc[surface] = hasProblem;
          return acc;
        },
        {} as Record<string, boolean>
      ),
      clinicalNotes: this.clinicalNotes,
      lastReview: this.lastReview.toISOString(),
    };
  }

  /**
   * Crea un Tooth desde un objeto JSON
   */
  static fromJSON(data: any): Tooth {
    const tooth = new Tooth(data.number, data.toothType, data.state);
    tooth.clinicalNotes = data.clinicalNotes || '';
    tooth.lastReview = new Date(data.lastReview);

    if (data.surfaceProblems) {
      Object.entries(data.surfaceProblems).forEach(([surface, hasProblem]) => {
        tooth.surfaceProblems.set(surface as ToothSurface, hasProblem as boolean);
      });
    }

    return tooth;
  }
}
