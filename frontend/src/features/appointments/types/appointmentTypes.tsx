/**
 * Estados de Citas
 */
export const APPOINTMENT_STATUS = {
    PENDING: 'pending',       // Solicitud pendiente de confirmación
    CONFIRMED: 'confirmed',   // Cita confirmada
    CANCELLED: 'cancelled',   // Cita cancelada
    COMPLETED: 'completed',   // Cita completada
    NO_SHOW: 'no_show',      // Paciente no se presentó
    IN_PROGRESS: 'in_progress', // Cita en curso
};

/**
 * Tipos de Citas
 */
export const APPOINTMENT_TYPES = {
    CHECKUP: 'checkup',           // Revisión general
    CLEANING: 'cleaning',         // Limpieza dental
    FILLING: 'filling',           // Empaste/Obturación
    EXTRACTION: 'extraction',     // Extracción
    ROOT_CANAL: 'root_canal',     // Endodoncia
    CROWN: 'crown',               // Corona
    ORTHODONTICS: 'orthodontics', // Ortodoncia
    WHITENING: 'whitening',       // Blanqueamiento
    IMPLANT: 'implant',           // Implante
    EMERGENCY: 'emergency',       // Emergencia
    CONSULTATION: 'consultation', // Consulta
    FOLLOW_UP: 'follow_up',       // Seguimiento
};

/**
 * Prioridades de Citas
 */
export const APPOINTMENT_PRIORITY = {
    LOW: 'low',       // Baja prioridad
    MEDIUM: 'medium', // Prioridad media
    HIGH: 'high',     // Alta prioridad
    URGENT: 'urgent', // Urgente
};

/**
 * Duración estimada por tipo de cita (en minutos)
 */
export const APPOINTMENT_DURATION = {
    [APPOINTMENT_TYPES.CHECKUP]: 30,
    [APPOINTMENT_TYPES.CLEANING]: 45,
    [APPOINTMENT_TYPES.FILLING]: 60,
    [APPOINTMENT_TYPES.EXTRACTION]: 45,
    [APPOINTMENT_TYPES.ROOT_CANAL]: 90,
    [APPOINTMENT_TYPES.CROWN]: 60,
    [APPOINTMENT_TYPES.ORTHODONTICS]: 45,
    [APPOINTMENT_TYPES.WHITENING]: 60,
    [APPOINTMENT_TYPES.IMPLANT]: 120,
    [APPOINTMENT_TYPES.EMERGENCY]: 30,
    [APPOINTMENT_TYPES.CONSULTATION]: 30,
    [APPOINTMENT_TYPES.FOLLOW_UP]: 30,
};

/**
 * Horarios de trabajo (formato 24h)
 */
export const WORKING_HOURS = {
    START: '08:00',
    END: '18:00',
    LUNCH_START: '13:00',
    LUNCH_END: '14:00',
};

/**
 * Días de la semana
 */
export const WEEKDAYS = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 0,
};

/**
 * Intervalo de tiempo entre citas (minutos)
 */
export const APPOINTMENT_INTERVAL = 15;

/**
 * Tiempo mínimo de anticipación para agendar (horas)
 */
export const MIN_ADVANCE_BOOKING_HOURS = 2;

/**
 * Tiempo máximo de anticipación para agendar (días)
 */
export const MAX_ADVANCE_BOOKING_DAYS = 90;

export default {
    APPOINTMENT_STATUS,
    APPOINTMENT_TYPES,
    APPOINTMENT_PRIORITY,
    APPOINTMENT_DURATION,
    WORKING_HOURS,
    WEEKDAYS,
    APPOINTMENT_INTERVAL,
    MIN_ADVANCE_BOOKING_HOURS,
    MAX_ADVANCE_BOOKING_DAYS,
};
