import { APPOINTMENT_TYPES, MIN_ADVANCE_BOOKING_HOURS, MAX_ADVANCE_BOOKING_DAYS } from '../types';
import { isPastDate, isFutureDate, daysDifference, compareTime } from './dateUtils';

/**
 * Validar datos de una cita
 * @param {Object} appointmentData - Datos de la cita
 * @returns {Object} { valid: boolean, errors: Array }
 */
export const validateAppointment = (appointmentData) => {
    const errors = [];

    // Validar paciente
    if (!appointmentData.patientId && !appointmentData.patient) {
        errors.push('Debe seleccionar un paciente');
    }

    // Validar dentista
    if (!appointmentData.dentistId && !appointmentData.dentist) {
        errors.push('Debe seleccionar un dentista');
    }

    // Validar fecha
    if (!appointmentData.date) {
        errors.push('Debe seleccionar una fecha');
    } else if (isPastDate(appointmentData.date)) {
        errors.push('No se pueden agendar citas en fechas pasadas');
    }

    // Validar hora
    if (!appointmentData.time) {
        errors.push('Debe seleccionar una hora');
    }

    // Validar tipo de cita
    if (!appointmentData.type) {
        errors.push('Debe seleccionar el tipo de cita');
    } else if (!Object.values(APPOINTMENT_TYPES).includes(appointmentData.type)) {
        errors.push('Tipo de cita inválido');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Validar disponibilidad de horario
 * @param {string} date - Fecha de la cita
 * @param {string} time - Hora de la cita
 * @param {Array} existingAppointments - Citas existentes
 * @returns {Object} { available: boolean, reason: string }
 */
export const validateAvailability = (date, time, existingAppointments = []) => {
    // Verificar que la fecha no sea pasada
    if (isPastDate(date)) {
        return {
            available: false,
            reason: 'No se pueden agendar citas en fechas pasadas',
        };
    }

    // Verificar anticipación mínima
    const now = new Date();
    const appointmentDate = new Date(`${date}T${time}`);
    const hoursDiff = (appointmentDate - now) / (1000 * 60 * 60);

    if (hoursDiff < MIN_ADVANCE_BOOKING_HOURS) {
        return {
            available: false,
            reason: `Debe agendar con al menos ${MIN_ADVANCE_BOOKING_HOURS} horas de anticipación`,
        };
    }

    // Verificar anticipación máxima
    const daysDiff = daysDifference(now, appointmentDate);
    if (daysDiff > MAX_ADVANCE_BOOKING_DAYS) {
        return {
            available: false,
            reason: `No se pueden agendar citas con más de ${MAX_ADVANCE_BOOKING_DAYS} días de anticipación`,
        };
    }

    // Verificar conflictos con citas existentes
    const conflict = existingAppointments.find(apt =>
        apt.date === date && apt.time === time
    );

    if (conflict) {
        return {
            available: false,
            reason: 'Ya existe una cita en este horario',
        };
    }

    return {
        available: true,
        reason: 'Horario disponible',
    };
};

/**
 * Validar horario de trabajo
 * @param {string} time - Hora a validar
 * @param {Object} workingHours - Horario de trabajo { start, end, lunchStart, lunchEnd }
 * @returns {boolean} True si está dentro del horario
 */
export const isWithinWorkingHours = (time, workingHours) => {
    const { start, end, lunchStart, lunchEnd } = workingHours;

    // Verificar si está dentro del horario general
    if (compareTime(time, start) < 0 || compareTime(time, end) > 0) {
        return false;
    }

    // Verificar si está en horario de almuerzo
    if (lunchStart && lunchEnd) {
        if (compareTime(time, lunchStart) >= 0 && compareTime(time, lunchEnd) < 0) {
            return false;
        }
    }

    return true;
};

/**
 * Validar formulario de cita
 * @param {Object} formData - Datos del formulario
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateAppointmentForm = (formData) => {
    const errors = {};

    // Validar nombre del paciente
    if (!formData.patientName || formData.patientName.trim().length < 3) {
        errors.patientName = 'El nombre debe tener al menos 3 caracteres';
    }

    // Validar teléfono
    if (!formData.phone) {
        errors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        errors.phone = 'El teléfono debe tener 10 dígitos';
    }

    // Validar email (opcional pero debe ser válido si se proporciona)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Email inválido';
    }

    // Validar fecha
    if (!formData.date) {
        errors.date = 'La fecha es requerida';
    }

    // Validar hora
    if (!formData.time) {
        errors.time = 'La hora es requerida';
    }

    // Validar tipo de cita
    if (!formData.type) {
        errors.type = 'El tipo de cita es requerido';
    }

    // Validar motivo (opcional pero debe tener contenido si se proporciona)
    if (formData.reason && formData.reason.trim().length < 10) {
        errors.reason = 'El motivo debe tener al menos 10 caracteres';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validar reprogramación de cita
 * @param {Object} originalAppointment - Cita original
 * @param {Object} newData - Nuevos datos
 * @returns {Object} { valid: boolean, errors: Array }
 */
export const validateReschedule = (originalAppointment, newData) => {
    const errors = [];

    if (!newData.date) {
        errors.push('Debe seleccionar una nueva fecha');
    }

    if (!newData.time) {
        errors.push('Debe seleccionar una nueva hora');
    }

    // Verificar que sea diferente a la original
    if (newData.date === originalAppointment.date && newData.time === originalAppointment.time) {
        errors.push('Debe seleccionar una fecha u hora diferente');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Validar cancelación de cita
 * @param {Object} appointment - Cita a cancelar
 * @param {string} reason - Razón de cancelación
 * @returns {Object} { valid: boolean, errors: Array }
 */
export const validateCancellation = (appointment, reason) => {
    const errors = [];

    if (!reason || reason.trim().length < 10) {
        errors.push('Debe proporcionar una razón de cancelación (mínimo 10 caracteres)');
    }

    // Verificar que la cita no esté ya cancelada
    if (appointment.status === 'cancelled') {
        errors.push('Esta cita ya está cancelada');
    }

    // Verificar que la cita no esté completada
    if (appointment.status === 'completed') {
        errors.push('No se puede cancelar una cita completada');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

export default {
    validateAppointment,
    validateAvailability,
    isWithinWorkingHours,
    validateAppointmentForm,
    validateReschedule,
    validateCancellation,
};
