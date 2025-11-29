import { useState, useEffect, useCallback } from 'react';
import { appointmentService } from '../../../core/services/api/appointmentService';
import { applyFilters, sortByDateTime } from '../utils';

/**
 * Hook principal para gestión de citas
 * Maneja el estado, carga y operaciones CRUD de citas
 * 
 * ✅ ACTUALIZADO: Ahora conecta con API real del backend
 */
export const useAppointments = (initialFilters = {}) => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);

    /**
     * Cargar todas las citas del backend
     */
    const fetchAppointments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('📅 useAppointments: Fetching appointments from backend...');
            const response = await appointmentService.getAll();
            
            // Soportar tanto array directo como data.appointments
            const data = Array.isArray(response.data) ? response.data : response.data?.appointments || [];
            console.log('✅ useAppointments: Appointments loaded:', data.length, 'items');
            
            setAppointments(data);
            return data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Error al cargar las citas';
            setError(errorMsg);
            console.error('❌ Error fetching appointments:', err);
            return [];
        } finally {
            setLoading(false);
        }
    }, [filters]);

    /**
     * Cargar citas por fecha
     */
    const fetchByDate = useCallback(async (date) => {
        setLoading(true);
        setError(null);
        try {
            const data = await appointmentService.getByDate(date);
            setAppointments(data);
            return data;
        } catch (err) {
            setError(err.message || 'Error al cargar las citas');
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Cargar citas de hoy
     */
    const fetchToday = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await appointmentService.getToday();
            setAppointments(data);
            return data;
        } catch (err) {
            setError(err.message || 'Error al cargar las citas de hoy');
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Cargar citas pendientes
     */
    const fetchPending = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await appointmentService.getPending();
            setAppointments(data);
            return data;
        } catch (err) {
            setError(err.message || 'Error al cargar las citas pendientes');
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Crear nueva cita
     */
    const createAppointment = useCallback(async (appointmentData) => {
        setLoading(true);
        setError(null);
        try {
            const newAppointment = await appointmentService.create(appointmentData);
            setAppointments(prev => [...prev, newAppointment]);
            return { success: true, data: newAppointment };
        } catch (err) {
            setError(err.message || 'Error al crear la cita');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Actualizar cita existente
     */
    const updateAppointment = useCallback(async (id, appointmentData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedAppointment = await appointmentService.update(id, appointmentData);
            setAppointments(prev =>
                prev.map(apt => apt.id === id ? updatedAppointment : apt)
            );
            return { success: true, data: updatedAppointment };
        } catch (err) {
            setError(err.message || 'Error al actualizar la cita');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Eliminar cita
     */
    const deleteAppointment = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await appointmentService.delete(id);
            setAppointments(prev => prev.filter(apt => apt.id !== id));
            return { success: true };
        } catch (err) {
            setError(err.message || 'Error al eliminar la cita');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Confirmar cita
     */
    const confirmAppointment = useCallback(async (id, confirmData = {}) => {
        setLoading(true);
        setError(null);
        try {
            const confirmedAppointment = await appointmentService.confirm(id, confirmData);
            setAppointments(prev =>
                prev.map(apt => apt.id === id ? confirmedAppointment : apt)
            );
            return { success: true, data: confirmedAppointment };
        } catch (err) {
            setError(err.message || 'Error al confirmar la cita');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Cancelar cita
     */
    const cancelAppointment = useCallback(async (id, cancelData = {}) => {
        setLoading(true);
        setError(null);
        try {
            const cancelledAppointment = await appointmentService.cancel(id, cancelData);
            setAppointments(prev =>
                prev.map(apt => apt.id === id ? cancelledAppointment : apt)
            );
            return { success: true, data: cancelledAppointment };
        } catch (err) {
            setError(err.message || 'Error al cancelar la cita');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Completar cita
     */
    const completeAppointment = useCallback(async (id, completionData = {}) => {
        setLoading(true);
        setError(null);
        try {
            const completedAppointment = await appointmentService.complete(id, completionData);
            setAppointments(prev =>
                prev.map(apt => apt.id === id ? completedAppointment : apt)
            );
            return { success: true, data: completedAppointment };
        } catch (err) {
            setError(err.message || 'Error al completar la cita');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Reprogramar cita
     */
    const rescheduleAppointment = useCallback(async (id, rescheduleData) => {
        setLoading(true);
        setError(null);
        try {
            const rescheduledAppointment = await appointmentService.reschedule(id, rescheduleData);
            setAppointments(prev =>
                prev.map(apt => apt.id === id ? rescheduledAppointment : apt)
            );
            return { success: true, data: rescheduledAppointment };
        } catch (err) {
            setError(err.message || 'Error al reprogramar la cita');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Verificar disponibilidad
     */
    const checkAvailability = useCallback(async (availabilityData) => {
        setLoading(true);
        setError(null);
        try {
            const result = await appointmentService.checkAvailability(availabilityData);
            return { success: true, data: result };
        } catch (err) {
            setError(err.message || 'Error al verificar disponibilidad');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Refrescar citas
     */
    const refresh = useCallback(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    // Aplicar filtros cuando cambien
    useEffect(() => {
        const filtered = applyFilters(appointments, filters);
        const sorted = sortByDateTime(filtered, 'asc');
        setFilteredAppointments(sorted);
    }, [appointments, filters]);

    // Cargar citas al montar el componente
    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    return {
        // Estado
        appointments: filteredAppointments,
        allAppointments: appointments,
        loading,
        error,
        filters,

        // Acciones de carga
        fetchAppointments,
        fetchByDate,
        fetchToday,
        fetchPending,
        refresh,

        // Operaciones CRUD
        createAppointment,
        updateAppointment,
        deleteAppointment,

        // Operaciones de estado
        confirmAppointment,
        cancelAppointment,
        completeAppointment,
        rescheduleAppointment,

        // Utilidades
        checkAvailability,
        setFilters,
    };
};

export default useAppointments;
