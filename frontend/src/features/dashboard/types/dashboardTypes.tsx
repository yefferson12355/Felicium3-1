/**
 * Períodos de tiempo para filtros
 */
export const TIME_PERIODS = {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    THIS_WEEK: 'this_week',
    LAST_WEEK: 'last_week',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    THIS_QUARTER: 'this_quarter',
    LAST_QUARTER: 'last_quarter',
    THIS_YEAR: 'this_year',
    LAST_YEAR: 'last_year',
    CUSTOM: 'custom',
};

/**
 * Tipos de gráficos
 */
export const CHART_TYPES = {
    LINE: 'line',
    BAR: 'bar',
    PIE: 'pie',
    DOUGHNUT: 'doughnut',
    AREA: 'area',
    RADAR: 'radar',
};

/**
 * Agrupación de datos
 */
export const GROUP_BY = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
};

/**
 * Tipos de métricas
 */
export const METRIC_TYPES = {
    REVENUE: 'revenue',
    APPOINTMENTS: 'appointments',
    PATIENTS: 'patients',
    OCCUPANCY: 'occupancy',
    SATISFACTION: 'satisfaction',
    CANCELLATION: 'cancellation',
};

/**
 * Tipos de KPIs
 */
export const KPI_TYPES = {
    TOTAL_REVENUE: 'total_revenue',
    AVERAGE_REVENUE: 'average_revenue',
    TOTAL_APPOINTMENTS: 'total_appointments',
    COMPLETED_APPOINTMENTS: 'completed_appointments',
    NEW_PATIENTS: 'new_patients',
    ACTIVE_PATIENTS: 'active_patients',
    OCCUPANCY_RATE: 'occupancy_rate',
    CANCELLATION_RATE: 'cancellation_rate',
    NO_SHOW_RATE: 'no_show_rate',
    PATIENT_SATISFACTION: 'patient_satisfaction',
    AVERAGE_TREATMENT_VALUE: 'average_treatment_value',
    COLLECTION_RATE: 'collection_rate',
};

/**
 * Tipos de alertas
 */
export const ALERT_TYPES = {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    SUCCESS: 'success',
};

/**
 * Prioridades de alertas
 */
export const ALERT_PRIORITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
};

/**
 * Formatos de exportación
 */
export const EXPORT_FORMATS = {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
};

/**
 * Colores para gráficos
 */
export const CHART_COLORS = {
    PRIMARY: '#2196F3',
    SUCCESS: '#4CAF50',
    WARNING: '#FF9800',
    DANGER: '#F44336',
    INFO: '#00BCD4',
    PURPLE: '#9C27B0',
    PINK: '#E91E63',
    TEAL: '#009688',
    ORANGE: '#FF5722',
    INDIGO: '#3F51B5',
};

/**
 * Paleta de colores para gráficos
 */
export const CHART_PALETTE = [
    '#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0',
    '#00BCD4', '#E91E63', '#009688', '#FF5722', '#3F51B5',
];

/**
 * Configuración de dashboard
 */
export const DASHBOARD_CONFIG = {
    DEFAULT_PERIOD: TIME_PERIODS.THIS_MONTH,
    DEFAULT_GROUP_BY: GROUP_BY.DAY,
    REFRESH_INTERVAL: 300000, // 5 minutos
    MAX_CHART_POINTS: 30,
    DEFAULT_CHART_TYPE: CHART_TYPES.LINE,
};

/**
 * Umbrales para métricas
 */
export const METRIC_THRESHOLDS = {
    OCCUPANCY_RATE: {
        EXCELLENT: 85,
        GOOD: 70,
        FAIR: 50,
        POOR: 0,
    },
    CANCELLATION_RATE: {
        EXCELLENT: 5,
        GOOD: 10,
        FAIR: 15,
        POOR: 100,
    },
    PATIENT_SATISFACTION: {
        EXCELLENT: 90,
        GOOD: 75,
        FAIR: 60,
        POOR: 0,
    },
    COLLECTION_RATE: {
        EXCELLENT: 95,
        GOOD: 85,
        FAIR: 70,
        POOR: 0,
    },
};

export default {
    TIME_PERIODS,
    CHART_TYPES,
    GROUP_BY,
    METRIC_TYPES,
    KPI_TYPES,
    ALERT_TYPES,
    ALERT_PRIORITY,
    EXPORT_FORMATS,
    CHART_COLORS,
    CHART_PALETTE,
    DASHBOARD_CONFIG,
    METRIC_THRESHOLDS,
};
