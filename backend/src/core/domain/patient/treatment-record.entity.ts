// --- 1. CONEXIONES (Importaciones) ---
// Esta "Página" debe pertenecer a una "Carpeta" (HistoriaClinica)
// import { HistoriaClinica } from './clinical-history.entity';

/**
 * @class RegistroTratamiento
 * @description Entidad "Pura" (Contenedor de Datos) para la "Página" de cada visita.
 * Guarda el diagnóstico y observaciones del Doctor para una cita específica.
 * Es "anémica" (pasiva). Su lógica de acciones está en 'treatment-record.behavior.ts'.
 */
export class RegistroTratamiento {

  // --- 2. PROPIEDADES (Los Datos de la "Página") ---

  /** ID único de este registro (es 'null' si es nuevo) */
  public readonly id: string | null;
  
  /** ID de la "Carpeta" (HistoriaClinica) a la que pertenece (Relación N-a-1) */
  public readonly idHistoriaClinica: string; // ¡Obligatorio!

  /** ID del Doctor que realizó este registro */
  public readonly idDoctor: string; // ¡Obligatorio!

  /** ID de la Cita asociada a este registro (opcional pero recomendado) */
  public readonly idCita?: string | null;
  
  /** El diagnóstico del Doctor en esta visita */
  public diagnostico: string;

  /** El procedimiento que se realizó (ej: "Endodoncia") */
  public procedimientoRealizado: string | null;

  /** "la observacion de la misma" (las notas del Doctor) */
  public observacionesDoctor: string | null;
  
  /** La fecha en que se hizo este registro (se asigna al crear) */
  public readonly fechaRegistro: Date;
  
  /** Fecha de la última actualización (la modificará el 'behavior') */
  public fechaActualizacion: Date;

  // --- 3. CONSTRUCTOR PRIVADO (La "Puerta Cerrada") ---
  private constructor(
    id: string | null,
    idHistoriaClinica: string,
    idDoctor: string,
    diagnostico: string,
    procedimientoRealizado: string | null,
    observacionesDoctor: string | null,
    fechaRegistro: Date,
    fechaActualizacion: Date,
    idCita?: string | null
  ) {
    this.id = id;
    this.idHistoriaClinica = idHistoriaClinica;
    this.idDoctor = idDoctor;
    this.diagnostico = diagnostico;
    this.procedimientoRealizado = procedimientoRealizado;
    this.observacionesDoctor = observacionesDoctor;
    this.fechaRegistro = fechaRegistro;
    this.fechaActualizacion = fechaActualizacion;
    this.idCita = idCita;
  }

  // --- 4. FÁBRICAS (Las "Puertas de Entrada") ---

  /**
   * Entrada #1: Para crear un Registro (Página) NUEVO.
   * Lo usa el doctor al finalizar una cita.
   */
  public static crear(
    datos: {
      // Requeridos
      idHistoriaClinica: string, // Debe pertenecer a una "Carpeta"
      idDoctor: string,          // Un Doctor debe firmarlo
      diagnostico: string,       // El hallazgo principal
      
      // Opcionales
      procedimientoRealizado?: string | null,
      observacionesDoctor?: string | null,
      idCita?: string | null
    }
  ): RegistroTratamiento {
    
    // --- Validación Simple (Regla interna) ---
    // (Como son simples, no necesitan un .rules.ts)
    if (!datos.idHistoriaClinica) {
      throw new Error("No se puede crear un Registro sin una Historia Clínica.");
    }
    if (!datos.idDoctor) {
      throw new Error("No se puede crear un Registro sin un Doctor.");
    }
    if (!datos.diagnostico || datos.diagnostico.trim() === "") {
      throw new Error("El diagnóstico no puede estar vacío.");
    }
    
    const ahora = new Date();
    
    // Llamamos al constructor privado para "ensamblar"
    return new RegistroTratamiento(
      null, // id (es nuevo)
      datos.idHistoriaClinica,
      datos.idDoctor,
      datos.diagnostico,
      datos.procedimientoRealizado || null,
      datos.observacionesDoctor || null,
      ahora, // fechaRegistro
      ahora, // fechaActualizacion
      datos.idCita || null
    );
  }

  /**
   * Entrada #2: Para "re-construir" desde la Base de Datos.
   * Lo usará el Repositorio para cargar las "páginas" existentes.
   */
  public static crearExistente(
    datos: {
      id: string,
      idHistoriaClinica: string,
      idDoctor: string,
      diagnostico: string,
      procedimientoRealizado: string | null,
      observacionesDoctor: string | null,
      fechaRegistro: Date,
      fechaActualizacion: Date,
      idCita?: string | null
    }
  ): RegistroTratamiento {
    // Simplemente llama al constructor privado con los datos de la BD
    return new RegistroTratamiento(
      datos.id, datos.idHistoriaClinica, datos.idDoctor, datos.diagnostico,
      datos.procedimientoRealizado, datos.observacionesDoctor,
      datos.fechaRegistro, datos.fechaActualizacion, datos.idCita
    );
  }
}