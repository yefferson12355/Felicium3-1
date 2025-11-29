import { useState, useCallback, useEffect } from 'react';
import { billingService } from '../services';
import { applyFilters, sortByDate } from '../utils';

/**
 * Hook principal para gestión de facturación
 */
export const useBilling = (initialFilters = {}) => {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);

    const fetchInvoices = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await billingService.getAllInvoices();
            setInvoices(data);
            return data;
        } catch (err) {
            setError(err.message || 'Error al cargar facturas');
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const createInvoice = useCallback(async (invoiceData) => {
        setLoading(true);
        setError(null);
        try {
            const newInvoice = await billingService.createInvoice(invoiceData);
            setInvoices(prev => [...prev, newInvoice]);
            return { success: true, data: newInvoice };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const updateInvoice = useCallback(async (id, invoiceData) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await billingService.updateInvoice(id, invoiceData);
            setInvoices(prev => prev.map(inv => inv.id === id ? updated : inv));
            return { success: true, data: updated };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const markAsPaid = useCallback(async (id, paymentData) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await billingService.markInvoiceAsPaid(id, paymentData);
            setInvoices(prev => prev.map(inv => inv.id === id ? updated : inv));
            return { success: true, data: updated };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const createPayment = useCallback(async (paymentData) => {
        setLoading(true);
        setError(null);
        try {
            const payment = await billingService.createPayment(paymentData);
            return { success: true, data: payment };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const filtered = applyFilters(invoices, filters);
        const sorted = sortByDate(filtered, 'desc');
        setFilteredInvoices(sorted);
    }, [invoices, filters]);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    return {
        invoices: filteredInvoices,
        allInvoices: invoices,
        loading,
        error,
        filters,
        fetchInvoices,
        createInvoice,
        updateInvoice,
        markAsPaid,
        createPayment,
        setFilters,
    };
};

export default useBilling;
