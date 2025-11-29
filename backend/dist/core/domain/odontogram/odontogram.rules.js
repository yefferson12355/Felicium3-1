"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdontogramRules = void 0;
const tooth_state_enum_1 = require("./tooth-state.enum");
/**
 * Reglas de negocio del Odontograma
 * Define qué transiciones de estado son válidas y qué está permitido
 */
class OdontogramRules {
    /**
     * Valida si una transición de estado es permitida
     * @returns true si la transición es válida
     */
    static isValidStateTransition(fromState, toState) {
        // Un diente puede mantener su estado
        if (fromState === toState) {
            return true;
        }
        const validTransitions = this.VALID_STATE_TRANSITIONS.get(fromState);
        if (!validTransitions) {
            return false;
        }
        return validTransitions.includes(toState);
    }
    /**
     * Obtiene las transiciones válidas desde un estado
     */
    static getValidTransitionsFrom(state) {
        return this.VALID_STATE_TRANSITIONS.get(state) || [];
    }
    /**
     * Valida si un diente necesita atención urgente
     */
    static needsUrgentAttention(state) {
        const urgentStates = [
            tooth_state_enum_1.ToothState.CARIES,
            tooth_state_enum_1.ToothState.IN_TREATMENT,
            tooth_state_enum_1.ToothState.NEEDS_ATTENTION,
            tooth_state_enum_1.ToothState.PLANNED_EXTRACTION,
        ];
        return urgentStates.includes(state);
    }
    /**
     * Valida si un diente está "sano" o funcional
     */
    static isHealthy(state) {
        const healthyStates = [
            tooth_state_enum_1.ToothState.HEALTHY,
            tooth_state_enum_1.ToothState.FILLING,
            tooth_state_enum_1.ToothState.CROWN,
            tooth_state_enum_1.ToothState.ROOT_CANAL,
            tooth_state_enum_1.ToothState.SEALANT,
            tooth_state_enum_1.ToothState.IMPLANT,
            tooth_state_enum_1.ToothState.BRIDGE,
        ];
        return healthyStates.includes(state);
    }
    /**
     * Valida si un diente está ausente
     */
    static isAbsent(state) {
        return state === tooth_state_enum_1.ToothState.EXTRACTED || state === tooth_state_enum_1.ToothState.MISSING;
    }
    /**
     * Retorna una descripción legible del estado
     */
    static getStateDescription(state) {
        const descriptions = {
            [tooth_state_enum_1.ToothState.HEALTHY]: '✅ Diente sano sin problemas',
            [tooth_state_enum_1.ToothState.CARIES]: '⚠️ Diente con caries',
            [tooth_state_enum_1.ToothState.CAVITY]: '⚠️ Cavidad en el diente',
            [tooth_state_enum_1.ToothState.FILLING]: '🦷 Diente con obturación (empaste)',
            [tooth_state_enum_1.ToothState.SEALANT]: '🔒 Diente con sellante',
            [tooth_state_enum_1.ToothState.ROOT_CANAL]: '💊 Endodoncia realizada',
            [tooth_state_enum_1.ToothState.CROWN]: '👑 Corona colocada',
            [tooth_state_enum_1.ToothState.BRIDGE]: '🌉 Diente como parte de puente',
            [tooth_state_enum_1.ToothState.IMPLANT]: '🔩 Implante dental',
            [tooth_state_enum_1.ToothState.EXTRACTED]: '❌ Diente extraído',
            [tooth_state_enum_1.ToothState.MISSING]: '❌ Diente faltante',
            [tooth_state_enum_1.ToothState.PLANNED_EXTRACTION]: '📅 Extracción planeada',
            [tooth_state_enum_1.ToothState.IN_TREATMENT]: '🔄 En proceso de tratamiento',
            [tooth_state_enum_1.ToothState.NEEDS_ATTENTION]: '🚨 Requiere atención urgente',
        };
        return descriptions[state] || 'Estado desconocido';
    }
}
exports.OdontogramRules = OdontogramRules;
/**
 * Define las transiciones válidas entre estados de dientes
 * Algunos cambios de estado NO tienen sentido clínicamente
 *
 * Por ejemplo: Un diente no puede pasar de SANO a OBTURACIÓN sin antes tener CARIES
 */
OdontogramRules.VALID_STATE_TRANSITIONS = new Map([
    // Desde HEALTHY (SANO)
    [tooth_state_enum_1.ToothState.HEALTHY, [
            tooth_state_enum_1.ToothState.CARIES, // Puede desarrollar caries
            tooth_state_enum_1.ToothState.SEALANT, // Se puede aplicar sellante preventivo
            tooth_state_enum_1.ToothState.EXTRACTED, // Puede extraerse
            tooth_state_enum_1.ToothState.IN_TREATMENT, // Puede necesitar tratamiento
        ]],
    // Desde CARIES
    [tooth_state_enum_1.ToothState.CARIES, [
            tooth_state_enum_1.ToothState.FILLING, // Se puede obturar (empastar)
            tooth_state_enum_1.ToothState.ROOT_CANAL, // Puede necesitar endodoncia
            tooth_state_enum_1.ToothState.EXTRACTED, // Puede extraerse
            tooth_state_enum_1.ToothState.IN_TREATMENT, // Está siendo tratado
            tooth_state_enum_1.ToothState.CAVITY, // Puede haber cavidad
        ]],
    // Desde FILLING (OBTURACIÓN)
    [tooth_state_enum_1.ToothState.FILLING, [
            tooth_state_enum_1.ToothState.CARIES, // La obturación puede fallar y volver caries
            tooth_state_enum_1.ToothState.ROOT_CANAL, // Puede necesitar endodoncia después
            tooth_state_enum_1.ToothState.EXTRACTED, // Puede extraerse
            tooth_state_enum_1.ToothState.CROWN, // Puede colocarse corona
        ]],
    // Desde ROOT_CANAL (ENDODONCIA)
    [tooth_state_enum_1.ToothState.ROOT_CANAL, [
            tooth_state_enum_1.ToothState.CROWN, // Después de endodoncia usualmente se coloca corona
            tooth_state_enum_1.ToothState.FILLING, // O puede ir con obturación
            tooth_state_enum_1.ToothState.EXTRACTED, // Puede extraerse
        ]],
    // Desde CROWN
    [tooth_state_enum_1.ToothState.CROWN, [
            tooth_state_enum_1.ToothState.EXTRACTED, // Puede extraerse (con corona)
            tooth_state_enum_1.ToothState.ROOT_CANAL, // Puede necesitar endodoncia
        ]],
    // Desde SEALANT (SELLANTE)
    [tooth_state_enum_1.ToothState.SEALANT, [
            tooth_state_enum_1.ToothState.HEALTHY, // Si se mantiene bien
            tooth_state_enum_1.ToothState.CARIES, // Puede fallar y desarrollar caries
            tooth_state_enum_1.ToothState.EXTRACTED, // Puede extraerse
        ]],
    // Desde EXTRACTED
    [tooth_state_enum_1.ToothState.EXTRACTED, [
            tooth_state_enum_1.ToothState.IMPLANT, // Puede colocarse implante
            tooth_state_enum_1.ToothState.MISSING, // Puede quedar como faltante
        ]],
    // Desde IN_TREATMENT
    [tooth_state_enum_1.ToothState.IN_TREATMENT, [
            tooth_state_enum_1.ToothState.HEALTHY, // Si se recupera
            tooth_state_enum_1.ToothState.FILLING, // Se puede obturar
            tooth_state_enum_1.ToothState.ROOT_CANAL, // Puede necesitar endodoncia
            tooth_state_enum_1.ToothState.CROWN, // Puede necesitar corona
            tooth_state_enum_1.ToothState.EXTRACTED, // Puede extraerse
        ]],
]);
