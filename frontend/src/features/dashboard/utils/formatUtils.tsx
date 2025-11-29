import { METRIC_THRESHOLDS } from '../types';

/**
 * Obtener nivel de métrica basado en umbrales
 * @param {string} metricType - Tipo de métrica
 * @param {number} value - Valor de la métrica
 * @returns {string} 'excellent', 'good', 'fair', o 'poor'
 */
export const getMetricLevel = (metricType, value) => {
    const thresholds = METRIC_THRESHOLDS[metricType.toUpperCase()];
    if (!thresholds) return 'fair';

    if (value >= thresholds.EXCELLENT) return 'excellent';
    if (value >= thresholds.GOOD) return 'good';
    if (value >= thresholds.FAIR) return 'fair';
    return 'poor';
};

/**
 * Obtener color para nivel de métrica
 * @param {string} level - Nivel de métrica
 * @returns {string} Color hex
 */
export const getMetricColor = (level) => {
    const colors = {
        excellent: '#4CAF50',
        good: '#2196F3',
        fair: '#FF9800',
        poor: '#F44336',
    };
    return colors[level] || colors.fair;
};

/**
 * Formatear datos para gráfico de líneas
 * @param {Array} data - Datos crudos
 * @param {string} labelKey - Clave para labels
 * @param {string} valueKey - Clave para valores
 * @returns {Object} Datos formateados para Chart.js
 */
export const formatLineChartData = (data, labelKey = 'date', valueKey = 'value') => {
    return {
        labels: data.map(item => item[labelKey]),
        datasets: [{
            label: 'Valor',
            data: data.map(item => item[valueKey]),
            borderColor: '#2196F3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            tension: 0.4,
        }],
    };
};

/**
 * Formatear datos para gráfico de barras
 * @param {Array} data - Datos crudos
 * @param {string} labelKey - Clave para labels
 * @param {string} valueKey - Clave para valores
 * @returns {Object} Datos formateados
 */
export const formatBarChartData = (data, labelKey = 'category', valueKey = 'value') => {
    return {
        labels: data.map(item => item[labelKey]),
        datasets: [{
            label: 'Valor',
            data: data.map(item => item[valueKey]),
            backgroundColor: '#2196F3',
        }],
    };
};

/**
 * Formatear datos para gráfico circular
 * @param {Array} data - Datos crudos
 * @param {string} labelKey - Clave para labels
 * @param {string} valueKey - Clave para valores
 * @param {Array} colors - Colores personalizados
 * @returns {Object} Datos formateados
 */
export const formatPieChartData = (data, labelKey = 'category', valueKey = 'value', colors = null) => {
    const defaultColors = [
        '#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0',
        '#00BCD4', '#E91E63', '#009688', '#FF5722', '#3F51B5',
    ];

    return {
        labels: data.map(item => item[labelKey]),
        datasets: [{
            data: data.map(item => item[valueKey]),
            backgroundColor: colors || defaultColors.slice(0, data.length),
        }],
    };
};

export default {
    getMetricLevel,
    getMetricColor,
    formatLineChartData,
    formatBarChartData,
    formatPieChartData,
};
