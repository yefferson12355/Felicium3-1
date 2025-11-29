import { Odontogram } from './odontogram.entity';
import { Tooth } from './tooth.entity';
import { ToothState } from './tooth-state.enum';
import { ToothSurface } from './tooth-surface.enum';
import { OdontogramRules } from './odontogram.rules';

/**
 * Comportamientos del Odontograma
 * Agrupa métodos complejos que operan sobre el odontograma
 * Mantiene la lógica de negocio separada de la entidad
 */
export class OdontogramBehavior {
  /**
   * Realiza un cambio de estado validando reglas
   * @throws Error si la transición no es válida
   */
  static changeToothStateWithValidation(
    odontogram: Odontogram,
    toothNumber: number,
    newState: ToothState,
    notes: string = ''
  ): void {
    const tooth = odontogram.getToothByNumber(toothNumber);

    if (!tooth) {
      throw new Error(`Diente ${toothNumber} no encontrado`);
    }

    const currentState = tooth.getState();

    // Validar que la transición es permitida
    if (!OdontogramRules.isValidStateTransition(currentState, newState)) {
      throw new Error(
        `Transición no permitida: ${currentState} → ${newState}. ` +
        `Transiciones válidas: ${OdontogramRules.getValidTransitionsFrom(currentState).join(', ')}`
      );
    }

    // Realizar el cambio
    odontogram.updateToothState(toothNumber, newState, notes);
  }

  /**
   * Trata un diente (cambio de CARIES a OBTURACIÓN)
   * Simula un tratamiento dental completo
   */
  static treatToothCaries(
    odontogram: Odontogram,
    toothNumber: number,
    surfaces: ToothSurface[] = [],
    treatmentType: 'FILLING' | 'ROOT_CANAL' | 'CROWN' = 'FILLING'
  ): void {
    const tooth = odontogram.getToothByNumber(toothNumber);

    if (!tooth) {
      throw new Error(`Diente ${toothNumber} no encontrado`);
    }

    if (tooth.getState() !== ToothState.CARIES) {
      throw new Error(`Diente ${toothNumber} no tiene caries. Estado actual: ${tooth.getState()}`);
    }

    // Cambiar estado según tipo de tratamiento
    const newState = treatmentType === 'FILLING'
      ? ToothState.FILLING
      : treatmentType === 'ROOT_CANAL'
        ? ToothState.ROOT_CANAL
        : ToothState.CROWN;

    odontogram.updateToothState(
      toothNumber,
      newState,
      `Tratamiento aplicado: ${treatmentType}. Superficies tratadas: ${surfaces.join(', ')}`
    );

    // Limpiar las superficies problemáticas
    if (surfaces.length > 0) {
      tooth.markMultipleSurfaceProblems([]);
    }
  }

  /**
   * Marca un diente para extracción
   */
  static scheduleExtraction(
    odontogram: Odontogram,
    toothNumber: number,
    reason: string = ''
  ): void {
    const tooth = odontogram.getToothByNumber(toothNumber);

    if (!tooth) {
      throw new Error(`Diente ${toothNumber} no encontrado`);
    }

    odontogram.updateToothState(
      toothNumber,
      ToothState.PLANNED_EXTRACTION,
      `Extracción programada. Motivo: ${reason || 'No especificado'}`
    );
  }

  /**
   * Realiza la extracción de un diente (cambio de PLANNED_EXTRACTION a EXTRACTED)
   */
  static performExtraction(
    odontogram: Odontogram,
    toothNumber: number,
    date: Date = new Date()
  ): void {
    const tooth = odontogram.getToothByNumber(toothNumber);

    if (!tooth) {
      throw new Error(`Diente ${toothNumber} no encontrado`);
    }

    const currentState = tooth.getState();

    if (currentState !== ToothState.PLANNED_EXTRACTION && currentState !== ToothState.CARIES) {
      throw new Error(
        `No se puede extraer un diente en estado: ${currentState}. ` +
        `Debe estar programado para extracción o tener caries`
      );
    }

    odontogram.updateToothState(
      toothNumber,
      ToothState.EXTRACTED,
      `Extracción realizada el ${date.toLocaleDateString()}`
    );
  }

  /**
   * Coloca un implante (cambio de EXTRACTED a IMPLANT)
   */
  static placeImplant(
    odontogram: Odontogram,
    toothNumber: number,
    implantType: string = 'Standard'
  ): void {
    const tooth = odontogram.getToothByNumber(toothNumber);

    if (!tooth) {
      throw new Error(`Diente ${toothNumber} no encontrado`);
    }

    if (tooth.getState() !== ToothState.EXTRACTED && tooth.getState() !== ToothState.MISSING) {
      throw new Error(
        `Solo se pueden colocar implantes en espacios vacíos. ` +
        `Estado actual: ${tooth.getState()}`
      );
    }

    odontogram.updateToothState(
      toothNumber,
      ToothState.IMPLANT,
      `Implante colocado. Tipo: ${implantType}`
    );
  }

  /**
   * Aplica un sellante (preventivo)
   */
  static applySealant(
    odontogram: Odontogram,
    toothNumber: number
  ): void {
    const tooth = odontogram.getToothByNumber(toothNumber);

    if (!tooth) {
      throw new Error(`Diente ${toothNumber} no encontrado`);
    }

    if (tooth.getState() !== ToothState.HEALTHY) {
      throw new Error(
        `Solo se pueden aplicar sellantes a dientes sanos. ` +
        `Estado actual: ${tooth.getState()}`
      );
    }

    odontogram.updateToothState(
      toothNumber,
      ToothState.SEALANT,
      'Sellante preventivo aplicado'
    );
  }

  /**
   * Obtiene un reporte de dientes que necesitan tratamiento urgente
   */
  static getUrgentTreatmentReport(odontogram: Odontogram): {
    total: number;
    byType: Record<string, number>;
    teeth: Array<{ number: number; state: string; notes: string }>;
  } {
    const urgentTeeth = odontogram.getAllTeeth().filter(tooth =>
      OdontogramRules.needsUrgentAttention(tooth.getState())
    );

    const report = {
      total: urgentTeeth.length,
      byType: {} as Record<string, number>,
      teeth: [] as Array<{ number: number; state: string; notes: string }>,
    };

    urgentTeeth.forEach(tooth => {
      const state = tooth.getState();
      report.byType[state] = (report.byType[state] || 0) + 1;

      report.teeth.push({
        number: tooth.getNumber(),
        state: state,
        notes: tooth.getClinicalNotes().substring(0, 100), // Primeras 100 caracteres
      });
    });

    return report;
  }

  /**
   * Obtiene un reporte de salud bucal general
   */
  static getHealthReport(odontogram: Odontogram): {
    totalTeeth: number;
    healthyTeeth: number;
    affectedTeeth: number;
    missingTeeth: number;
    healthPercentage: number;
    recommendations: string[];
  } {
    const allTeeth = odontogram.getAllTeeth();
    const totalTeeth = allTeeth.length;

    const healthyTeeth = allTeeth.filter(t => OdontogramRules.isHealthy(t.getState())).length;
    const missingTeeth = allTeeth.filter(t => OdontogramRules.isAbsent(t.getState())).length;
    const affectedTeeth = totalTeeth - healthyTeeth - missingTeeth;

    const healthPercentage = totalTeeth > 0 ? Math.round((healthyTeeth / totalTeeth) * 100) : 0;

    const recommendations: string[] = [];

    if (healthPercentage < 50) {
      recommendations.push('🚨 Salud bucal comprometida. Se requiere intervención urgente.');
    }

    if (affectedTeeth > 5) {
      recommendations.push('⚠️ Más de 5 dientes afectados. Consulte con el dentista.');
    }

    if (missingTeeth > 5) {
      recommendations.push('💡 Considere opciones de reemplazo (implantes, puentes).');
    }

    if (healthPercentage >= 80) {
      recommendations.push('✅ Buena salud bucal. Mantenga la higiene.');
    }

    return {
      totalTeeth,
      healthyTeeth,
      affectedTeeth,
      missingTeeth,
      healthPercentage,
      recommendations,
    };
  }

  /**
   * Detecta cambios significativos entre dos odontogramas
   */
  static detectChanges(
    previousOdontogram: Odontogram,
    currentOdontogram: Odontogram
  ): Array<{
    toothNumber: number;
    previousState: string;
    currentState: string;
    timestamp: string;
  }> {
    const changes = [];

    const allTeeth = currentOdontogram.getAllTeeth();

    for (const tooth of allTeeth) {
      const toothNumber = tooth.getNumber();
      const previousTooth = previousOdontogram.getToothByNumber(toothNumber);

      if (previousTooth && previousTooth.getState() !== tooth.getState()) {
        changes.push({
          toothNumber,
          previousState: previousTooth.getState(),
          currentState: tooth.getState(),
          timestamp: new Date().toISOString(),
        });
      }
    }

    return changes;
  }
}
