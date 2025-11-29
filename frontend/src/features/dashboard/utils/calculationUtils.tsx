import { TIME_PERIODS } from '../types';

/**
 * Obtener rango de fechas para un período
 * @param {string} period - Período seleccionado
 * @param {Object} customRange - Rango personalizado { startDate, endDate }
 * @returns {Object} { startDate, endDate }
 */
export const getDateRangeForPeriod = (period, customRange = {}) => {
    const today = new Date();
    let startDate, endDate;

    switch (period) {
        case TIME_PERIODS.TODAY:
            startDate = new Date(today);
            endDate = new Date(today);
            break;

        case TIME_PERIODS.YESTERDAY:
            startDate = new Date(today);
            startDate.setDate(startDate.getDate() - 1);
            endDate = new Date(startDate);
            break;

        case TIME_PERIODS.THIS_WEEK:
            startDate = new Date(today);
            startDate.setDate(today.getDate() - today.getDay());
            endDate = new Date(today);
            break;

        case TIME_PERIODS.LAST_WEEK:
            startDate = new Date(today);
            startDate.setDate(today.getDate() - today.getDay() - 7);
            endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 6);
            break;

        case TIME_PERIODS.THIS_MONTH:
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today);
            break;

        case TIME_PERIODS.LAST_MONTH:
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0);
            break;

        case TIME_PERIODS.THIS_QUARTER:
            const currentQuarter = Math.floor(today.getMonth() / 3);
            startDate = new Date(today.getFullYear(), currentQuarter * 3, 1);
            endDate = new Date(today);
            break;

        case TIME_PERIODS.LAST_QUARTER:
            const lastQuarter = Math.floor(today.getMonth() / 3) - 1;
            startDate = new Date(today.getFullYear(), lastQuarter * 3, 1);
            endDate = new Date(today.getFullYear(), lastQuarter * 3 + 3, 0);
            break;

        case TIME_PERIODS.THIS_YEAR:
            startDate = new Date(today.getFullYear(), 0, 1);
            endDate = new Date(today);
            break;

        case TIME_PERIODS.LAST_YEAR:
            startDate = new Date(today.getFullYear() - 1, 0, 1);
            endDate = new Date(today.getFullYear() - 1, 11, 31);
            break;

        case TIME_PERIODS.CUSTOM:
            startDate = customRange.startDate ? new Date(customRange.startDate) : new Date(today);
            endDate = customRange.endDate ? new Date(customRange.endDate) : new Date(today);
            break;

        default:
            startDate = new Date(today);
            endDate = new Date(today);
    }

    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
    };
};

/**
 * Calcular porcentaje de cambio
 * @param {number} current - Valor actual
 * @param {number} previous - Valor anterior
 * @returns {number} Porcentaje de cambio
 */
export const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
};

/**
 * Formatear número grande
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado (ej: 1.5K, 2.3M)
 */
export const formatLargeNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};

/**
 * Calcular tasa de crecimiento
 * @param {Array} data - Datos históricos
 * @returns {number} Tasa de crecimiento promedio
 */
export const calculateGrowthRate = (data) => {
    if (!data || data.length < 2) return 0;

    const changes = [];
    for (let i = 1; i < data.length; i++) {
        const change = calculatePercentageChange(data[i].value, data[i - 1].value);
        changes.push(change);
    }

    const average = changes.reduce((sum, val) => sum + val, 0) / changes.length;
    return Math.round(average * 100) / 100;
};

/**
 * Agrupar datos por período
 * @param {Array} data - Datos a agrupar
 * @param {string} groupBy - Tipo de agrupación
 * @returns {Array} Datos agrupados
 */
export const groupDataByPeriod = (data, groupBy) => {
    const grouped = {};

    data.forEach(item => {
        const date = new Date(item.date);
        let key;

        switch (groupBy) {
            case 'day':
                key = date.toISOString().split('T')[0];
                break;
            case 'week':
                const weekStart = new Date(date);
                weekStart.setDate(date.getDate() - date.getDay());
                key = weekStart.toISOString().split('T')[0];
                break;
            case 'month':
                key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                break;
            case 'quarter':
                const quarter = Math.floor(date.getMonth() / 3) + 1;
                key = `${date.getFullYear()}-Q${quarter}`;
                break;
            case 'year':
                key = date.getFullYear().toString();
                break;
            default:
                key = date.toISOString().split('T')[0];
        }

        if (!grouped[key]) {
            grouped[key] = { date: key, value: 0, count: 0 };
        }

        grouped[key].value += item.value || 0;
        grouped[key].count += 1;
    });

    return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date));
};

/**
 * Calcular promedio móvil
 * @param {Array} data - Datos
 * @param {number} window - Ventana de promedio
 * @returns {Array} Datos con promedio móvil
 */
export const calculateMovingAverage = (data, window = 7) => {
    return data.map((item, index) => {
        const start = Math.max(0, index - window + 1);
        const subset = data.slice(start, index + 1);
        const average = subset.reduce((sum, d) => sum + d.value, 0) / subset.length;

        return {
            ...item,
            movingAverage: Math.round(average * 100) / 100,
        };
    });
};

/**
 * Determinar tendencia
 * @param {Array} data - Datos históricos
 * @returns {string} 'up', 'down', o 'stable'
 */
export const determineTrend = (data) => {
    if (!data || data.length < 2) return 'stable';

    const recent = data.slice(-5); // Últimos 5 puntos
    const growthRate = calculateGrowthRate(recent);

    if (growthRate > 5) return 'up';
    if (growthRate < -5) return 'down';
    return 'stable';
};

export default {
    getDateRangeForPeriod,
    calculatePercentageChange,
    formatLargeNumber,
    calculateGrowthRate,
    groupDataByPeriod,
    calculateMovingAverage,
    determineTrend,
};
