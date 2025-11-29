/**
 * Estados posibles de un diente en el odontograma
 * Define los diferentes estados clínicos que puede tener un diente
 */
export enum ToothState {
  // Estado inicial
  HEALTHY = 'SANO',               // Diente sano sin problemas

  // Estados patológicos (problemas)
  CARIES = 'CARIES',              // Diente con caries
  CAVITY = 'CAVIDAD',             // Cavidad en el diente

  // Estados de tratamiento
  FILLING = 'OBTURACION',         // Diente con obturación (empaste)
  SEALANT = 'SELLANTE',           // Diente con sellante
  ROOT_CANAL = 'ENDODONCIA',      // Diente con endodoncia (tratamiento de conducto)
  CROWN = 'CORONA',               // Diente con corona
  BRIDGE = 'PUENTE',              // Diente que es parte de un puente
  IMPLANT = 'IMPLANTE',           // Implante dental

  // Ausencia
  EXTRACTED = 'EXTRACCION',       // Diente extraído
  MISSING = 'FALTANTE',           // Diente que falta naturalmente
  PLANNED_EXTRACTION = 'EXTRACCION_PLANEADA', // Diente marcado para extracción

  // Otros estados
  IN_TREATMENT = 'EN_TRATAMIENTO', // Diente en proceso de tratamiento
  NEEDS_ATTENTION = 'REQUIERE_ATENCION', // Diente que necesita atención inmediata
}
