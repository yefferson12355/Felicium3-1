"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComportamientoPaciente = void 0;
// ¡NUEVO! Importamos las reglas para validar al actualizar
const patient_rules_1 = require("./patient.rules");
class ComportamientoPaciente {
    /**
     * COMPORTAMIENTO: Actualiza los datos de un paciente.
     * (Este es el método que te faltaba)
     */
    static actualizar(paciente, // El "Ingrediente" original
    datos) {
        // --- Validamos y Asignamos ---
        if (datos.nombre !== undefined) {
            if (!patient_rules_1.ReglasPaciente.validarTextoRequerido(datos.nombre)) {
                throw new Error("El nombre no es válido para actualizar.");
            }
            paciente.nombre = datos.nombre;
        }
        if (datos.apellido !== undefined) {
            if (!patient_rules_1.ReglasPaciente.validarTextoRequerido(datos.apellido)) {
                throw new Error("El apellido no es válido para actualizar.");
            }
            paciente.apellido = datos.apellido;
        }
        if (datos.email !== undefined) {
            if (!patient_rules_1.ReglasPaciente.validarEmail(datos.email)) {
                throw new Error("El email no es válido para actualizar.");
            }
            paciente.email = datos.email;
        }
        // Campos opcionales (sin validación compleja por ahora)
        if (datos.telefono !== undefined)
            paciente.telefono = datos.telefono;
        if (datos.fechaNacimiento !== undefined)
            paciente.fechaNacimiento = datos.fechaNacimiento;
        if (datos.firmaDigital !== undefined)
            paciente.firmaDigital = datos.firmaDigital;
        if (datos.odontograma !== undefined)
            paciente.odontograma = datos.odontograma;
        if (datos.nombreApoderado !== undefined)
            paciente.nombreApoderado = datos.nombreApoderado;
        if (datos.direccion !== undefined)
            paciente.direccion = datos.direccion;
        return paciente;
    }
    /**
     * COMPORTAMIENTO: Desactiva un paciente (borrado lógico)
     */
    static desactivar(paciente) {
        paciente.estaActivo = false;
        return paciente;
    }
    /**
     * COMPORTAMIENTO: Activa un paciente
     */
    static activar(paciente) {
        paciente.estaActivo = true;
        return paciente;
    }
    /**
     * COMPORTAMIENTO: Añade una nueva observación
     */
    static agregarObservacion(paciente, observacion) {
        if (observacion && observacion.trim().length > 0) {
            paciente.observaciones.push(observacion);
        }
        return paciente;
    }
    /**
     * COMPORTAMIENTO: Calcula la edad del paciente
     */
    static calcularEdad(paciente) {
        if (!paciente.fechaNacimiento)
            return null;
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
exports.ComportamientoPaciente = ComportamientoPaciente;
