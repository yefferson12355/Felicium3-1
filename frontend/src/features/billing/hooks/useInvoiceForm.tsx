import { useState, useCallback, useMemo } from 'react';
import { calculateInvoiceTotal } from '../utils';

/**
 * Hook para manejo de formularios de factura
 */
export const useInvoiceForm = (initialData = {}, onSubmit) => {
    const [formData, setFormData] = useState({
        patientId: '',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        items: [],
        discount: { type: 'percentage', value: 0 },
        taxRate: 16,
        notes: '',
        ...initialData,
    });

    const [errors, setErrors] = useState({});

    const totals = useMemo(() => {
        return calculateInvoiceTotal(formData.items, formData.discount, formData.taxRate);
    }, [formData.items, formData.discount, formData.taxRate]);

    const addItem = useCallback((item) => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { ...item, id: Date.now() }],
        }));
    }, []);

    const removeItem = useCallback((itemId) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== itemId),
        }));
    }, []);

    const updateItem = useCallback((itemId, updates) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === itemId ? { ...item, ...updates } : item
            ),
        }));
    }, []);

    const updateField = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        if (e) e.preventDefault();

        const invoiceData = {
            ...formData,
            ...totals,
        };

        if (onSubmit) {
            return await onSubmit(invoiceData);
        }
    }, [formData, totals, onSubmit]);

    const reset = useCallback(() => {
        setFormData({
            patientId: '',
            issueDate: new Date().toISOString().split('T')[0],
            dueDate: '',
            items: [],
            discount: { type: 'percentage', value: 0 },
            taxRate: 16,
            notes: '',
            ...initialData,
        });
        setErrors({});
    }, [initialData]);

    return {
        formData,
        errors,
        totals,
        addItem,
        removeItem,
        updateItem,
        updateField,
        handleSubmit,
        reset,
    };
};

export default useInvoiceForm;
