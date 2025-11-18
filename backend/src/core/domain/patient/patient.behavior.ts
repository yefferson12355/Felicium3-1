// Importamos la entidad "pura" (el contenedor de datos)
import { Paciente } from './patient.entity';


export class ComportamientoPaciente {

  /**
   * COMPORTAMIENTO: Desactiva un paciente (borrado lógico)
   * Modifica el estado del paciente.
   */
  public static desactivar(paciente: Paciente): Paciente {
    paciente.estaActivo = false;
    // (En un modelo real, también actualizaríamos 'fechaActualizacion')
    return paciente;
  }

  /**
   * COMPORTAMIENTO: Activa un paciente
   * Modifica el estado del paciente.
   */
  public static activar(paciente: Paciente): Paciente {
    paciente.estaActivo = true;
    return paciente;
  }
  
  /**
   * COMPORTAMIENTO: Añade una nueva observación
   * Modifica el estado del paciente.
   */
  public static agregarObservacion(paciente: Paciente, observacion: string): Paciente {
    if (observacion && observacion.trim().length > 0) {
      paciente.observaciones.push(observacion);
    }
    return paciente;
  }

  /**
   * COMPORTAMIENTO: Calcula la edad del paciente
   * No modifica al paciente, solo lee sus datos.
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