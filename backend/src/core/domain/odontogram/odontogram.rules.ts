import { ToothState } from './tooth-state.enum';

/**
 * Reglas de negocio del Odontograma
 * Define qué transiciones de estado son válidas y qué está permitido
 */
export class OdontogramRules {
  /**
   * Define las transiciones válidas entre estados de dientes
   * Algunos cambios de estado NO tienen sentido clínicamente
   * 
   * Por ejemplo: Un diente no puede pasar de SANO a OBTURACIÓN sin antes tener CARIES
   */
  private static readonly VALID_STATE_TRANSITIONS: Map<ToothState, ToothState[]> = new Map([
    // Desde HEALTHY (SANO)
    [ToothState.HEALTHY, [
      ToothState.CARIES,              // Puede desarrollar caries
      ToothState.SEALANT,             // Se puede aplicar sellante preventivo
      ToothState.EXTRACTED,           // Puede extraerse
      ToothState.IN_TREATMENT,        // Puede necesitar tratamiento
    ]],

    // Desde CARIES
    [ToothState.CARIES, [
      ToothState.FILLING,             // Se puede obturar (empastar)
      ToothState.ROOT_CANAL,          // Puede necesitar endodoncia
      ToothState.EXTRACTED,           // Puede extraerse
      ToothState.IN_TREATMENT,        // Está siendo tratado
      ToothState.CAVITY,              // Puede haber cavidad
    ]],

    // Desde FILLING (OBTURACIÓN)
    [ToothState.FILLING, [
      ToothState.CARIES,              // La obturación puede fallar y volver caries
      ToothState.ROOT_CANAL,          // Puede necesitar endodoncia después
      ToothState.EXTRACTED,           // Puede extraerse
      ToothState.CROWN,               // Puede colocarse corona
    ]],

    // Desde ROOT_CANAL (ENDODONCIA)
    [ToothState.ROOT_CANAL, [
      ToothState.CROWN,               // Después de endodoncia usualmente se coloca corona
      ToothState.FILLING,             // O puede ir con obturación
      ToothState.EXTRACTED,           // Puede extraerse
    ]],

    // Desde CROWN
    [ToothState.CROWN, [
      ToothState.EXTRACTED,           // Puede extraerse (con corona)
      ToothState.ROOT_CANAL,          // Puede necesitar endodoncia
    ]],

    // Desde SEALANT (SELLANTE)
    [ToothState.SEALANT, [
      ToothState.HEALTHY,             // Si se mantiene bien
      ToothState.CARIES,              // Puede fallar y desarrollar caries
      ToothState.EXTRACTED,           // Puede extraerse
    ]],

    // Desde EXTRACTED
    [ToothState.EXTRACTED, [
      ToothState.IMPLANT,             // Puede colocarse implante
      ToothState.MISSING,             // Puede quedar como faltante
    ]],

    // Desde IN_TREATMENT
    [ToothState.IN_TREATMENT, [
      ToothState.HEALTHY,             // Si se recupera
      ToothState.FILLING,             // Se puede obturar
      ToothState.ROOT_CANAL,          // Puede necesitar endodoncia
      ToothState.CROWN,               // Puede necesitar corona
      ToothState.EXTRACTED,           // Puede extraerse
    ]],
  ]);

  /**
   * Valida si una transición de estado es permitida
   * @returns true si la transición es válida
   */
  static isValidStateTransition(fromState: ToothState, toState: ToothState): boolean {
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
  static getValidTransitionsFrom(state: ToothState): ToothState[] {
    return this.VALID_STATE_TRANSITIONS.get(state) || [];
  }

  /**
   * Valida si un diente necesita atención urgente
   */
  static needsUrgentAttention(state: ToothState): boolean {
    const urgentStates = [
      ToothState.CARIES,
      ToothState.IN_TREATMENT,
      ToothState.NEEDS_ATTENTION,
      ToothState.PLANNED_EXTRACTION,
    ];

    return urgentStates.includes(state);
  }

  /**
   * Valida si un diente está "sano" o funcional
   */
  static isHealthy(state: ToothState): boolean {
    const healthyStates = [
      ToothState.HEALTHY,
      ToothState.FILLING,
      ToothState.CROWN,
      ToothState.ROOT_CANAL,
      ToothState.SEALANT,
      ToothState.IMPLANT,
      ToothState.BRIDGE,
    ];

    return healthyStates.includes(state);
  }

  /**
   * Valida si un diente está ausente
   */
  static isAbsent(state: ToothState): boolean {
    return state === ToothState.EXTRACTED || state === ToothState.MISSING;
  }

  /**
   * Retorna una descripción legible del estado
   */
  static getStateDescription(state: ToothState): string {
    const descriptions: Record<ToothState, string> = {
      [ToothState.HEALTHY]: '✅ Diente sano sin problemas',
      [ToothState.CARIES]: '⚠️ Diente con caries',
      [ToothState.CAVITY]: '⚠️ Cavidad en el diente',
      [ToothState.FILLING]: '🦷 Diente con obturación (empaste)',
      [ToothState.SEALANT]: '🔒 Diente con sellante',
      [ToothState.ROOT_CANAL]: '💊 Endodoncia realizada',
      [ToothState.CROWN]: '👑 Corona colocada',
      [ToothState.BRIDGE]: '🌉 Diente como parte de puente',
      [ToothState.IMPLANT]: '🔩 Implante dental',
      [ToothState.EXTRACTED]: '❌ Diente extraído',
      [ToothState.MISSING]: '❌ Diente faltante',
      [ToothState.PLANNED_EXTRACTION]: '📅 Extracción planeada',
      [ToothState.IN_TREATMENT]: '🔄 En proceso de tratamiento',
      [ToothState.NEEDS_ATTENTION]: '🚨 Requiere atención urgente',
    };

    return descriptions[state] || 'Estado desconocido';
  }
}
