import { TAX_RATES, DISCOUNT_TYPES, CURRENCY_SYMBOLS, BILLING_CONFIG } from '../types';

/**
 * Calcular subtotal de items
 * @param {Array} items - Lista de items { quantity, price }
 * @returns {number} Subtotal
 */
export const calculateSubtotal = (items = []) => {
    return items.reduce((total, item) => {
        return total + (item.quantity * item.price);
    }, 0);
};

/**
 * Calcular descuento
 * @param {number} subtotal - Subtotal
 * @param {Object} discount - { type, value }
 * @returns {number} Monto del descuento
 */
export const calculateDiscount = (subtotal, discount = {}) => {
    if (!discount || !discount.value) return 0;

    if (discount.type === DISCOUNT_TYPES.PERCENTAGE) {
        return (subtotal * discount.value) / 100;
    }

    if (discount.type === DISCOUNT_TYPES.FIXED) {
        return Math.min(discount.value, subtotal); // No puede ser mayor al subtotal
    }

    return 0;
};

/**
 * Calcular impuesto
 * @param {number} amount - Monto base
 * @param {number} taxRate - Tasa de impuesto (%)
 * @returns {number} Monto del impuesto
 */
export const calculateTax = (amount, taxRate = TAX_RATES.IVA) => {
    return (amount * taxRate) / 100;
};

/**
 * Calcular total de factura
 * @param {Array} items - Items de la factura
 * @param {Object} discount - Descuento aplicado
 * @param {number} taxRate - Tasa de impuesto
 * @returns {Object} { subtotal, discount, tax, total }
 */
export const calculateInvoiceTotal = (items = [], discount = {}, taxRate = TAX_RATES.IVA) => {
    const subtotal = calculateSubtotal(items);
    const discountAmount = calculateDiscount(subtotal, discount);
    const amountAfterDiscount = subtotal - discountAmount;
    const tax = calculateTax(amountAfterDiscount, taxRate);
    const total = amountAfterDiscount + tax;

    return {
        subtotal: roundToTwo(subtotal),
        discount: roundToTwo(discountAmount),
        tax: roundToTwo(tax),
        total: roundToTwo(total),
    };
};

/**
 * Calcular balance pendiente
 * @param {number} total - Total de la factura
 * @param {Array} payments - Pagos realizados
 * @returns {number} Balance pendiente
 */
export const calculateBalance = (total, payments = []) => {
    const totalPaid = payments.reduce((sum, payment) => {
        return sum + (payment.amount || 0);
    }, 0);

    return roundToTwo(total - totalPaid);
};

/**
 * Calcular porcentaje pagado
 * @param {number} total - Total de la factura
 * @param {Array} payments - Pagos realizados
 * @returns {number} Porcentaje pagado (0-100)
 */
export const calculatePaidPercentage = (total, payments = []) => {
    if (total === 0) return 0;

    const totalPaid = payments.reduce((sum, payment) => {
        return sum + (payment.amount || 0);
    }, 0);

    return Math.min(roundToTwo((totalPaid / total) * 100), 100);
};

/**
 * Redondear a 2 decimales
 * @param {number} value - Valor a redondear
 * @returns {number} Valor redondeado
 */
export const roundToTwo = (value) => {
    return Math.round(value * 100) / 100;
};

/**
 * Formatear monto a moneda
 * @param {number} amount - Monto
 * @param {string} currency - Código de moneda
 * @returns {string} Monto formateado
 */
export const formatCurrency = (amount, currency = BILLING_CONFIG.DEFAULT_CURRENCY) => {
    const symbol = CURRENCY_SYMBOLS[currency] || '$';
    const formatted = amount.toLocaleString('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return `${symbol}${formatted}`;
};

/**
 * Calcular fecha de vencimiento
 * @param {string|Date} issueDate - Fecha de emisión
 * @param {number} paymentTerms - Términos de pago (días)
 * @returns {Date} Fecha de vencimiento
 */
export const calculateDueDate = (issueDate, paymentTerms = 0) => {
    const date = typeof issueDate === 'string' ? new Date(issueDate) : issueDate;
    const dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + paymentTerms);
    return dueDate;
};

/**
 * Verificar si una factura está vencida
 * @param {string|Date} dueDate - Fecha de vencimiento
 * @returns {boolean} True si está vencida
 */
export const isOverdue = (dueDate) => {
    const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today;
};

/**
 * Calcular días de retraso
 * @param {string|Date} dueDate - Fecha de vencimiento
 * @returns {number} Días de retraso (0 si no está vencida)
 */
export const calculateOverdueDays = (dueDate) => {
    if (!isOverdue(dueDate)) return 0;

    const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
    const today = new Date();
    const diffTime = Math.abs(today - due);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Calcular intereses por mora
 * @param {number} amount - Monto adeudado
 * @param {number} days - Días de retraso
 * @param {number} rate - Tasa de interés mensual (%)
 * @returns {number} Intereses calculados
 */
export const calculateLateInterest = (amount, days, rate = 2) => {
    const dailyRate = rate / 30; // Convertir tasa mensual a diaria
    const interest = (amount * dailyRate * days) / 100;
    return roundToTwo(interest);
};

/**
 * Generar número de factura
 * @param {number} sequence - Número de secuencia
 * @param {string} prefix - Prefijo
 * @returns {string} Número de factura
 */
export const generateInvoiceNumber = (sequence, prefix = BILLING_CONFIG.INVOICE_PREFIX) => {
    const year = new Date().getFullYear();
    const paddedSequence = String(sequence).padStart(6, '0');
    return `${prefix}-${year}-${paddedSequence}`;
};

/**
 * Calcular comisión
 * @param {number} amount - Monto base
 * @param {number} rate - Tasa de comisión (%)
 * @returns {number} Comisión calculada
 */
export const calculateCommission = (amount, rate) => {
    return roundToTwo((amount * rate) / 100);
};

/**
 * Distribuir pago entre múltiples facturas
 * @param {number} paymentAmount - Monto del pago
 * @param {Array} invoices - Facturas pendientes { id, balance }
 * @returns {Array} Distribución { invoiceId, amount }
 */
export const distributePayment = (paymentAmount, invoices = []) => {
    let remaining = paymentAmount;
    const distribution = [];

    // Ordenar por balance ascendente (pagar primero las menores)
    const sorted = [...invoices].sort((a, b) => a.balance - b.balance);

    for (const invoice of sorted) {
        if (remaining <= 0) break;

        const amount = Math.min(remaining, invoice.balance);
        distribution.push({
            invoiceId: invoice.id,
            amount: roundToTwo(amount),
        });

        remaining -= amount;
    }

    return distribution;
};

export default {
    calculateSubtotal,
    calculateDiscount,
    calculateTax,
    calculateInvoiceTotal,
    calculateBalance,
    calculatePaidPercentage,
    roundToTwo,
    formatCurrency,
    calculateDueDate,
    isOverdue,
    calculateOverdueDays,
    calculateLateInterest,
    generateInvoiceNumber,
    calculateCommission,
    distributePayment,
};
