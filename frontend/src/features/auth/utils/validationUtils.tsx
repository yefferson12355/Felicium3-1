import { PASSWORD_REQUIREMENTS, AUTH_ERRORS } from '../types';

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateEmail = (email) => {
    if (!email) {
        return { valid: false, error: 'El email es requerido' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, error: 'Email inválido' };
    }

    return { valid: true, error: null };
};

/**
 * Validar contraseña según requisitos
 * @param {string} password - Contraseña a validar
 * @returns {Object} { valid: boolean, errors: Array }
 */
export const validatePassword = (password) => {
    const errors = [];

    if (!password) {
        return { valid: false, errors: ['La contraseña es requerida'] };
    }

    if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
        errors.push(`La contraseña debe tener al menos ${PASSWORD_REQUIREMENTS.MIN_LENGTH} caracteres`);
    }

    if (password.length > PASSWORD_REQUIREMENTS.MAX_LENGTH) {
        errors.push(`La contraseña no puede exceder ${PASSWORD_REQUIREMENTS.MAX_LENGTH} caracteres`);
    }

    if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una letra mayúscula');
    }

    if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una letra minúscula');
    }

    if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBER && !/\d/.test(password)) {
        errors.push('La contraseña debe contener al menos un número');
    }

    if (PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL_CHAR) {
        const specialChars = PASSWORD_REQUIREMENTS.SPECIAL_CHARS;
        const hasSpecialChar = specialChars.split('').some(char => password.includes(char));
        if (!hasSpecialChar) {
            errors.push(`La contraseña debe contener al menos un carácter especial (${specialChars})`);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Validar que las contraseñas coincidan
 * @param {string} password - Contraseña
 * @param {string} confirmPassword - Confirmación de contraseña
 * @returns {Object} { valid: boolean, error: string }
 */
export const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return { valid: false, error: 'Las contraseñas no coinciden' };
    }
    return { valid: true, error: null };
};

/**
 * Validar formulario de login
 * @param {Object} formData - { email, password }
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateLoginForm = (formData) => {
    const errors = {};

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
        errors.email = emailValidation.error;
    }

    if (!formData.password) {
        errors.password = 'La contraseña es requerida';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validar formulario de registro
 * @param {Object} formData - Datos del formulario
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateRegisterForm = (formData) => {
    const errors = {};

    // Validar nombre
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
        errors.email = emailValidation.error;
    }

    // Validar contraseña
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
        errors.password = passwordValidation.errors[0]; // Primer error
    }

    // Validar confirmación de contraseña
    if (formData.confirmPassword) {
        const matchValidation = validatePasswordMatch(formData.password, formData.confirmPassword);
        if (!matchValidation.valid) {
            errors.confirmPassword = matchValidation.error;
        }
    } else {
        errors.confirmPassword = 'Debes confirmar la contraseña';
    }

    // Validar teléfono (opcional pero debe ser válido si se proporciona)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        errors.phone = 'El teléfono debe tener 10 dígitos';
    }

    // Validar términos y condiciones
    if (!formData.acceptTerms) {
        errors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validar formulario de cambio de contraseña
 * @param {Object} formData - { currentPassword, newPassword, confirmPassword }
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateChangePasswordForm = (formData) => {
    const errors = {};

    if (!formData.currentPassword) {
        errors.currentPassword = 'La contraseña actual es requerida';
    }

    const passwordValidation = validatePassword(formData.newPassword);
    if (!passwordValidation.valid) {
        errors.newPassword = passwordValidation.errors[0];
    }

    const matchValidation = validatePasswordMatch(formData.newPassword, formData.confirmPassword);
    if (!matchValidation.valid) {
        errors.confirmPassword = matchValidation.error;
    }

    // Verificar que la nueva contraseña sea diferente a la actual
    if (formData.currentPassword === formData.newPassword) {
        errors.newPassword = 'La nueva contraseña debe ser diferente a la actual';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validar formulario de recuperación de contraseña
 * @param {Object} formData - { email }
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateForgotPasswordForm = (formData) => {
    const errors = {};

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
        errors.email = emailValidation.error;
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validar formulario de restablecimiento de contraseña
 * @param {Object} formData - { password, confirmPassword, token }
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateResetPasswordForm = (formData) => {
    const errors = {};

    if (!formData.token) {
        errors.token = 'Token inválido';
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
        errors.password = passwordValidation.errors[0];
    }

    const matchValidation = validatePasswordMatch(formData.password, formData.confirmPassword);
    if (!matchValidation.valid) {
        errors.confirmPassword = matchValidation.error;
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validar formulario de perfil
 * @param {Object} formData - Datos del perfil
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateProfileForm = (formData) => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
        errors.email = emailValidation.error;
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        errors.phone = 'El teléfono debe tener 10 dígitos';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Calcular fortaleza de contraseña
 * @param {string} password - Contraseña a evaluar
 * @returns {Object} { strength: string, score: number, feedback: string }
 */
export const getPasswordStrength = (password) => {
    if (!password) {
        return { strength: 'none', score: 0, feedback: 'Ingresa una contraseña' };
    }

    let score = 0;
    const feedback = [];

    // Longitud
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    // Complejidad
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    // Patrones comunes (penalización)
    if (/^[a-z]+$/.test(password)) score -= 1;
    if (/^[A-Z]+$/.test(password)) score -= 1;
    if (/^[0-9]+$/.test(password)) score -= 1;
    if (/(.)\1{2,}/.test(password)) score -= 1; // Caracteres repetidos

    // Determinar fortaleza
    let strength = 'weak';
    let feedbackText = 'Contraseña débil';

    if (score >= 6) {
        strength = 'strong';
        feedbackText = 'Contraseña fuerte';
    } else if (score >= 4) {
        strength = 'medium';
        feedbackText = 'Contraseña media';
    }

    return {
        strength,
        score: Math.max(0, Math.min(score, 7)),
        feedback: feedbackText,
    };
};

export default {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateLoginForm,
    validateRegisterForm,
    validateChangePasswordForm,
    validateForgotPasswordForm,
    validateResetPasswordForm,
    validateProfileForm,
    getPasswordStrength,
};
