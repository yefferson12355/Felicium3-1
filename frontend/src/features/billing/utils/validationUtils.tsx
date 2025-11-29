/**
 * Validar item de factura
 * @param {Object} item - Item a validar
 * @returns {Object} { valid: boolean, errors: Array }
 */
export const validateInvoiceItem = (item) => {
    const errors = [];

    if (!item.description || item.description.trim().length < 3) {
        errors.push('La descripción debe tener al menos 3 caracteres');
    }

    if (!item.quantity || item.quantity <= 0) {
        errors.push('La cantidad debe ser mayor a 0');
    }

    if (!item.price || item.price < 0) {
        errors.push('El precio no puede ser negativo');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Validar factura completa
 * @param {Object} invoice - Factura a validar
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateInvoice = (invoice) => {
    const errors = {};

    // Validar paciente
    if (!invoice.patientId && !invoice.patient) {
        errors.patient = 'Debe seleccionar un paciente';
    }

    // Validar fecha de emisión
    if (!invoice.issueDate) {
        errors.issueDate = 'La fecha de emisión es requerida';
    }

    // Validar items
    if (!invoice.items || invoice.items.length === 0) {
        errors.items = 'Debe agregar al menos un item';
    } else {
        const invalidItems = invoice.items.filter(item => {
            const validation = validateInvoiceItem(item);
            return !validation.valid;
        });

        if (invalidItems.length > 0) {
            errors.items = 'Algunos items tienen errores';
        }
    }

    // Validar total
    if (invoice.total !== undefined && invoice.total < 0) {
        errors.total = 'El total no puede ser negativo';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validar pago
 * @param {Object} payment - Pago a validar
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validatePayment = (payment) => {
    const errors = {};

    // Validar monto
    if (!payment.amount || payment.amount <= 0) {
        errors.amount = 'El monto debe ser mayor a 0';
    }

    // Validar método de pago
    if (!payment.method) {
        errors.method = 'Debe seleccionar un método de pago';
    }

    // Validar fecha
    if (!payment.date) {
        errors.date = 'La fecha de pago es requerida';
    }

    // Validar referencia si es requerida
    const methodsRequiringReference = ['credit_card', 'debit_card', 'transfer', 'check'];
    if (methodsRequiringReference.includes(payment.method) && !payment.reference) {
        errors.reference = 'La referencia es requerida para este método de pago';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validar presupuesto
 * @param {Object} estimate - Presupuesto a validar
 * @returns {Object} { valid: boolean, errors: Object }
 */
export const validateEstimate = (estimate) => {
    const errors = {};

    // Validar paciente
    if (!estimate.patientId && !estimate.patient) {
        errors.patient = 'Debe seleccionar un paciente';
    }

    // Validar fecha de emisión
    if (!estimate.issueDate) {
        errors.issueDate = 'La fecha de emisión es requerida';
    }

    // Validar fecha de expiración
    if (!estimate.expiryDate) {
        errors.expiryDate = 'La fecha de expiración es requerida';
    } else if (new Date(estimate.expiryDate) <= new Date(estimate.issueDate)) {
        errors.expiryDate = 'La fecha de expiración debe ser posterior a la fecha de emisión';
    }

    // Validar items
    if (!estimate.items || estimate.items.length === 0) {
        errors.items = 'Debe agregar al menos un item';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Validar descuento
 * @param {Object} discount - Descuento a validar
 * @param {number} subtotal - Subtotal de la factura
 * @returns {Object} { valid: boolean, errors: Array }
 */
export const validateDiscount = (discount, subtotal) => {
    const errors = [];

    if (!discount || !discount.value) {
        return { valid: true, errors: [] };
    }

    if (discount.value < 0) {
        errors.push('El descuento no puede ser negativo');
    }

    if (discount.type === 'percentage' && discount.value > 100) {
        errors.push('El descuento porcentual no puede ser mayor a 100%');
    }

    if (discount.type === 'fixed' && discount.value > subtotal) {
        errors.push('El descuento fijo no puede ser mayor al subtotal');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Validar monto de pago contra balance
 * @param {number} paymentAmount - Monto del pago
 * @param {number} balance - Balance pendiente
 * @returns {Object} { valid: boolean, error: string }
 */
export const validatePaymentAmount = (paymentAmount, balance) => {
    if (paymentAmount <= 0) {
        return { valid: false, error: 'El monto debe ser mayor a 0' };
    }

    if (paymentAmount > balance) {
        return { valid: false, error: 'El monto no puede ser mayor al balance pendiente' };
    }

    return { valid: true, error: null };
};

/**
 * Validar número de tarjeta (Luhn algorithm)
 * @param {string} cardNumber - Número de tarjeta
 * @returns {boolean} True si es válido
 */
export const validateCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\D/g, '');

    if (cleaned.length < 13 || cleaned.length > 19) {
        return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
};

export default {
    validateInvoiceItem,
    validateInvoice,
    validatePayment,
    validateEstimate,
    validateDiscount,
    validatePaymentAmount,
    validateCardNumber,
};
