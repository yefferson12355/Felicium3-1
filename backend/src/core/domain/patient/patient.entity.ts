
import { ReglasPaciente } from './patient.rules';
// NOTA IMPORTANTE:
//El comportamiento esta separado , y se llamara en los servicios de aplicacion o en los controladores segun convenga

/**
 * @class Paciente
 * @description Esta es la Entidad de Dominio "Pura" (Contenedor de Datos).
 */
export class Paciente {

  // --- 2. PROPIEDADES (Los "Datos" del Paciente) ---

  public readonly id: number | null;
  public nombre: string;
  public apellido: string;
  public email: string;
  public dni: string;
  public telefono: string | null;
  public fechaNacimiento: Date; 
  public firmaDigital: string;
  public odontograma: string;
  public nombreApoderado: string | null; 
  public direccion: string | null; 
  public estaActivo: boolean;
  public observaciones: string[];
  /** Fecha de creación (se asigna automáticamente, no se puede cambiar) */
  public readonly fechaCreacion: Date;

  // --- 3. CONSTRUCTOR PRIVADO (La "Puerta Cerrada") ---
  /**
   * El constructor es PRIVADO.
   * Esto "fuerza" a que todo el código externo deba usar
   * las "fábricas" ('crear' o 'crearExistente') para
   * obtener una instancia de Paciente.
   * ¡Así nos aseguramos que nadie cree un Paciente "inválido"!
   */
  private constructor(
    id: number | null,
    nombre: string,
    apellido: string,
    email: string,
    dni: string,
    telefono: string | null,
    fechaNacimiento: Date,     
    firmaDigital: string,      
    odontograma: string,     
    nombreApoderado: string | null, 
    direccion: string | null,   
    estaActivo: boolean,
    observaciones: string[],
    fechaCreacion: Date
  ) {
    // Esta parte es la "asignación" simple de los datos
    // que recibimos a las propiedades de la clase (this).
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.dni = dni;
    this.telefono = telefono;
    this.fechaNacimiento = fechaNacimiento;
    this.firmaDigital = firmaDigital;
    this.odontograma = odontograma;
    this.nombreApoderado = nombreApoderado;
    this.direccion = direccion;
    this.estaActivo = estaActivo;
    this.observaciones = observaciones;
    this.fechaCreacion = fechaCreacion;
  }


  
  public static crear(
    datos: {
      // Requeridos
      dni: string,
      nombre: string,
      apellido: string,
      email: string,
      fechaNacimiento: Date,
      firmaDigital: string,
      odontograma: string,
      
      // Opcionales (por eso el '?')
      telefono?: string | null,
      nombreApoderado?: string | null,
      direccion?: string | null,
      observaciones?: string[]
    }
  ): Paciente {
    // Aquí aplicamos las reglas de validación
    // Aki se aplican las Reglas creadas en patient.rules.ts ---

    if (!ReglasPaciente.validarTextoRequerido(datos.nombre)) {
      throw new Error("El nombre es requerido y debe tener al menos 2 caracteres.");
    }
    
    if (!ReglasPaciente.validarTextoRequerido(datos.apellido)) {
      throw new Error("El apellido es requerido y debe tener al menos 2 caracteres.");
    }

    if (!ReglasPaciente.validarDNI(datos.dni)) {
      // Damos un error descriptivo
      throw new Error(`El DNI proporcionado ('${datos.dni}') no es válido. Debe tener 8 caracteres.`);
    }

    if (!ReglasPaciente.validarEmail(datos.email)) {
      throw new Error(`El email proporcionado ('${datos.email}') no tiene un formato válido.`);
    }

    // (Aquí podríamos añadir validaciones para firma, odontograma, etc.)

    // Si pasa todas las validaciones, llamamos al constructor privado
    // para "ensamblar" el objeto.
    return new Paciente(
      null, // id (es nuevo, la BD lo asignará)
      datos.nombre,
      datos.apellido,
      datos.email,
      datos.dni,
      datos.telefono || null,       // '|| null' asigna null si es 'undefined'
      datos.fechaNacimiento,
      datos.firmaDigital,
      datos.odontograma,
      datos.nombreApoderado || null,
      datos.direccion || null,
      true,   // estaActivo (nuevo paciente siempre está activo)
      datos.observaciones || [], // Un array vacío por defecto
      new Date() // fechaCreacion (se asigna automáticamente)
    );
  }

  /**
   * Entrada #2: Para "re-construir" un Paciente desde la Base de Datos.
   * No necesita validaciones porque confiamos en la BD.
   * Lo usará el "Repositorio" cuando lea los datos.
   */
  public static crearExistente(
    datos: {
      id: number,
      nombre: string,
      apellido: string,
      email: string,
      dni: string,
      telefono: string | null,
      fechaNacimiento: Date,
      firmaDigital: string,
      odontograma: string,
      nombreApoderado: string | null,
      direccion: string | null,
      estaActivo: boolean,
      observaciones: string[],
      fechaCreacion: Date
    }
  ): Paciente {
    // Simplemente llama al constructor privado con todos los datos
    // y los asigna directamente, sin validar.
    return new Paciente(
      datos.id, datos.nombre, datos.apellido, datos.email, datos.dni,
      datos.telefono, datos.fechaNacimiento, datos.firmaDigital,
      datos.odontograma, datos.nombreApoderado, datos.direccion,
      datos.estaActivo, datos.observaciones, datos.fechaCreacion
    );
  }
} // <-- Fin de la clase Paciente