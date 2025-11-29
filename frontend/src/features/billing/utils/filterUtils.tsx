import { INVOICE_STATUS } from '../types';

/**
 * Filtrar facturas por estado
 * @param {Array} invoices - Lista de facturas
 * @param {string} status - Estado a filtrar
 * @returns {Array} Facturas filtradas
 */
export const filterByStatus = (invoices, status) => {
    if (!status || status === 'all') return invoices;
    return invoices.filter(inv => inv.status === status);
};

/**
 * Filtrar facturas por paciente
 * @param {Array} invoices - Lista de facturas
 * @param {string|number} patientId - ID del paciente
 * @returns {Array} Facturas filtradas
 */
export const filterByPatient = (invoices, patientId) => {
    if (!patientId) return invoices;
    return invoices.filter(inv => inv.patientId === patientId || inv.patient?.id === patientId);
};

/**
 * Filtrar facturas por rango de fechas
 * @param {Array} invoices - Lista de facturas
 * @param {string} startDate - Fecha inicial
 * @param {string} endDate - Fecha final
 * @returns {Array} Facturas filtradas
 */
export const filterByDateRange = (invoices, startDate, endDate) => {
    if (!startDate || !endDate) return invoices;
    return invoices.filter(inv => {
        return inv.issueDate >= startDate && inv.issueDate <= endDate;
    });
};

/**
 * Filtrar facturas vencidas
 * @param {Array} invoices - Lista de facturas
 * @returns {Array} Facturas vencidas
 */
export const filterOverdue = (invoices) => {
    return invoices.filter(inv => inv.status === INVOICE_STATUS.OVERDUE);
};

/**
 * Filtrar facturas pendientes de pago
 * @param {Array} invoices - Lista de facturas
 * @returns {Array} Facturas pendientes
 */
export const filterPending = (invoices) => {
    return invoices.filter(inv =>
        inv.status === INVOICE_STATUS.PENDING ||
        inv.status === INVOICE_STATUS.PARTIAL
    );
};

/**
 * Buscar facturas por texto
 * @param {Array} invoices - Lista de facturas
 * @param {string} searchText - Texto a buscar
 * @returns {Array} Facturas que coinciden
 */
export const searchInvoices = (invoices, searchText) => {
    if (!searchText || searchText.trim() === '') return invoices;

    const search = searchText.toLowerCase();
    return invoices.filter(inv => {
        const patientName = inv.patient?.name || inv.patientName || '';
        const invoiceNumber = inv.invoiceNumber || '';

        return (
            patientName.toLowerCase().includes(search) ||
            invoiceNumber.toLowerCase().includes(search)
        );
    });
};

/**
 * Ordenar facturas por fecha
 * @param {Array} invoices - Lista de facturas
 * @param {string} order - 'asc' o 'desc'
 * @returns {Array} Facturas ordenadas
 */
export const sortByDate = (invoices, order = 'desc') => {
    return [...invoices].sort((a, b) => {
        const dateA = new Date(a.issueDate);
        const dateB = new Date(b.issueDate);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
};

/**
 * Ordenar facturas por monto
 * @param {Array} invoices - Lista de facturas
 * @param {string} order - 'asc' o 'desc'
 * @returns {Array} Facturas ordenadas
 */
export const sortByAmount = (invoices, order = 'desc') => {
    return [...invoices].sort((a, b) => {
        return order === 'asc' ? a.total - b.total : b.total - a.total;
    });
};

/**
 * Agrupar facturas por estado
 * @param {Array} invoices - Lista de facturas
 * @returns {Object} Facturas agrupadas por estado
 */
export const groupByStatus = (invoices) => {
    return invoices.reduce((groups, inv) => {
        const status = inv.status || 'unknown';
        if (!groups[status]) {
            groups[status] = [];
        }
        groups[status].push(inv);
        return groups;
    }, {});
};

/**
 * Agrupar facturas por mes
 * @param {Array} invoices - Lista de facturas
 * @returns {Object} Facturas agrupadas por mes
 */
export const groupByMonth = (invoices) => {
    return invoices.reduce((groups, inv) => {
        const date = new Date(inv.issueDate);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!groups[month]) {
            groups[month] = [];
        }
        groups[month].push(inv);
        return groups;
    }, {});
};

/**
 * Calcular estadísticas de facturas
 * @param {Array} invoices - Lista de facturas
 * @returns {Object} Estadísticas
 */
export const calculateInvoiceStats = (invoices) => {
    const stats = {
        total: invoices.length,
        totalAmount: 0,
        paid: 0,
        pending: 0,
        overdue: 0,
        cancelled: 0,
    };

    invoices.forEach(inv => {
        stats.totalAmount += inv.total || 0;

        switch (inv.status) {
            case INVOICE_STATUS.PAID:
                stats.paid++;
                break;
            case INVOICE_STATUS.PENDING:
            case INVOICE_STATUS.PARTIAL:
                stats.pending++;
                break;
            case INVOICE_STATUS.OVERDUE:
                stats.overdue++;
                break;
            case INVOICE_STATUS.CANCELLED:
                stats.cancelled++;
                break;
            default:
                break;
        }
    });

    return stats;
};

/**
 * Aplicar múltiples filtros
 * @param {Array} invoices - Lista de facturas
 * @param {Object} filters - Filtros a aplicar
 * @returns {Array} Facturas filtradas
 */
export const applyFilters = (invoices, filters = {}) => {
    let filtered = [...invoices];

    if (filters.status) {
        filtered = filterByStatus(filtered, filters.status);
    }

    if (filters.patientId) {
        filtered = filterByPatient(filtered, filters.patientId);
    }

    if (filters.startDate && filters.endDate) {
        filtered = filterByDateRange(filtered, filters.startDate, filters.endDate);
    }

    if (filters.search) {
        filtered = searchInvoices(filtered, filters.search);
    }

    if (filters.onlyOverdue) {
        filtered = filterOverdue(filtered);
    }

    if (filters.onlyPending) {
        filtered = filterPending(filtered);
    }

    return filtered;
};

export default {
    filterByStatus,
    filterByPatient,
    filterByDateRange,
    filterOverdue,
    filterPending,
    searchInvoices,
    sortByDate,
    sortByAmount,
    groupByStatus,
    groupByMonth,
    calculateInvoiceStats,
    applyFilters,
};
