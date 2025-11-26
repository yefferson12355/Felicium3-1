// --- 1. CONEXIONES (Importaciones) ---
// Importamos la entidad "pura" (la "Carpeta" pasiva)
import { HistoriaClinica } from './clinical-history.entity';

/**
 * @class ComportamientoHistoriaClinica
 * @description "Caja de herramientas" para las acciones (Comportamientos)
 * que se pueden aplicar a una entidad HistoriaClinica.
 */
export class ComportamientoHistoriaClinica {

  /**
   * COMPORTAMIENTO: Actualiza las observaciones generales (las de la recepcionista)
   * Modifica el estado de la historia.
   */
  public static actualizarObservaciones(
    historia: HistoriaClinica, // El "Ingrediente" (la carpeta)
    nuevasObservaciones: string | null // Los nuevos datos
  ): HistoriaClinica {
    
    // Asignamos el nuevo valor
    historia.observacionesGenerales = nuevasObservaciones || null;
    
    // ¡Importante! Marcamos que la carpeta fue modificada
    historia.fechaActualizacion = new Date();
    
    return historia; // Devolvemos la carpeta modificada
  }
  
  /**
   * COMPORTAMIENTO: Actualiza uno o más antecedentes
   * Modifica el estado de la historia.
   */
  public static actualizarAntecedentes(
    historia: HistoriaClinica, // El "Ingrediente"
    datos: { // "Paquete" de nuevos datos
      antecedenteAlergias?: 'SI' | 'NO' | 'NO_SABE',
      antecedenteDiabetes?: 'SI' | 'NO' | 'NO_SABE',
      antecedenteHipertension?: 'SI' | 'NO' | 'NO_SABE'
    }
  ): HistoriaClinica {
    
    // Actualizamos solo los campos que nos pasaron
    if (datos.antecedenteAlergias) {
      historia.antecedenteAlergias = datos.antecedenteAlergias;
    }
    if (datos.antecedenteDiabetes) {
      historia.antecedenteDiabetes = datos.antecedenteDiabetes;
    }
    if (datos.antecedenteHipertension) {
      historia.antecedenteHipertension = datos.antecedenteHipertension;
    }

    // Marcamos que la carpeta fue modificada
    historia.fechaActualizacion = new Date();
    
    return historia;
  }
}