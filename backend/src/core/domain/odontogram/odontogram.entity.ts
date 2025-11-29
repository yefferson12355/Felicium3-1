import { Tooth } from './tooth.entity';
import { ToothState } from './tooth-state.enum';

/**
 * Entidad Odontogram (Odontograma)
 * Representa el registro completo de todos los dientes de un paciente
 * 
 * Un odontograma contiene:
 * - 32 dientes en adultos (11-48)
 * - 20 dientes en niños (51-85)
 */
export class Odontogram {
  // Identificadores
  private id: string;                          // ID único del odontograma
  private patientId: string;                   // ID del paciente propietario
  
  // Datos principales
  private teeth: Map<number, Tooth>;           // Map de dientes: número -> Tooth
  private patientAge: number;                  // Edad del paciente
  private isDentureType: 'PERMANENT' | 'TEMPORARY'; // Tipo de dentadura
  
  // Metadata
  private createdAt: Date;                     // Fecha de creación
  private updatedAt: Date;                     // Última actualización
  private clinicalNotes: string;               // Notas clínicas generales del odontograma

  constructor(
    id: string,
    patientId: string,
    patientAge: number,
    isDentureType: 'PERMANENT' | 'TEMPORARY' = 'PERMANENT'
  ) {
    this.validatePatientAge(patientAge, isDentureType);

    this.id = id;
    this.patientId = patientId;
    this.patientAge = patientAge;
    this.isDentureType = isDentureType;
    this.teeth = new Map();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.clinicalNotes = '';

    // Inicializar todos los dientes según el tipo de dentadura
    this.initializeTeeth();
  }

  /**
   * Valida que la edad y tipo de dentadura sean coherentes
   */
  private validatePatientAge(age: number, dentureType: string): void {
    if (age < 0 || age > 150) {
      throw new Error(`Edad inválida: ${age}`);
    }

    // Dentadura temporal típicamente de 6 meses a 12 años
    // Dentadura permanente a partir de los 6-7 años (cuando empiezan a salir)
    if (dentureType === 'TEMPORARY' && age > 13) {
      console.warn(`⚠️ Paciente de ${age} años con dentadura temporal. Considerar cambio a PERMANENT`);
    }
  }

  /**
   * Inicializa todos los dientes según el tipo de dentadura
   * Crea automáticamente los dientes en sus posiciones correctas
   */
  private initializeTeeth(): void {
    let toothNumbers: number[] = [];

    if (this.isDentureType === 'PERMANENT') {
      // Dientes permanentes: 11-48 (32 dientes)
      // Superiores derechos (11-18), superiores izquierdos (21-28)
      // Inferiores izquierdos (31-38), inferiores derechos (41-48)
      for (let i = 11; i <= 18; i++) toothNumbers.push(i);
      for (let i = 21; i <= 28; i++) toothNumbers.push(i);
      for (let i = 31; i <= 38; i++) toothNumbers.push(i);
      for (let i = 41; i <= 48; i++) toothNumbers.push(i);
    } else {
      // Dientes temporales: 51-85 (20 dientes)
      // Superiores derechos (51-55), superiores izquierdos (61-65)
      // Inferiores izquierdos (71-75), inferiores derechos (81-85)
      for (let i = 51; i <= 55; i++) toothNumbers.push(i);
      for (let i = 61; i <= 65; i++) toothNumbers.push(i);
      for (let i = 71; i <= 75; i++) toothNumbers.push(i);
      for (let i = 81; i <= 85; i++) toothNumbers.push(i);
    }

    // Crear instancias de Tooth para cada número
    toothNumbers.forEach(number => {
      const toothType = this.getToothTypeByNumber(number);
      this.teeth.set(number, new Tooth(number, toothType, ToothState.HEALTHY));
    });
  }

  /**
   * Determina el tipo de diente según su número
   */
  private getToothTypeByNumber(number: number): 'INCISOR' | 'CANINE' | 'PREMOLAR' | 'MOLAR' {
    // Extraer los últimos 2 dígitos (11 -> 11, 21 -> 21, etc.)
    const lastDigit = number % 10;

    if (lastDigit <= 2) return 'INCISOR';      // Dientes 1-2: incisivos
    if (lastDigit === 3) return 'CANINE';      // Diente 3: canino
    if (lastDigit >= 4 && lastDigit <= 5) return 'PREMOLAR'; // Dientes 4-5: premolares
    if (lastDigit >= 6 && lastDigit <= 8) return 'MOLAR'; // Dientes 6-8: molares

    throw new Error(`Número de diente inválido: ${number}`);
  }

  // ==================== GETTERS ====================

  getId(): string {
    return this.id;
  }

  getPatientId(): string {
    return this.patientId;
  }

  getPatientAge(): number {
    return this.patientAge;
  }

  getDentureType(): 'PERMANENT' | 'TEMPORARY' {
    return this.isDentureType;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getClinicalNotes(): string {
    return this.clinicalNotes;
  }

  /**
   * Obtiene todos los dientes
   */
  getAllTeeth(): Tooth[] {
    return Array.from(this.teeth.values());
  }

  /**
   * Obtiene un diente específico por su número
   */
  getToothByNumber(number: number): Tooth | null {
    return this.teeth.get(number) || null;
  }

  /**
   * Obtiene todos los dientes con un estado específico
   */
  getTeethByState(state: ToothState): Tooth[] {
    return Array.from(this.teeth.values()).filter(
      tooth => tooth.getState() === state
    );
  }

  /**
   * Obtiene la cantidad total de dientes
   */
  getTotalTeeth(): number {
    return this.teeth.size;
  }

  /**
   * Obtiene la cantidad de dientes en un estado específico
   */
  getTeethCountByState(state: ToothState): number {
    return this.getTeethByState(state).length;
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Cambia el estado de un diente específico
   */
  updateToothState(toothNumber: number, newState: ToothState, notes: string = ''): void {
    const tooth = this.teeth.get(toothNumber);
    if (!tooth) {
      throw new Error(`Diente ${toothNumber} no encontrado en el odontograma`);
    }

    tooth.changeState(newState, notes);
    this.updatedAt = new Date();
  }

  /**
   * Agrega una nota clínica al odontograma general
   */
  addClinicalNote(note: string): void {
    const timestamp = new Date().toISOString();
    this.clinicalNotes += `\n[${timestamp}] ${note}`;
    this.updatedAt = new Date();
  }

  /**
   * Obtiene un resumen general del odontograma
   */
  getSummary() {
    const summary = {
      totalTeeth: this.getTotalTeeth(),
      denturetype: this.isDentureType,
      stateBreakdown: {} as Record<string, number>,
      teethRequiringAttention: 0,
      lastUpdated: this.updatedAt.toISOString(),
    };

    // Contar dientes por estado
    Object.values(ToothState).forEach(state => {
      const count = this.getTeethCountByState(state as ToothState);
      if (count > 0) {
        summary.stateBreakdown[state] = count;
      }
    });

    // Contar dientes que requieren atención
    const problemStates = [
      ToothState.CARIES,
      ToothState.CAVITY,
      ToothState.IN_TREATMENT,
      ToothState.NEEDS_ATTENTION,
      ToothState.PLANNED_EXTRACTION,
    ];

    summary.teethRequiringAttention = Array.from(this.teeth.values()).filter(
      tooth => problemStates.includes(tooth.getState())
    ).length;

    return summary;
  }

  /**
   * Verifica si el odontograma está completo (todos los dientes tienen estado)
   */
  isComplete(): boolean {
    return Array.from(this.teeth.values()).every(
      tooth => tooth.getState() !== ToothState.HEALTHY || tooth.getClinicalNotes().length > 0
    );
  }

  /**
   * Convierte el odontograma a objeto JSON para almacenamiento
   */
  toJSON() {
    return {
      id: this.id,
      patientId: this.patientId,
      patientAge: this.patientAge,
      isDentureType: this.isDentureType,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      clinicalNotes: this.clinicalNotes,
      teeth: Array.from(this.teeth.entries()).reduce(
        (acc, [number, tooth]) => {
          acc[number] = tooth.toJSON();
          return acc;
        },
        {} as Record<number, any>
      ),
    };
  }

  /**
   * Crea un Odontogram desde un objeto JSON
   */
  static fromJSON(data: any): Odontogram {
    const odontogram = new Odontogram(
      data.id,
      data.patientId,
      data.patientAge,
      data.isDentureType
    );

    odontogram.createdAt = new Date(data.createdAt);
    odontogram.updatedAt = new Date(data.updatedAt);
    odontogram.clinicalNotes = data.clinicalNotes || '';

    // Restaurar dientes desde JSON
    if (data.teeth) {
      Object.entries(data.teeth).forEach(([number, toothData]) => {
        const tooth = Tooth.fromJSON(toothData);
        odontogram.teeth.set(parseInt(number), tooth);
      });
    }

    return odontogram;
  }
}
