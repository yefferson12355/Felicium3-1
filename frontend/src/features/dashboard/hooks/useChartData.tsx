import { useState, useCallback, useEffect } from 'react';
import { dashboardService } from '../services';
import { getDateRangeForPeriod } from '../utils';

/**
 * Hook para gestión de datos de gráficos
 */
export const useChartData = (chartType, period, groupBy = 'day') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchChartData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const dateRange = getDateRangeForPeriod(period);
            const filters = { ...dateRange, groupBy };

            let chartData;
            switch (chartType) {
                case 'revenue':
                    chartData = await dashboardService.getRevenueChart(filters);
                    break;
                case 'appointments':
                    chartData = await dashboardService.getAppointmentsChart(filters);
                    break;
                case 'patients':
                    chartData = await dashboardService.getNewPatientsChart(filters);
                    break;
                case 'treatments':
                    chartData = await dashboardService.getTreatmentDistribution(filters);
                    break;
                default:
                    chartData = null;
            }

            setData(chartData);
            return chartData;
        } catch (err) {
            setError(err.message || 'Error al cargar datos del gráfico');
            return null;
        } finally {
            setLoading(false);
        }
    }, [chartType, period, groupBy]);

    useEffect(() => {
        fetchChartData();
    }, [fetchChartData]);

    return {
        data,
        loading,
        error,
        refresh: fetchChartData,
    };
};

export default useChartData;
