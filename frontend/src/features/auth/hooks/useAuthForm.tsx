import { useState, useCallback } from 'react';

/**
 * Hook para manejo de formularios de autenticación
 * Gestiona el estado del formulario, validaciones y submit
 */
export const useAuthForm = (initialData = {}, validateFn, onSubmit) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        if (!validateFn) return { valid: true, errors: {} };

        const validation = validateFn(formData);
        setErrors(validation.errors || {});
        return validation;
    }, [formData, validateFn]);

    /**
     * Manejar cambio de campo
     */
    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        updateField(name, type === 'checkbox' ? checked : value);
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
            email: '',
            password: '',
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
        const validation = validate();
        if (!validation.valid) {
            return;
        }

        // Submit
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            if (onSubmit) {
                const result = await onSubmit(formData);
                if (result && result.success) {
                    setSubmitSuccess(true);
                } else if (result && result.error) {
                    setSubmitError(result.error);
                }
                return result;
            }
        } catch (error) {
            setSubmitError(error.message || 'Error al enviar el formulario');
            return { success: false, error: error.message };
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validate, onSubmit]);

    /**
     * Verificar si el formulario es válido
     */
    const isValid = useCallback(() => {
        const validation = validate();
        return validation.valid;
    }, [validate]);

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

export default useAuthForm;
