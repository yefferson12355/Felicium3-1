import { useState, useCallback, useEffect } from 'react';
import { dashboardService } from '../services';
import { getDateRangeForPeriod } from '../utils';
import { TIME_PERIODS } from '../types';

/**
 * Hook principal para gestión del dashboard
 */
export const useDashboard = (initialPeriod = TIME_PERIODS.THIS_MONTH) => {
    const [period, setPeriod] = useState(initialPeriod);
    const [customRange, setCustomRange] = useState({});
    const [overview, setOverview] = useState(null);
    const [kpis, setKpis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dateRange = getDateRangeForPeriod(period, customRange);

    const fetchOverview = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await dashboardService.getOverview(dateRange);
            setOverview(data);
            return data;
        } catch (err) {
            setError(err.message || 'Error al cargar resumen');
            return null;
        } finally {
            setLoading(false);
        }
    }, [dateRange]);

    const fetchKPIs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await dashboardService.getKPIs(dateRange);
            setKpis(data);
            return data;
        } catch (err) {
            setError(err.message || 'Error al cargar KPIs');
            return null;
        } finally {
            setLoading(false);
        }
    }, [dateRange]);

    const refresh = useCallback(() => {
        fetchOverview();
        fetchKPIs();
    }, [fetchOverview, fetchKPIs]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        period,
        setPeriod,
        customRange,
        setCustomRange,
        dateRange,
        overview,
        kpis,
        loading,
        error,
        refresh,
    };
};

export default useDashboard;
