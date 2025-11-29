import { APPOINTMENT_STATUS } from './appointmentTypes';

/**
 * Configuración de estados de citas con metadata
 * Incluye colores, etiquetas y descripciones para cada estado
 */
export const APPOINTMENT_STATUS_CONFIG = {
    [APPOINTMENT_STATUS.PENDING]: {
        label: 'Pendiente',
        color: '#FFA500',      // Naranja
        bgColor: '#FFF3E0',    // Naranja claro
        icon: '⏳',
        description: 'Solicitud pendiente de confirmación',
        canEdit: true,
        canCancel: true,
        canConfirm: true,
    },
    [APPOINTMENT_STATUS.CONFIRMED]: {
        label: 'Confirmada',
        color: '#4CAF50',      // Verde
        bgColor: '#E8F5E9',    // Verde claro
        icon: '✓',
        description: 'Cita confirmada',
        canEdit: true,
        canCancel: true,
        canComplete: true,
    },
    [APPOINTMENT_STATUS.CANCELLED]: {
        label: 'Cancelada',
        color: '#F44336',      // Rojo
        bgColor: '#FFEBEE',    // Rojo claro
        icon: '✗',
        description: 'Cita cancelada',
        canEdit: false,
        canCancel: false,
        canConfirm: false,
    },
    [APPOINTMENT_STATUS.COMPLETED]: {
        label: 'Completada',
        color: '#2196F3',      // Azul
        bgColor: '#E3F2FD',    // Azul claro
        icon: '✔',
        description: 'Cita completada exitosamente',
        canEdit: false,
        canCancel: false,
        canConfirm: false,
    },
    [APPOINTMENT_STATUS.NO_SHOW]: {
        label: 'No se presentó',
        color: '#9E9E9E',      // Gris
        bgColor: '#F5F5F5',    // Gris claro
        icon: '⊘',
        description: 'El paciente no se presentó',
        canEdit: false,
        canCancel: false,
        canConfirm: false,
    },
    [APPOINTMENT_STATUS.IN_PROGRESS]: {
        label: 'En curso',
        color: '#FF9800',      // Ámbar
        bgColor: '#FFF8E1',    // Ámbar claro
        icon: '▶',
        description: 'Cita en progreso',
        canEdit: false,
        canCancel: false,
        canComplete: true,
    },
};

/**
 * Obtener configuración de un estado
 * @param {string} status - Estado de la cita
 * @returns {Object} Configuración del estado
 */
export const getStatusConfig = (status) => {
    return APPOINTMENT_STATUS_CONFIG[status] || APPOINTMENT_STATUS_CONFIG[APPOINTMENT_STATUS.PENDING];
};

/**
 * Obtener label de un estado
 * @param {string} status - Estado de la cita
 * @returns {string} Label del estado
 */
export const getStatusLabel = (status) => {
    return getStatusConfig(status).label;
};

/**
 * Obtener color de un estado
 * @param {string} status - Estado de la cita
 * @returns {string} Color del estado
 */
export const getStatusColor = (status) => {
    return getStatusConfig(status).color;
};

/**
 * Verificar si una cita puede ser editada
 * @param {string} status - Estado de la cita
 * @returns {boolean} True si puede ser editada
 */
export const canEditAppointment = (status) => {
    return getStatusConfig(status).canEdit;
};

/**
 * Verificar si una cita puede ser cancelada
 * @param {string} status - Estado de la cita
 * @returns {boolean} True si puede ser cancelada
 */
export const canCancelAppointment = (status) => {
    return getStatusConfig(status).canCancel;
};

/**
 * Verificar si una cita puede ser confirmada
 * @param {string} status - Estado de la cita
 * @returns {boolean} True si puede ser confirmada
 */
export const canConfirmAppointment = (status) => {
    return getStatusConfig(status).canConfirm;
};

/**
 * Verificar si una cita puede ser completada
 * @param {string} status - Estado de la cita
 * @returns {boolean} True si puede ser completada
 */
export const canCompleteAppointment = (status) => {
    return getStatusConfig(status).canComplete;
};

export default {
    APPOINTMENT_STATUS_CONFIG,
    getStatusConfig,
    getStatusLabel,
    getStatusColor,
    canEditAppointment,
    canCancelAppointment,
    canConfirmAppointment,
    canCompleteAppointment,
};
