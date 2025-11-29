"use strict";
// --- 1. CONEXIONES (Importaciones) ---
// Esta "Página" debe pertenecer a una "Carpeta" (HistoriaClinica)
// import { HistoriaClinica } from './clinical-history.entity';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroTratamiento = void 0;
/**
 * @class RegistroTratamiento
 * @description Entidad "Pura" (Contenedor de Datos) para la "Página" de cada visita.
 * Guarda el diagnóstico y observaciones del Doctor para una cita específica.
 * Es "anémica" (pasiva). Su lógica de acciones está en 'treatment-record.behavior.ts'.
 */
class RegistroTratamiento {
    // --- 3. CONSTRUCTOR PRIVADO (La "Puerta Cerrada") ---
    constructor(id, idHistoriaClinica, idDoctor, diagnostico, procedimientoRealizado, observacionesDoctor, fechaRegistro, fechaActualizacion, idCita) {
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
    static crear(datos) {
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
        return new RegistroTratamiento(null, // id (es nuevo)
        datos.idHistoriaClinica, datos.idDoctor, datos.diagnostico, datos.procedimientoRealizado || null, datos.observacionesDoctor || null, ahora, // fechaRegistro
        ahora, // fechaActualizacion
        datos.idCita || null);
    }
    /**
     * Entrada #2: Para "re-construir" desde la Base de Datos.
     * Lo usará el Repositorio para cargar las "páginas" existentes.
     */
    static crearExistente(datos) {
        // Simplemente llama al constructor privado con los datos de la BD
        return new RegistroTratamiento(datos.id, datos.idHistoriaClinica, datos.idDoctor, datos.diagnostico, datos.procedimientoRealizado, datos.observacionesDoctor, datos.fechaRegistro, datos.fechaActualizacion, datos.idCita);
    }
}
exports.RegistroTratamiento = RegistroTratamiento;
