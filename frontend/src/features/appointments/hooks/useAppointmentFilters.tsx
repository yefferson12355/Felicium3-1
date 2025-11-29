import { useState, useCallback, useMemo } from 'react';
import { applyFilters, sortByDateTime, sortByStatus } from '../utils';

/**
 * Hook para manejo de filtros y búsqueda de citas
 */
export const useAppointmentFilters = (appointments = []) => {
    const [filters, setFilters] = useState({
        status: '',
        date: '',
        startDate: '',
        endDate: '',
        patientId: '',
        dentistId: '',
        type: '',
        search: '',
    });

    const [sortBy, setSortBy] = useState('datetime'); // 'datetime', 'status'
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'

    /**
     * Actualizar un filtro específico
     */
    const updateFilter = useCallback((filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value,
        }));
    }, []);

    /**
     * Actualizar múltiples filtros
     */
    const updateFilters = useCallback((newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters,
        }));
    }, []);

    /**
     * Limpiar todos los filtros
     */
    const clearFilters = useCallback(() => {
        setFilters({
            status: '',
            date: '',
            startDate: '',
            endDate: '',
            patientId: '',
            dentistId: '',
            type: '',
            search: '',
        });
    }, []);

    /**
     * Limpiar un filtro específico
     */
    const clearFilter = useCallback((filterName) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: '',
        }));
    }, []);

    /**
     * Establecer ordenamiento
     */
    const setSort = useCallback((field, order = 'asc') => {
        setSortBy(field);
        setSortOrder(order);
    }, []);

    /**
     * Alternar orden de clasificación
     */
    const toggleSortOrder = useCallback(() => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    }, []);

    /**
     * Aplicar filtros a las citas
     */
    const filteredAppointments = useMemo(() => {
        let result = applyFilters(appointments, filters);

        // Aplicar ordenamiento
        if (sortBy === 'datetime') {
            result = sortByDateTime(result, sortOrder);
        } else if (sortBy === 'status') {
            result = sortByStatus(result);
            if (sortOrder === 'desc') {
                result = result.reverse();
            }
        }

        return result;
    }, [appointments, filters, sortBy, sortOrder]);

    /**
     * Verificar si hay filtros activos
     */
    const hasActiveFilters = useMemo(() => {
        return Object.values(filters).some(value => value !== '');
    }, [filters]);

    /**
     * Contar citas filtradas
     */
    const count = useMemo(() => {
        return filteredAppointments.length;
    }, [filteredAppointments]);

    /**
     * Obtener estadísticas de filtros
     */
    const stats = useMemo(() => {
        return {
            total: appointments.length,
            filtered: filteredAppointments.length,
            hidden: appointments.length - filteredAppointments.length,
        };
    }, [appointments, filteredAppointments]);

    return {
        // Estado
        filters,
        sortBy,
        sortOrder,
        filteredAppointments,
        hasActiveFilters,
        count,
        stats,

        // Acciones de filtros
        updateFilter,
        updateFilters,
        clearFilters,
        clearFilter,

        // Acciones de ordenamiento
        setSort,
        toggleSortOrder,
    };
};

export default useAppointmentFilters;
