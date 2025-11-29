import { INVOICE_STATUS, PAYMENT_STATUS, PAYMENT_METHODS, ESTIMATE_STATUS } from './billingTypes';

/**
 * Configuración de estados de factura con metadata
 */
export const INVOICE_STATUS_CONFIG = {
    [INVOICE_STATUS.DRAFT]: {
        label: 'Borrador',
        color: '#9E9E9E',
        bgColor: '#F5F5F5',
        icon: '📝',
        description: 'Factura en borrador',
        canEdit: true,
        canDelete: true,
    },
    [INVOICE_STATUS.PENDING]: {
        label: 'Pendiente',
        color: '#FF9800',
        bgColor: '#FFF3E0',
        icon: '⏳',
        description: 'Pendiente de pago',
        canEdit: true,
        canDelete: false,
    },
    [INVOICE_STATUS.PARTIAL]: {
        label: 'Parcial',
        color: '#2196F3',
        bgColor: '#E3F2FD',
        icon: '💰',
        description: 'Parcialmente pagada',
        canEdit: false,
        canDelete: false,
    },
    [INVOICE_STATUS.PAID]: {
        label: 'Pagada',
        color: '#4CAF50',
        bgColor: '#E8F5E9',
        icon: '✓',
        description: 'Pagada completamente',
        canEdit: false,
        canDelete: false,
    },
    [INVOICE_STATUS.OVERDUE]: {
        label: 'Vencida',
        color: '#F44336',
        bgColor: '#FFEBEE',
        icon: '⚠️',
        description: 'Pago vencido',
        canEdit: false,
        canDelete: false,
    },
    [INVOICE_STATUS.CANCELLED]: {
        label: 'Cancelada',
        color: '#757575',
        bgColor: '#EEEEEE',
        icon: '✗',
        description: 'Factura cancelada',
        canEdit: false,
        canDelete: false,
    },
    [INVOICE_STATUS.REFUNDED]: {
        label: 'Reembolsada',
        color: '#9C27B0',
        bgColor: '#F3E5F5',
        icon: '↩️',
        description: 'Pago reembolsado',
        canEdit: false,
        canDelete: false,
    },
};

/**
 * Configuración de métodos de pago con metadata
 */
export const PAYMENT_METHOD_CONFIG = {
    [PAYMENT_METHODS.CASH]: {
        label: 'Efectivo',
        icon: '💵',
        requiresReference: false,
    },
    [PAYMENT_METHODS.CREDIT_CARD]: {
        label: 'Tarjeta de Crédito',
        icon: '💳',
        requiresReference: true,
    },
    [PAYMENT_METHODS.DEBIT_CARD]: {
        label: 'Tarjeta de Débito',
        icon: '💳',
        requiresReference: true,
    },
    [PAYMENT_METHODS.TRANSFER]: {
        label: 'Transferencia',
        icon: '🏦',
        requiresReference: true,
    },
    [PAYMENT_METHODS.CHECK]: {
        label: 'Cheque',
        icon: '📄',
        requiresReference: true,
    },
    [PAYMENT_METHODS.INSURANCE]: {
        label: 'Seguro Médico',
        icon: '🏥',
        requiresReference: true,
    },
    [PAYMENT_METHODS.FINANCING]: {
        label: 'Financiamiento',
        icon: '📊',
        requiresReference: true,
    },
    [PAYMENT_METHODS.OTHER]: {
        label: 'Otro',
        icon: '➕',
        requiresReference: false,
    },
};

/**
 * Configuración de estados de presupuesto
 */
export const ESTIMATE_STATUS_CONFIG = {
    [ESTIMATE_STATUS.DRAFT]: {
        label: 'Borrador',
        color: '#9E9E9E',
        bgColor: '#F5F5F5',
        icon: '📝',
    },
    [ESTIMATE_STATUS.SENT]: {
        label: 'Enviado',
        color: '#2196F3',
        bgColor: '#E3F2FD',
        icon: '📧',
    },
    [ESTIMATE_STATUS.VIEWED]: {
        label: 'Visto',
        color: '#00BCD4',
        bgColor: '#E0F7FA',
        icon: '👁️',
    },
    [ESTIMATE_STATUS.APPROVED]: {
        label: 'Aprobado',
        color: '#4CAF50',
        bgColor: '#E8F5E9',
        icon: '✓',
    },
    [ESTIMATE_STATUS.REJECTED]: {
        label: 'Rechazado',
        color: '#F44336',
        bgColor: '#FFEBEE',
        icon: '✗',
    },
    [ESTIMATE_STATUS.EXPIRED]: {
        label: 'Expirado',
        color: '#FF9800',
        bgColor: '#FFF3E0',
        icon: '⏰',
    },
    [ESTIMATE_STATUS.CONVERTED]: {
        label: 'Convertido',
        color: '#9C27B0',
        bgColor: '#F3E5F5',
        icon: '🔄',
    },
};

/**
 * Obtener configuración de estado de factura
 */
export const getInvoiceStatusConfig = (status) => {
    return INVOICE_STATUS_CONFIG[status] || INVOICE_STATUS_CONFIG[INVOICE_STATUS.DRAFT];
};

/**
 * Obtener label de estado de factura
 */
export const getInvoiceStatusLabel = (status) => {
    return getInvoiceStatusConfig(status).label;
};

/**
 * Obtener color de estado de factura
 */
export const getInvoiceStatusColor = (status) => {
    return getInvoiceStatusConfig(status).color;
};

/**
 * Obtener configuración de método de pago
 */
export const getPaymentMethodConfig = (method) => {
    return PAYMENT_METHOD_CONFIG[method] || PAYMENT_METHOD_CONFIG[PAYMENT_METHODS.OTHER];
};

/**
 * Obtener label de método de pago
 */
export const getPaymentMethodLabel = (method) => {
    return getPaymentMethodConfig(method).label;
};

/**
 * Verificar si una factura puede ser editada
 */
export const canEditInvoice = (status) => {
    return getInvoiceStatusConfig(status).canEdit;
};

/**
 * Verificar si una factura puede ser eliminada
 */
export const canDeleteInvoice = (status) => {
    return getInvoiceStatusConfig(status).canDelete;
};

export default {
    INVOICE_STATUS_CONFIG,
    PAYMENT_METHOD_CONFIG,
    ESTIMATE_STATUS_CONFIG,
    getInvoiceStatusConfig,
    getInvoiceStatusLabel,
    getInvoiceStatusColor,
    getPaymentMethodConfig,
    getPaymentMethodLabel,
    canEditInvoice,
    canDeleteInvoice,
};
