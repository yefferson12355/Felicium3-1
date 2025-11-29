/**
 * Estados de Factura
 */
export const INVOICE_STATUS = {
    DRAFT: 'draft',           // Borrador
    PENDING: 'pending',       // Pendiente de pago
    PARTIAL: 'partial',       // Parcialmente pagada
    PAID: 'paid',            // Pagada completamente
    OVERDUE: 'overdue',      // Vencida
    CANCELLED: 'cancelled',   // Cancelada
    REFUNDED: 'refunded',    // Reembolsada
};

/**
 * Estados de Pago
 */
export const PAYMENT_STATUS = {
    PENDING: 'pending',       // Pendiente
    COMPLETED: 'completed',   // Completado
    FAILED: 'failed',        // Fallido
    REFUNDED: 'refunded',    // Reembolsado
    CANCELLED: 'cancelled',   // Cancelado
};

/**
 * Métodos de Pago
 */
export const PAYMENT_METHODS = {
    CASH: 'cash',                    // Efectivo
    CREDIT_CARD: 'credit_card',      // Tarjeta de crédito
    DEBIT_CARD: 'debit_card',        // Tarjeta de débito
    TRANSFER: 'transfer',            // Transferencia bancaria
    CHECK: 'check',                  // Cheque
    INSURANCE: 'insurance',          // Seguro médico
    FINANCING: 'financing',          // Financiamiento
    OTHER: 'other',                  // Otro
};

/**
 * Estados de Presupuesto
 */
export const ESTIMATE_STATUS = {
    DRAFT: 'draft',           // Borrador
    SENT: 'sent',            // Enviado
    VIEWED: 'viewed',        // Visto por el paciente
    APPROVED: 'approved',    // Aprobado
    REJECTED: 'rejected',    // Rechazado
    EXPIRED: 'expired',      // Expirado
    CONVERTED: 'converted',  // Convertido a factura
};

/**
 * Tipos de Descuento
 */
export const DISCOUNT_TYPES = {
    PERCENTAGE: 'percentage',  // Porcentaje
    FIXED: 'fixed',           // Monto fijo
};

/**
 * Tipos de Impuesto
 */
export const TAX_TYPES = {
    IVA: 'iva',              // IVA
    SALES_TAX: 'sales_tax',  // Impuesto sobre ventas
    NONE: 'none',            // Sin impuesto
};

/**
 * Tasas de Impuesto (%)
 */
export const TAX_RATES = {
    IVA: 16,           // 16% IVA en México
    SALES_TAX: 0,      // Configurable según región
};

/**
 * Períodos de Facturación
 */
export const BILLING_PERIODS = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    CUSTOM: 'custom',
};

/**
 * Términos de Pago (días)
 */
export const PAYMENT_TERMS = {
    IMMEDIATE: 0,      // Inmediato
    NET_15: 15,        // 15 días
    NET_30: 30,        // 30 días
    NET_60: 60,        // 60 días
    NET_90: 90,        // 90 días
};

/**
 * Monedas
 */
export const CURRENCIES = {
    MXN: 'MXN',  // Peso Mexicano
    USD: 'USD',  // Dólar Estadounidense
    EUR: 'EUR',  // Euro
};

/**
 * Símbolos de Moneda
 */
export const CURRENCY_SYMBOLS = {
    MXN: '$',
    USD: '$',
    EUR: '€',
};

/**
 * Configuración de Facturación
 */
export const BILLING_CONFIG = {
    DEFAULT_CURRENCY: CURRENCIES.MXN,
    DEFAULT_TAX_RATE: TAX_RATES.IVA,
    DEFAULT_PAYMENT_TERMS: PAYMENT_TERMS.IMMEDIATE,
    INVOICE_PREFIX: 'INV',
    ESTIMATE_PREFIX: 'EST',
    PAYMENT_PREFIX: 'PAY',
    OVERDUE_DAYS: 30,
};

/**
 * Categorías de Servicios/Productos
 */
export const SERVICE_CATEGORIES = {
    CONSULTATION: 'consultation',      // Consulta
    CLEANING: 'cleaning',             // Limpieza
    FILLING: 'filling',               // Empaste
    EXTRACTION: 'extraction',         // Extracción
    ROOT_CANAL: 'root_canal',         // Endodoncia
    CROWN: 'crown',                   // Corona
    ORTHODONTICS: 'orthodontics',     // Ortodoncia
    WHITENING: 'whitening',           // Blanqueamiento
    IMPLANT: 'implant',               // Implante
    PROSTHESIS: 'prosthesis',         // Prótesis
    XRAY: 'xray',                     // Radiografía
    MEDICATION: 'medication',         // Medicamentos
    OTHER: 'other',                   // Otro
};

/**
 * Prioridades de Cobro
 */
export const COLLECTION_PRIORITY = {
    LOW: 'low',       // Baja
    MEDIUM: 'medium', // Media
    HIGH: 'high',     // Alta
    URGENT: 'urgent', // Urgente
};

export default {
    INVOICE_STATUS,
    PAYMENT_STATUS,
    PAYMENT_METHODS,
    ESTIMATE_STATUS,
    DISCOUNT_TYPES,
    TAX_TYPES,
    TAX_RATES,
    BILLING_PERIODS,
    PAYMENT_TERMS,
    CURRENCIES,
    CURRENCY_SYMBOLS,
    BILLING_CONFIG,
    SERVICE_CATEGORIES,
    COLLECTION_PRIORITY,
};
