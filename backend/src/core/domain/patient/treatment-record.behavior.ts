// --- 1. CONEXIONES (Importaciones) ---
// Importamos la entidad "pura" (la "Página" pasiva)
import { RegistroTratamiento } from './treatment-record.entity';

/**
 * @class ComportamientoRegistroTratamiento
 * @description "Caja de herramientas" para las acciones (Comportamientos)
 * que se pueden aplicar a una entidad RegistroTratamiento.
 * Este es el "Doctor" que actúa sobre la "Página".
 */
export class ComportamientoRegistroTratamiento {

  /**
   * COMPORTAMIENTO: Actualiza el diagnóstico o las observaciones del doctor
   * Modifica el estado del registro (la "página").
   */
  public static actualizar(
    registro: RegistroTratamiento, // El "Ingrediente" (la página)
    datos: { // "Paquete" de nuevos datos
      diagnostico?: string,
      procedimientoRealizado?: string | null,
      observacionesDoctor?: string | null
    }
  ): RegistroTratamiento {
    
    // Actualizamos solo los campos que nos pasaron
    
    if (datos.diagnostico !== undefined) {
      // Hacemos la validación simple aquí
      if (datos.diagnostico.trim() === "") {
        throw new Error("El diagnóstico no puede estar vacío.");
      }
      registro.diagnostico = datos.diagnostico;
    }

    if (datos.procedimientoRealizado !== undefined) {
      registro.procedimientoRealizado = datos.procedimientoRealizado || null;
    }
    
    if (datos.observacionesDoctor !== undefined) {
      registro.observacionesDoctor = datos.observacionesDoctor || null;
    }

    // ¡Importante! Marcamos que la página fue modificada
    registro.fechaActualizacion = new Date();
    
    return registro; // Devolvemos la página modificada
  }

  // (Aquí podríamos añadir otros comportamientos,
  // por ejemplo, si una nota necesita "firma" o "cierre")
}