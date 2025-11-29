"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureValidator = void 0;
/**
 * @class SignatureValidator
 * @description Validador especializado para firmas digitales (Base64)
 * Incluye validación de formato Base64 y tamaño máximo
 */
class SignatureValidator {
    /**
     * Valida si el string es Base64 válido
     * @param signature String a validar
     * @returns true si es Base64 válido, false si no
     *
     * @example
     * SignatureValidator.isValidBase64('iVBORw0KGgoA...'); // true
     * SignatureValidator.isValidBase64('hola123'); // false
     * SignatureValidator.isValidBase64(''); // false
     */
    static isValidBase64(signature) {
        // Debe tener contenido
        if (!signature || signature.length === 0) {
            return false;
        }
        // Debe cumplir patrón Base64
        if (!this.BASE64_REGEX.test(signature)) {
            return false;
        }
        // Mínimo de caracteres (al menos 64 chars = aprox 48 bytes)
        // Una firma válida debe tener al menos 64 caracteres
        if (signature.length < 64) {
            return false;
        }
        return true;
    }
    /**
     * Calcula el tamaño en bytes de un string Base64
     * 4 caracteres Base64 = 24 bits = 3 bytes
     * @param signature String Base64
     * @returns Tamaño en bytes
     *
     * @example
     * const bytes = SignatureValidator.getBase64SizeInBytes('iVBOR...'); // 1024
     */
    static getBase64SizeInBytes(signature) {
        if (!signature || signature.length === 0) {
            return 0;
        }
        // Contar caracteres de relleno (=)
        const padding = (signature.match(/=/g) || []).length;
        // Fórmula: (largo * 3) / 4 - padding
        return Math.ceil((signature.length * 3) / 4) - padding;
    }
    /**
     * Calcula el tamaño en MB de un string Base64
     * @param signature String Base64
     * @returns Tamaño en MB
     *
     * @example
     * const mb = SignatureValidator.getBase64SizeInMB('iVBOR...'); // 0.5
     */
    static getBase64SizeInMB(signature) {
        const bytes = this.getBase64SizeInBytes(signature);
        return bytes / (1024 * 1024);
    }
    /**
     * Verifica si el tamaño está dentro del límite permitido
     * @param signature String Base64
     * @returns true si está dentro del límite, false si excede
     *
     * @example
     * SignatureValidator.isWithinSizeLimit('iVBOR...'); // true
     * SignatureValidator.isWithinSizeLimit(hugeBase64); // false (>5MB)
     */
    static isWithinSizeLimit(signature) {
        const bytes = this.getBase64SizeInBytes(signature);
        return bytes <= this.MAX_SIZE_BYTES;
    }
    /**
     * Valida una firma completa (formato + tamaño)
     * Esta es la validación principal que debería usarse en casos de uso
     * @param signature String Base64 a validar
     * @returns { valid: boolean, error?: string }
     *
     * @example
     * const result = SignatureValidator.validate('iVBOR...');
     * if (!result.valid) {
     *   console.error(result.error); // "Firma digital inválida: excede 5 MB"
     * }
     */
    static validate(signature) {
        // Validar que no esté vacío
        if (!signature || signature.length === 0) {
            return {
                valid: false,
                error: 'Firma digital requerida'
            };
        }
        // Validar formato Base64
        if (!this.isValidBase64(signature)) {
            return {
                valid: false,
                error: 'Firma digital inválida: debe ser Base64 válido'
            };
        }
        // Validar tamaño
        if (!this.isWithinSizeLimit(signature)) {
            const sizeMB = this.getBase64SizeInMB(signature);
            return {
                valid: false,
                error: `Firma digital muy grande: ${sizeMB.toFixed(2)} MB (máximo ${this.MAX_SIZE_MB} MB)`
            };
        }
        // Validación exitosa
        return {
            valid: true
        };
    }
    /**
     * Valida si es una URL válida de imagen (para futuro uso con S3)
     * @param signature String a validar
     * @returns true si es URL válida, false si no
     *
     * @example
     * SignatureValidator.isValidImageUrl('https://s3.aws.../firma.png'); // true
     * SignatureValidator.isValidImageUrl('http://example.com/image.jpg'); // true
     * SignatureValidator.isValidImageUrl('not-a-url'); // false
     */
    static isValidImageUrl(signature) {
        return this.URL_REGEX.test(signature);
    }
    /**
     * Valida si es Base64 O URL (para máxima flexibilidad)
     * Útil cuando el sistema puede aceptar ambos formatos
     * @param signature String a validar
     * @returns true si es válido (Base64 o URL), false si no
     *
     * @example
     * SignatureValidator.isValidSignatureOrUrl('iVBOR...'); // true (Base64)
     * SignatureValidator.isValidSignatureOrUrl('https://s3.../firma.png'); // true (URL)
     * SignatureValidator.isValidSignatureOrUrl('invalid'); // false
     */
    static isValidSignatureOrUrl(signature) {
        return this.isValidBase64(signature) || this.isValidImageUrl(signature);
    }
}
exports.SignatureValidator = SignatureValidator;
_a = SignatureValidator;
/**
 * Tamaño máximo permitido en MB
 * 5 MB es un buen balance entre seguridad y usabilidad
 */
SignatureValidator.MAX_SIZE_MB = 5;
SignatureValidator.MAX_SIZE_BYTES = _a.MAX_SIZE_MB * 1024 * 1024;
/**
 * Patrón regex para validar Base64 estándar
 * Acepta caracteres A-Z, a-z, 0-9, +, /, y = al final
 */
SignatureValidator.BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
/**
 * Patrón para detectar si es una URL de imagen
 * Útil si en el futuro se guarda en S3/CloudStorage
 */
SignatureValidator.URL_REGEX = /^(https?:\/\/.+\.(png|jpg|jpeg|gif|webp))$/i;
