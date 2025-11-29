"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComportamientoHistoriaClinica = void 0;
/**
 * @class ComportamientoHistoriaClinica
 * @description "Caja de herramientas" para las acciones (Comportamientos)
 * que se pueden aplicar a una entidad HistoriaClinica.
 */
class ComportamientoHistoriaClinica {
    /**
     * COMPORTAMIENTO: Actualiza las observaciones generales (las de la recepcionista)
     * Modifica el estado de la historia.
     */
    static actualizarObservaciones(historia, // El "Ingrediente" (la carpeta)
    nuevasObservaciones // Los nuevos datos
    ) {
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
    static actualizarAntecedentes(historia, // El "Ingrediente"
    datos) {
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
exports.ComportamientoHistoriaClinica = ComportamientoHistoriaClinica;
