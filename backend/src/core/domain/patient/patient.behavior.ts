// Importamos la entidad "pura"
import { Paciente } from './patient.entity';
// ¡NUEVO! Importamos las reglas para validar al actualizar
import { ReglasPaciente } from './patient.rules';

export class ComportamientoPaciente {

  /**
   * COMPORTAMIENTO: Actualiza los datos de un paciente.
   * (Este es el método que te faltaba)
   */
  public static actualizar(
    paciente: Paciente, // El "Ingrediente" original
    datos: {           // Los cambios que queremos hacer
      nombre?: string,
      apellido?: string,
      email?: string,
      telefono?: string | null,
      fechaNacimiento?: Date,
      firmaDigital?: string,
      odontograma?: string,
      nombreApoderado?: string | null,
      direccion?: string | null
    }
  ): Paciente {

    // --- Validamos y Asignamos ---
    
    if (datos.nombre !== undefined) {
      if (!ReglasPaciente.validarTextoRequerido(datos.nombre)) {
        throw new Error("El nombre no es válido para actualizar.");
      }
      paciente.nombre = datos.nombre;
    }

    if (datos.apellido !== undefined) {
      if (!ReglasPaciente.validarTextoRequerido(datos.apellido)) {
        throw new Error("El apellido no es válido para actualizar.");
      }
      paciente.apellido = datos.apellido;
    }

    if (datos.email !== undefined) {
      if (!ReglasPaciente.validarEmail(datos.email)) {
        throw new Error("El email no es válido para actualizar.");
      }
      paciente.email = datos.email;
    }

    // Campos opcionales (sin validación compleja por ahora)
    if (datos.telefono !== undefined) paciente.telefono = datos.telefono;
    if (datos.fechaNacimiento !== undefined) paciente.fechaNacimiento = datos.fechaNacimiento;
    if (datos.firmaDigital !== undefined) paciente.firmaDigital = datos.firmaDigital;
    if (datos.odontograma !== undefined) paciente.odontograma = datos.odontograma;
    if (datos.nombreApoderado !== undefined) paciente.nombreApoderado = datos.nombreApoderado;
    if (datos.direccion !== undefined) paciente.direccion = datos.direccion;

    return paciente;
  }

  /**
   * COMPORTAMIENTO: Desactiva un paciente (borrado lógico)
   */
  public static desactivar(paciente: Paciente): Paciente {
    paciente.estaActivo = false;
    return paciente;
  }

  /**
   * COMPORTAMIENTO: Activa un paciente
   */
  public static activar(paciente: Paciente): Paciente {
    paciente.estaActivo = true;
    return paciente;
  }
  
  /**
   * COMPORTAMIENTO: Añade una nueva observación
   */
  public static agregarObservacion(paciente: Paciente, observacion: string): Paciente {
    if (observacion && observacion.trim().length > 0) {
      paciente.observaciones.push(observacion);
    }
    return paciente;
  }

  /**
   * COMPORTAMIENTO: Calcula la edad del paciente
   */
  public static calcularEdad(paciente: Paciente): number | null {
    if (!paciente.fechaNacimiento) return null;
    
    const hoy = new Date();
    const cumple = new Date(paciente.fechaNacimiento);
    let edad = hoy.getFullYear() - cumple.getFullYear();
    const mes = hoy.getMonth() - cumple.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < cumple.getDate())) {
      edad--;
    }
    return edad;
  }
}