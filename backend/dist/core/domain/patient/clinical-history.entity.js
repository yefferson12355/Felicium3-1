"use strict";
// --- 1. CONEXIONES (Importaciones) ---
// No necesita importar reglas, pero sí es buena práctica
// saber que está conceptualmente ligada a un Paciente.
// import { Paciente } from './patient.entity';
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoriaClinica = void 0;
/**
 * @class HistoriaClinica
 * @description Entidad "Pura" (Contenedor de Datos) para la "Carpeta" del paciente.
 * Guarda los antecedentes y observaciones generales llenados por la recepcionista.
 * Es "anémica" (pasiva). Su lógica de acciones está en 'clinical-history.behavior.ts'.
 */
class HistoriaClinica {
    // --- 3. CONSTRUCTOR PRIVADO (La "Puerta Cerrada") ---
    constructor(id, idPaciente, antecedenteAlergias, antecedenteDiabetes, antecedenteHipertension, observacionesGenerales, fechaCreacion, fechaActualizacion) {
        this.id = id;
        this.idPaciente = idPaciente;
        this.antecedenteAlergias = antecedenteAlergias;
        this.antecedenteDiabetes = antecedenteDiabetes;
        this.antecedenteHipertension = antecedenteHipertension;
        this.observacionesGenerales = observacionesGenerales;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }
    // --- 4. FÁBRICAS (Las "Puertas de Entrada") ---
    /**
     * Entrada #1: Para crear una Historia Clínica NUEVA.
     */
    static crear(datos) {
        // --- Validación Simple (Regla interna) ---
        // (Como es tan simple, no necesitamos un archivo .rules.ts)
        if (!datos.idPaciente) {
            throw new Error("No se puede crear una Historia Clínica sin un idPaciente.");
        }
        const ahora = new Date();
        // Llamamos al constructor privado para "ensamblar"
        return new HistoriaClinica(null, // id (es nueva)
        datos.idPaciente, datos.antecedenteAlergias, datos.antecedenteDiabetes, datos.antecedenteHipertension, datos.observacionesGenerales || null, ahora, // fechaCreacion
        ahora // fechaActualizacion
        );
    }
    /**
     * Entrada #2: Para "re-construir" desde la Base de Datos.
     */
    static crearExistente(datos) {
        // Simplemente llama al constructor privado con los datos de la BD
        return new HistoriaClinica(datos.id, datos.idPaciente, datos.antecedenteAlergias, datos.antecedenteDiabetes, datos.antecedenteHipertension, datos.observacionesGenerales, datos.fechaCreacion, datos.fechaActualizacion);
    }
}
exports.HistoriaClinica = HistoriaClinica;
