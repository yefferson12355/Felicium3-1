import { SignatureValidator } from '../../../src/shared/validators/signature.validator';

describe('SignatureValidator', () => {
  describe('isValidBase64', () => {
    it('debe aceptar Base64 válido', () => {
      // PNG pequeño codificado en Base64 (firma válida)
      const validBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      expect(SignatureValidator.isValidBase64(validBase64)).toBe(true);
    });

    it('debe rechazar Base64 inválido', () => {
      expect(SignatureValidator.isValidBase64('hola123!')).toBe(false);
    });

    it('debe rechazar string vacío', () => {
      expect(SignatureValidator.isValidBase64('')).toBe(false);
    });

    it('debe rechazar undefined', () => {
      expect(SignatureValidator.isValidBase64(undefined as any)).toBe(false);
    });

    it('debe rechazar string muy corto', () => {
      expect(SignatureValidator.isValidBase64('aGVsbG8=')).toBe(false);
    });
  });

  describe('getBase64SizeInBytes', () => {
    it('debe calcular tamaño correcto', () => {
      // "iVBORw0KGgoA" son 12 caracteres Base64
      // 12 * 3 / 4 = 9 bytes
      const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const size = SignatureValidator.getBase64SizeInBytes(base64);
      expect(size).toBeGreaterThan(0);
    });

    it('debe retornar 0 para string vacío', () => {
      expect(SignatureValidator.getBase64SizeInBytes('')).toBe(0);
    });
  });

  describe('getBase64SizeInMB', () => {
    it('debe convertir bytes a MB correctamente', () => {
      const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const sizeInMB = SignatureValidator.getBase64SizeInMB(base64);
      expect(sizeInMB).toBeLessThan(0.001); // Menos de 1 KB en MB
    });
  });

  describe('isWithinSizeLimit', () => {
    it('debe aceptar firmas dentro del límite', () => {
      const validBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      expect(SignatureValidator.isWithinSizeLimit(validBase64)).toBe(true);
    });

    it('debe rechazar firmas muy grandes', () => {
      // Crear un string Base64 muy grande (mayor a 5MB)
      // Usar repetición de 'A' es más eficiente que crear array gigante
      const hugeBase64 = 'A'.repeat(7 * 1024 * 1024); // 7 MB
      expect(SignatureValidator.isWithinSizeLimit(hugeBase64)).toBe(false);
    });
  });

  describe('validate', () => {
    it('debe validar una firma completa correctamente', () => {
      const validBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const result = SignatureValidator.validate(validBase64);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('debe retornar error para firma vacía', () => {
      const result = SignatureValidator.validate('');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('requerida');
    });

    it('debe retornar error para Base64 inválido', () => {
      const result = SignatureValidator.validate('not-a-valid-base64!');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('inválida');
    });

    it('debe retornar error para firma muy grande', () => {
      const hugeBase64 = 'A'.repeat(7 * 1024 * 1024); // 7 MB
      const result = SignatureValidator.validate(hugeBase64);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('grande');
    });
  });

  describe('isValidImageUrl', () => {
    it('debe aceptar URLs válidas', () => {
      expect(SignatureValidator.isValidImageUrl('https://s3.aws.com/firma.png')).toBe(true);
      expect(SignatureValidator.isValidImageUrl('https://example.com/image.jpg')).toBe(true);
      expect(SignatureValidator.isValidImageUrl('http://example.com/image.jpeg')).toBe(true);
    });

    it('debe rechazar URLs inválidas', () => {
      expect(SignatureValidator.isValidImageUrl('not-a-url')).toBe(false);
      expect(SignatureValidator.isValidImageUrl('https://example.com/image.txt')).toBe(false);
    });
  });

  describe('isValidSignatureOrUrl', () => {
    it('debe aceptar Base64 válido', () => {
      const validBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      expect(SignatureValidator.isValidSignatureOrUrl(validBase64)).toBe(true);
    });

    it('debe aceptar URL válida', () => {
      expect(SignatureValidator.isValidSignatureOrUrl('https://s3.aws.com/firma.png')).toBe(true);
    });

    it('debe rechazar entrada inválida', () => {
      expect(SignatureValidator.isValidSignatureOrUrl('invalid')).toBe(false);
    });
  });
});
