import apiClient from './base';

/**
 * Servicio de Dashboard
 * Maneja todas las operaciones relacionadas con estadísticas, métricas y reportes
 */
export const dashboardService = {
    // ============ ESTADÍSTICAS GENERALES ============

    /**
     * Obtener resumen general del dashboard
     * @param {Object} filters - Filtros (startDate, endDate)
     * @returns {Promise} Resumen general
     */
    getOverview: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/stats?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard overview:', error);
            throw error;
        }
    },

    /**
     * Obtener estadísticas de citas
     * @param {Object} filters - Filtros de período
     * @returns {Promise} Estadísticas de citas
     */
    getAppointmentStats: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/appointments/stats?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching appointment stats:', error);
            throw error;
        }
    },

    /**
     * Obtener estadísticas de pacientes
     * @param {Object} filters - Filtros de período
     * @returns {Promise} Estadísticas de pacientes
     */
    getPatientStats: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/patients/stats?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching patient stats:', error);
            throw error;
        }
    },

    /**
     * Obtener estadísticas financieras
     * @param {Object} filters - Filtros de período
     * @returns {Promise} Estadísticas financieras
     */
    getFinancialStats: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/financial/stats?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching financial stats:', error);
            throw error;
        }
    },

    // ============ MÉTRICAS Y KPIs ============

    /**
     * Obtener KPIs principales
     * @param {Object} filters - Filtros de período
     * @returns {Promise} KPIs
     */
    getKPIs: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/kpis?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching KPIs:', error);
            throw error;
        }
    },

    /**
     * Obtener tasa de ocupación
     * @param {Object} filters - Filtros de período
     * @returns {Promise} Tasa de ocupación
     */
    getOccupancyRate: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/metrics/occupancy?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching occupancy rate:', error);
            throw error;
        }
    },

    /**
     * Obtener tasa de cancelación
     * @param {Object} filters - Filtros de período
     * @returns {Promise} Tasa de cancelación
     */
    getCancellationRate: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/metrics/cancellation?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cancellation rate:', error);
            throw error;
        }
    },

    /**
     * Obtener satisfacción del paciente
     * @param {Object} filters - Filtros de período
     * @returns {Promise} Satisfacción
     */
    getPatientSatisfaction: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/metrics/satisfaction?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching patient satisfaction:', error);
            throw error;
        }
    },

    // ============ DATOS PARA GRÁFICOS ============

    /**
     * Obtener datos para gráfico de ingresos
     * @param {Object} filters - Filtros (period, groupBy)
     * @returns {Promise} Datos del gráfico
     */
    getRevenueChart: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/charts/revenue?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching revenue chart:', error);
            throw error;
        }
    },

    /**
     * Obtener datos para gráfico de citas
     * @param {Object} filters - Filtros (period, groupBy)
     * @returns {Promise} Datos del gráfico
     */
    getAppointmentsChart: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/charts/appointments?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching appointments chart:', error);
            throw error;
        }
    },

    /**
     * Obtener datos para gráfico de pacientes nuevos
     * @param {Object} filters - Filtros (period, groupBy)
     * @returns {Promise} Datos del gráfico
     */
    getNewPatientsChart: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/charts/new-patients?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching new patients chart:', error);
            throw error;
        }
    },

    /**
     * Obtener distribución de tratamientos
     * @param {Object} filters - Filtros de período
     * @returns {Promise} Distribución
     */
    getTreatmentDistribution: async (filters = {}) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await apiClient.get(`/dashboard/charts/treatments?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching treatment distribution:', error);
            throw error;
        }
    },

    // ============ ACTIVIDAD RECIENTE ============

    /**
     * Obtener actividad reciente
     * @param {number} limit - Número de items
     * @returns {Promise} Actividad reciente
     */
    getRecentActivity: async (limit = 10) => {
        try {
            const response = await apiClient.get(`/dashboard/activity/recent?limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching recent activity:', error);
            throw error;
        }
    },

    /**
     * Obtener citas próximas
     * @param {number} limit - Número de citas
     * @returns {Promise} Citas próximas
     */
    getUpcomingAppointments: async (limit = 5) => {
        try {
            const response = await apiClient.get(`/dashboard/appointments/upcoming?limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching upcoming appointments:', error);
            throw error;
        }
    },

    /**
     * Obtener alertas y notificaciones
     * @returns {Promise} Alertas
     */
    getAlerts: async () => {
        try {
            const response = await apiClient.get('/dashboard/alerts');
            return response.data;
        } catch (error) {
            console.error('Error fetching alerts:', error);
            throw error;
        }
    },

    // ============ REPORTES ============

    /**
     * Generar reporte personalizado
     * @param {Object} reportConfig - Configuración del reporte
     * @returns {Promise} Datos del reporte
     */
    generateReport: async (reportConfig) => {
        try {
            const response = await apiClient.post('/dashboard/reports/generate', reportConfig);
            return response.data;
        } catch (error) {
            console.error('Error generating report:', error);
            throw error;
        }
    },

    /**
     * Exportar datos del dashboard
     * @param {Object} exportConfig - Configuración de exportación
     * @returns {Promise} Archivo exportado
     */
    exportData: async (exportConfig) => {
        try {
            const response = await apiClient.post('/dashboard/export', exportConfig, {
                responseType: 'blob',
            });
            return response.data;
        } catch (error) {
            console.error('Error exporting data:', error);
            throw error;
        }
    },
};

export default dashboardService;
