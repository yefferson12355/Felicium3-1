import { useState, useCallback } from 'react';
import { validateAppointmentForm } from '../utils';

/**
 * Hook para manejo de formularios de citas
 * Gestiona el estado del formulario, validaciones y submit
 */
export const useAppointmentForm = (initialData = {}, onSubmit) => {
    const [formData, setFormData] = useState({
        patientId: '',
        patientName: '',
        phone: '',
        email: '',
        dentistId: '',
        date: '',
        time: '',
        type: '',
        reason: '',
        priority: 'medium',
        ...initialData,
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    /**
     * Actualizar un campo del formulario
     */
    const updateField = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        // Limpiar error del campo al editar
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    }, [errors]);

    /**
     * Marcar campo como tocado
     */
    const touchField = useCallback((field) => {
        setTouched(prev => ({
            ...prev,
            [field]: true,
        }));
    }, []);

    /**
     * Validar formulario completo
     */
    const validate = useCallback(() => {
        const validation = validateAppointmentForm(formData);
        setErrors(validation.errors);
        return validation.valid;
    }, [formData]);

    /**
     * Manejar cambio de campo
     */
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        updateField(name, value);
    }, [updateField]);

    /**
     * Manejar blur de campo
     */
    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        touchField(name);
    }, [touchField]);

    /**
     * Resetear formulario
     */
    const reset = useCallback(() => {
        setFormData({
            patientId: '',
            patientName: '',
            phone: '',
            email: '',
            dentistId: '',
            date: '',
            time: '',
            type: '',
            reason: '',
            priority: 'medium',
            ...initialData,
        });
        setErrors({});
        setTouched({});
        setSubmitError(null);
        setSubmitSuccess(false);
    }, [initialData]);

    /**
     * Establecer datos del formulario
     */
    const setData = useCallback((data) => {
        setFormData(prev => ({
            ...prev,
            ...data,
        }));
    }, []);

    /**
     * Manejar submit del formulario
     */
    const handleSubmit = useCallback(async (e) => {
        if (e) e.preventDefault();

        // Marcar todos los campos como tocados
        const allFields = Object.keys(formData);
        const allTouched = allFields.reduce((acc, field) => {
            acc[field] = true;
            return acc;
        }, {});
        setTouched(allTouched);

        // Validar
        if (!validate()) {
            return;
        }

        // Submit
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            if (onSubmit) {
                await onSubmit(formData);
                setSubmitSuccess(true);
            }
        } catch (error) {
            setSubmitError(error.message || 'Error al enviar el formulario');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validate, onSubmit]);

    /**
     * Verificar si el formulario es válido
     */
    const isValid = useCallback(() => {
        const validation = validateAppointmentForm(formData);
        return validation.valid;
    }, [formData]);

    /**
     * Verificar si el formulario ha sido modificado
     */
    const isDirty = useCallback(() => {
        return JSON.stringify(formData) !== JSON.stringify(initialData);
    }, [formData, initialData]);

    return {
        // Estado del formulario
        formData,
        errors,
        touched,
        isSubmitting,
        submitError,
        submitSuccess,

        // Acciones
        updateField,
        touchField,
        handleChange,
        handleBlur,
        handleSubmit,
        validate,
        reset,
        setData,

        // Utilidades
        isValid: isValid(),
        isDirty: isDirty(),
    };
};

export default useAppointmentForm;
