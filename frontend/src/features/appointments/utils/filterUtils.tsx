import { APPOINTMENT_STATUS } from '../types';
import { isToday, isPastDate, isFutureDate } from './dateUtils';

/**
 * Filtrar citas por estado
 * @param {Array} appointments - Lista de citas
 * @param {string} status - Estado a filtrar
 * @returns {Array} Citas filtradas
 */
export const filterByStatus = (appointments, status) => {
    if (!status || status === 'all') return appointments;
    return appointments.filter(apt => apt.status === status);
};

/**
 * Filtrar citas por fecha
 * @param {Array} appointments - Lista de citas
 * @param {string} date - Fecha a filtrar (YYYY-MM-DD)
 * @returns {Array} Citas filtradas
 */
export const filterByDate = (appointments, date) => {
    if (!date) return appointments;
    return appointments.filter(apt => apt.date === date);
};

/**
 * Filtrar citas por rango de fechas
 * @param {Array} appointments - Lista de citas
 * @param {string} startDate - Fecha inicial
 * @param {string} endDate - Fecha final
 * @returns {Array} Citas filtradas
 */
export const filterByDateRange = (appointments, startDate, endDate) => {
    if (!startDate || !endDate) return appointments;
    return appointments.filter(apt => {
        return apt.date >= startDate && apt.date <= endDate;
    });
};

/**
 * Filtrar citas por paciente
 * @param {Array} appointments - Lista de citas
 * @param {string|number} patientId - ID del paciente
 * @returns {Array} Citas filtradas
 */
export const filterByPatient = (appointments, patientId) => {
    if (!patientId) return appointments;
    return appointments.filter(apt => apt.patientId === patientId || apt.patient?.id === patientId);
};

/**
 * Filtrar citas por dentista
 * @param {Array} appointments - Lista de citas
 * @param {string|number} dentistId - ID del dentista
 * @returns {Array} Citas filtradas
 */
export const filterByDentist = (appointments, dentistId) => {
    if (!dentistId) return appointments;
    return appointments.filter(apt => apt.dentistId === dentistId || apt.dentist?.id === dentistId);
};

/**
 * Filtrar citas por tipo
 * @param {Array} appointments - Lista de citas
 * @param {string} type - Tipo de cita
 * @returns {Array} Citas filtradas
 */
export const filterByType = (appointments, type) => {
    if (!type || type === 'all') return appointments;
    return appointments.filter(apt => apt.type === type);
};

/**
 * Filtrar citas de hoy
 * @param {Array} appointments - Lista de citas
 * @returns {Array} Citas de hoy
 */
export const filterTodayAppointments = (appointments) => {
    return appointments.filter(apt => isToday(apt.date));
};

/**
 * Filtrar citas pasadas
 * @param {Array} appointments - Lista de citas
 * @returns {Array} Citas pasadas
 */
export const filterPastAppointments = (appointments) => {
    return appointments.filter(apt => isPastDate(apt.date));
};

/**
 * Filtrar citas futuras
 * @param {Array} appointments - Lista de citas
 * @returns {Array} Citas futuras
 */
export const filterFutureAppointments = (appointments) => {
    return appointments.filter(apt => isFutureDate(apt.date));
};

/**
 * Filtrar citas pendientes
 * @param {Array} appointments - Lista de citas
 * @returns {Array} Citas pendientes
 */
export const filterPendingAppointments = (appointments) => {
    return appointments.filter(apt => apt.status === APPOINTMENT_STATUS.PENDING);
};

/**
 * Buscar citas por texto
 * @param {Array} appointments - Lista de citas
 * @param {string} searchText - Texto a buscar
 * @returns {Array} Citas que coinciden
 */
export const searchAppointments = (appointments, searchText) => {
    if (!searchText || searchText.trim() === '') return appointments;

    const search = searchText.toLowerCase();
    return appointments.filter(apt => {
        const patientName = apt.patient?.name || apt.patientName || '';
        const dentistName = apt.dentist?.name || apt.dentistName || '';
        const type = apt.type || '';
        const status = apt.status || '';

        return (
            patientName.toLowerCase().includes(search) ||
            dentistName.toLowerCase().includes(search) ||
            type.toLowerCase().includes(search) ||
            status.toLowerCase().includes(search)
        );
    });
};

/**
 * Ordenar citas por fecha y hora
 * @param {Array} appointments - Lista de citas
 * @param {string} order - 'asc' o 'desc'
 * @returns {Array} Citas ordenadas
 */
export const sortByDateTime = (appointments, order = 'asc') => {
    return [...appointments].sort((a, b) => {
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return order === 'asc' ? dateTimeA - dateTimeB : dateTimeB - dateTimeA;
    });
};

/**
 * Ordenar citas por estado
 * @param {Array} appointments - Lista de citas
 * @returns {Array} Citas ordenadas (pending, confirmed, in_progress, completed, cancelled)
 */
export const sortByStatus = (appointments) => {
    const statusOrder = {
        [APPOINTMENT_STATUS.IN_PROGRESS]: 1,
        [APPOINTMENT_STATUS.PENDING]: 2,
        [APPOINTMENT_STATUS.CONFIRMED]: 3,
        [APPOINTMENT_STATUS.COMPLETED]: 4,
        [APPOINTMENT_STATUS.CANCELLED]: 5,
        [APPOINTMENT_STATUS.NO_SHOW]: 6,
    };

    return [...appointments].sort((a, b) => {
        return (statusOrder[a.status] || 999) - (statusOrder[b.status] || 999);
    });
};

/**
 * Agrupar citas por fecha
 * @param {Array} appointments - Lista de citas
 * @returns {Object} Citas agrupadas por fecha
 */
export const groupByDate = (appointments) => {
    return appointments.reduce((groups, apt) => {
        const date = apt.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(apt);
        return groups;
    }, {});
};

/**
 * Agrupar citas por dentista
 * @param {Array} appointments - Lista de citas
 * @returns {Object} Citas agrupadas por dentista
 */
export const groupByDentist = (appointments) => {
    return appointments.reduce((groups, apt) => {
        const dentistId = apt.dentistId || apt.dentist?.id || 'unknown';
        if (!groups[dentistId]) {
            groups[dentistId] = [];
        }
        groups[dentistId].push(apt);
        return groups;
    }, {});
};

/**
 * Agrupar citas por estado
 * @param {Array} appointments - Lista de citas
 * @returns {Object} Citas agrupadas por estado
 */
export const groupByStatus = (appointments) => {
    return appointments.reduce((groups, apt) => {
        const status = apt.status || 'unknown';
        if (!groups[status]) {
            groups[status] = [];
        }
        groups[status].push(apt);
        return groups;
    }, {});
};

/**
 * Aplicar múltiples filtros
 * @param {Array} appointments - Lista de citas
 * @param {Object} filters - Objeto con filtros { status, date, patientId, dentistId, type, search }
 * @returns {Array} Citas filtradas
 */
export const applyFilters = (appointments, filters = {}) => {
    let filtered = [...appointments];

    if (filters.status) {
        filtered = filterByStatus(filtered, filters.status);
    }

    if (filters.date) {
        filtered = filterByDate(filtered, filters.date);
    }

    if (filters.startDate && filters.endDate) {
        filtered = filterByDateRange(filtered, filters.startDate, filters.endDate);
    }

    if (filters.patientId) {
        filtered = filterByPatient(filtered, filters.patientId);
    }

    if (filters.dentistId) {
        filtered = filterByDentist(filtered, filters.dentistId);
    }

    if (filters.type) {
        filtered = filterByType(filtered, filters.type);
    }

    if (filters.search) {
        filtered = searchAppointments(filtered, filters.search);
    }

    return filtered;
};

export default {
    filterByStatus,
    filterByDate,
    filterByDateRange,
    filterByPatient,
    filterByDentist,
    filterByType,
    filterTodayAppointments,
    filterPastAppointments,
    filterFutureAppointments,
    filterPendingAppointments,
    searchAppointments,
    sortByDateTime,
    sortByStatus,
    groupByDate,
    groupByDentist,
    groupByStatus,
    applyFilters,
};
