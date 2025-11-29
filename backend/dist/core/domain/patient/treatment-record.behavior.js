"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComportamientoRegistroTratamiento = void 0;
/**
 * @class ComportamientoRegistroTratamiento
 * @description "Caja de herramientas" para las acciones (Comportamientos)
 * que se pueden aplicar a una entidad RegistroTratamiento.
 * Este es el "Doctor" que actúa sobre la "Página".
 */
class ComportamientoRegistroTratamiento {
    /**
     * COMPORTAMIENTO: Actualiza el diagnóstico o las observaciones del doctor
     * Modifica el estado del registro (la "página").
     */
    static actualizar(registro, // El "Ingrediente" (la página)
    datos) {
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
}
exports.ComportamientoRegistroTratamiento = ComportamientoRegistroTratamiento;
