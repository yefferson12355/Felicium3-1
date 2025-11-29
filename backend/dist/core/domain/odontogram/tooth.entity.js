"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooth = void 0;
const tooth_state_enum_1 = require("./tooth-state.enum");
const tooth_surface_enum_1 = require("./tooth-surface.enum");
/**
 * Entidad Tooth (Diente)
 * Representa un diente individual en el odontograma
 *
 * Sistema de numeración dental:
 * - 11-18: Dientes superiores derechos
 * - 21-28: Dientes superiores izquierdos
 * - 31-38: Dientes inferiores izquierdos
 * - 41-48: Dientes inferiores derechos
 *
 * En dientes temporales (niños):
 * - 51-55: Dientes superiores derechos
 * - 61-65: Dientes superiores izquierdos
 * - 71-75: Dientes inferiores izquierdos
 * - 81-85: Dientes inferiores derechos
 */
class Tooth {
    constructor(number, toothType, state = tooth_state_enum_1.ToothState.HEALTHY) {
        this.validateToothNumber(number);
        this.number = number;
        this.toothType = toothType;
        this.state = state;
        this.surfaceProblems = new Map();
        this.clinicalNotes = '';
        this.lastReview = new Date();
        // Inicializar todas las superficies sin problemas
        this.initializeSurfaces();
    }
    /**
     * Valida que el número de diente sea válido
     */
    validateToothNumber(number) {
        const validRanges = [
            { min: 11, max: 48 }, // Dientes permanentes
            { min: 51, max: 85 }, // Dientes temporales
        ];
        const isValid = validRanges.some(range => number >= range.min && number <= range.max);
        if (!isValid) {
            throw new Error(`Número de diente inválido: ${number}. Debe estar entre 11-48 (adultos) o 51-85 (niños)`);
        }
    }
    /**
     * Inicializa todas las superficies del diente
     * Al crear un diente nuevo, todas las superficies están sanas
     */
    initializeSurfaces() {
        Object.values(tooth_surface_enum_1.ToothSurface).forEach(surface => {
            this.surfaceProblems.set(surface, false);
        });
    }
    // ==================== GETTERS ====================
    getNumber() {
        return this.number;
    }
    getToothType() {
        return this.toothType;
    }
    getState() {
        return this.state;
    }
    getClinicalNotes() {
        return this.clinicalNotes;
    }
    getLastReview() {
        return this.lastReview;
    }
    /**
     * Obtiene todas las superficies con problemas
     */
    getSurfacesWithProblems() {
        return Array.from(this.surfaceProblems.entries())
            .filter(([_, hasProblem]) => hasProblem)
            .map(([surface, _]) => surface);
    }
    /**
     * Verifica si una superficie específica tiene problema
     */
    hasSurfaceProblem(surface) {
        return this.surfaceProblems.get(surface) || false;
    }
    // ==================== MÉTODOS DE NEGOCIO ====================
    /**
     * Cambia el estado del diente
     * @param newState Nuevo estado del diente
     * @param notes Notas adicionales sobre el cambio
     */
    changeState(newState, notes = '') {
        this.state = newState;
        if (notes) {
            this.clinicalNotes += `\n[${new Date().toISOString()}] ${notes}`;
        }
        this.lastReview = new Date();
    }
    /**
     * Marca una superficie como problemática
     * @param surface Superficie del diente
     * @param hasProblem true si tiene problema, false si está sano
     */
    markSurfaceProblem(surface, hasProblem) {
        this.surfaceProblems.set(surface, hasProblem);
    }
    /**
     * Marca múltiples superficies como problemáticas
     * @param surfaces Superficies a marcar
     */
    markMultipleSurfaceProblems(surfaces) {
        // Primero, limpiar todas las superficies
        this.surfaceProblems.forEach((_, key) => {
            this.surfaceProblems.set(key, false);
        });
        // Luego marcar las especificadas
        surfaces.forEach(surface => {
            this.surfaceProblems.set(surface, true);
        });
    }
    /**
     * Limpia todas las superficies (marca como sanas)
     */
    clearAllSurfaceProblems() {
        this.surfaceProblems.forEach((_, key) => {
            this.surfaceProblems.set(key, false);
        });
    }
    /**
     * Agrega notas clínicas sobre este diente
     */
    addClinicalNote(note) {
        const timestamp = new Date().toISOString();
        this.clinicalNotes += `\n[${timestamp}] ${note}`;
    }
    /**
     * Convierte el diente a objeto JSON para almacenamiento
     */
    toJSON() {
        return {
            number: this.number,
            toothType: this.toothType,
            state: this.state,
            surfaceProblems: Array.from(this.surfaceProblems.entries()).reduce((acc, [surface, hasProblem]) => {
                acc[surface] = hasProblem;
                return acc;
            }, {}),
            clinicalNotes: this.clinicalNotes,
            lastReview: this.lastReview.toISOString(),
        };
    }
    /**
     * Crea un Tooth desde un objeto JSON
     */
    static fromJSON(data) {
        const tooth = new Tooth(data.number, data.toothType, data.state);
        tooth.clinicalNotes = data.clinicalNotes || '';
        tooth.lastReview = new Date(data.lastReview);
        if (data.surfaceProblems) {
            Object.entries(data.surfaceProblems).forEach(([surface, hasProblem]) => {
                tooth.surfaceProblems.set(surface, hasProblem);
            });
        }
        return tooth;
    }
}
exports.Tooth = Tooth;
