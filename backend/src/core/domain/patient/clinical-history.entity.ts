// --- 1. CONEXIONES (Importaciones) ---
// No necesita importar reglas, pero sí es buena práctica
// saber que está conceptualmente ligada a un Paciente.
// import { Paciente } from './patient.entity';

/**
 * @class HistoriaClinica
 * @description Entidad "Pura" (Contenedor de Datos) para la "Carpeta" del paciente.
 * Guarda los antecedentes y observaciones generales llenados por la recepcionista.
 * Es "anémica" (pasiva). Su lógica de acciones está en 'clinical-history.behavior.ts'.
 */
export class HistoriaClinica {

  // --- 2. PROPIEDADES (Los Datos de la "Carpeta") ---

  /** ID único de la base de datos (es 'null' si es nueva) */
  public readonly id: number | null;
  
  /** ID del Paciente al que pertenece esta carpeta (Relación 1-a-1) */
  public readonly idPaciente: number; // ¡Obligatorio!

  // --- Tus campos de "Antecedentes" (llena la Recepcionista) ---
  // Usamos "Tipos Literales" para forzar los valores 'SI', 'NO', o 'NO_SABE'
  
  /** Antecedente de Alergias */
  public antecedenteAlergias: 'SI' | 'NO' | 'NO_SABE';
  
  /** Antecedente de Diabetes */
  public antecedenteDiabetes: 'SI' | 'NO' | 'NO_SABE';
  
  /** Antecedente de Hipertensión */
  public antecedenteHipertension: 'SI' | 'NO' | 'NO_SABE';
  
  // (Aquí puedes añadir todos los 'antecedente_...' que necesites)

  /** "la observacion de parte de la recepcionista" */
  public observacionesGenerales: string | null;
  
  /** Fecha de creación (se asigna automáticamente) */
  public readonly fechaCreacion: Date;
  
  /** Fecha de la última actualización (la modificará el 'behavior') */
  public fechaActualizacion: Date;


  // --- 3. CONSTRUCTOR PRIVADO (La "Puerta Cerrada") ---
  private constructor(
    id: number | null,
    idPaciente: number,
    antecedenteAlergias: 'SI' | 'NO' | 'NO_SABE',
    antecedenteDiabetes: 'SI' | 'NO' | 'NO_SABE',
    antecedenteHipertension: 'SI' | 'NO' | 'NO_SABE',
    observacionesGenerales: string | null,
    fechaCreacion: Date,
    fechaActualizacion: Date
  ) {
    this.id = id;
    this.idPaciente = idPaciente;
    this.antecedenteAlergias = antecedenteAlergias;
    this.antecedenteDiabetes = antecedenteDiabetes;
    this.antecedenteHipertension = antecedenteHipertension;
    this.observacionesGenerales = observacionesGenerales;
    this.fechaCreacion = fechaCreacion;
    this.fechaActualizacion = fechaActualizacion;
  }

  // --- 4. FÁBRICAS (Las "Puertas de Entrada") ---

  /**
   * Entrada #1: Para crear una Historia Clínica NUEVA.
   */
  public static crear(
    datos: {
      // Requeridos
      idPaciente: number, // Una "Carpeta" no puede existir sin un "Dueño"
      antecedenteAlergias: 'SI' | 'NO' | 'NO_SABE',
      antecedenteDiabetes: 'SI' | 'NO' | 'NO_SABE',
      antecedenteHipertension: 'SI' | 'NO' | 'NO_SABE',
      
      // Opcionales
      observacionesGenerales?: string | null
    }
  ): HistoriaClinica {
    
    // --- Validación Simple (Regla interna) ---
    // (Como es tan simple, no necesitamos un archivo .rules.ts)
    if (!datos.idPaciente) {
      throw new Error("No se puede crear una Historia Clínica sin un idPaciente.");
    }
    
    const ahora = new Date();
    
    // Llamamos al constructor privado para "ensamblar"
    return new HistoriaClinica(
      null, // id (es nueva)
      datos.idPaciente,
      datos.antecedenteAlergias,
      datos.antecedenteDiabetes,
      datos.antecedenteHipertension,
      datos.observacionesGenerales || null,
      ahora, // fechaCreacion
      ahora  // fechaActualizacion
    );
  }

  /**
   * Entrada #2: Para "re-construir" desde la Base de Datos.
   */
  public static crearExistente(
    datos: {
      id: number,
      idPaciente: number,
      antecedenteAlergias: 'SI' | 'NO' | 'NO_SABE',
      antecedenteDiabetes: 'SI' | 'NO' | 'NO_SABE',
      antecedenteHipertension: 'SI' | 'NO' | 'NO_SABE',
      observacionesGenerales: string | null,
      fechaCreacion: Date,
      fechaActualizacion: Date
    }
  ): HistoriaClinica {
    // Simplemente llama al constructor privado con los datos de la BD
    return new HistoriaClinica(
      datos.id, datos.idPaciente, datos.antecedenteAlergias, datos.antecedenteDiabetes,
      datos.antecedenteHipertension, datos.observacionesGenerales, 
      datos.fechaCreacion, datos.fechaActualizacion
    );
  }
}