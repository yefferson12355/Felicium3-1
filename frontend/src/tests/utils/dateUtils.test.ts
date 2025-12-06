import {
  formatDate,
  formatDateShort,
  formatTime,
  formatDateTime,
  getTodayDate,
  getCurrentTime,
  isToday,
  isPastDate,
  isFutureDate,
  addDays,
  getDayName,
  getMonthName,
} from '../../features/appointments/utils/dateUtils';

describe('dateUtils', () => {
  // ==================== FORMAT DATE ====================
  describe('formatDate', () => {
    test('formatea fecha string correctamente', () => {
      const result = formatDate('2025-12-25');
      expect(result).toContain('2025');
      expect(result.toLowerCase()).toContain('diciembre');
    });

    test('formatea objeto Date correctamente', () => {
      const date = new Date(2025, 11, 25); // Diciembre 25, 2025
      const result = formatDate(date);
      expect(result).toContain('25');
      expect(result.toLowerCase()).toContain('diciembre');
    });

    test('incluye día de la semana', () => {
      const result = formatDate('2025-12-25');
      // Diciembre 25, 2025 es jueves
      expect(result.toLowerCase()).toMatch(/lunes|martes|miércoles|jueves|viernes|sábado|domingo/);
    });
  });

  // ==================== FORMAT DATE SHORT ====================
  describe('formatDateShort', () => {
    test('formatea fecha en formato corto', () => {
      const result = formatDateShort('2025-12-25');
      // Formato español: DD/MM/YYYY - puede variar por timezone
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/2025/);
    });

    test('maneja objeto Date', () => {
      const date = new Date(2025, 0, 15); // Enero 15, 2025
      const result = formatDateShort(date);
      expect(result).toContain('15');
      expect(result).toContain('2025');
    });
  });

  // ==================== FORMAT TIME ====================
  describe('formatTime', () => {
    test('retorna hora en formato 24h por defecto', () => {
      const result = formatTime('14:30');
      expect(result).toBe('14:30');
    });

    test('convierte a formato 12h cuando se especifica', () => {
      const result = formatTime('14:30', false);
      expect(result).toBe('2:30 PM');
    });

    test('maneja hora de medianoche', () => {
      const result = formatTime('00:00', false);
      expect(result).toBe('12:00 AM');
    });

    test('maneja hora de mediodía', () => {
      const result = formatTime('12:00', false);
      expect(result).toBe('12:00 PM');
    });

    test('maneja horas de la mañana', () => {
      const result = formatTime('09:15', false);
      expect(result).toBe('9:15 AM');
    });

    test('maneja horas de la tarde', () => {
      const result = formatTime('18:45', false);
      expect(result).toBe('6:45 PM');
    });
  });

  // ==================== FORMAT DATE TIME ====================
  describe('formatDateTime', () => {
    test('combina fecha y hora correctamente', () => {
      const result = formatDateTime('2025-12-25', '14:30');
      expect(result).toContain('diciembre');
      expect(result).toContain('14:30');
      expect(result).toContain('a las');
    });
  });

  // ==================== GET TODAY DATE ====================
  describe('getTodayDate', () => {
    test('retorna fecha de hoy en formato ISO', () => {
      const result = getTodayDate();
      const today = new Date().toISOString().split('T')[0];
      expect(result).toBe(today);
    });

    test('tiene formato YYYY-MM-DD', () => {
      const result = getTodayDate();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  // ==================== GET CURRENT TIME ====================
  describe('getCurrentTime', () => {
    test('retorna hora actual en formato HH:MM', () => {
      const result = getCurrentTime();
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    test('hora está en rango válido', () => {
      const result = getCurrentTime();
      const [hours, minutes] = result.split(':').map(Number);
      expect(hours).toBeGreaterThanOrEqual(0);
      expect(hours).toBeLessThanOrEqual(23);
      expect(minutes).toBeGreaterThanOrEqual(0);
      expect(minutes).toBeLessThanOrEqual(59);
    });
  });

  // ==================== IS TODAY ====================
  describe('isToday', () => {
    test('retorna true para fecha de hoy (objeto Date)', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    test('retorna false para fecha de ayer', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });

    test('retorna false para fecha de mañana', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  // ==================== IS PAST DATE ====================
  describe('isPastDate', () => {
    test('retorna true para fecha pasada', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 7);
      expect(isPastDate(pastDate)).toBe(true);
    });

    test('retorna false para fecha futura', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      expect(isPastDate(futureDate)).toBe(false);
    });
  });

  // ==================== IS FUTURE DATE ====================
  describe('isFutureDate', () => {
    test('retorna true para fecha futura', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      expect(isFutureDate(futureDate)).toBe(true);
    });

    test('retorna false para fecha pasada', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 7);
      expect(isFutureDate(pastDate)).toBe(false);
    });
  });

  // ==================== ADD DAYS ====================
  describe('addDays', () => {
    test('añade días correctamente', () => {
      const result = addDays('2025-01-01', 10);
      expect(result).toBe('2025-01-11');
    });

    test('maneja cambio de mes', () => {
      const result = addDays('2025-01-30', 5);
      expect(result).toBe('2025-02-04');
    });

    test('resta días con número negativo', () => {
      const result = addDays('2025-01-15', -5);
      expect(result).toBe('2025-01-10');
    });
  });

  // ==================== GET DAY NAME ====================
  describe('getDayName', () => {
    test('retorna día de la semana en español', () => {
      const monday = new Date(2025, 11, 1); // Lunes 1 Dic 2025
      const result = getDayName(monday);
      expect(result.toLowerCase()).toBe('lunes');
    });

    test('retorna domingo correctamente', () => {
      const sunday = new Date(2025, 11, 7); // Domingo 7 Dic 2025
      const result = getDayName(sunday);
      expect(result.toLowerCase()).toBe('domingo');
    });
  });

  // ==================== GET MONTH NAME ====================
  describe('getMonthName', () => {
    test('retorna nombre del mes en español', () => {
      const december = new Date(2025, 11, 1);
      const result = getMonthName(december);
      expect(result.toLowerCase()).toBe('diciembre');
    });

    test('retorna enero correctamente', () => {
      const january = new Date(2025, 0, 1);
      const result = getMonthName(january);
      expect(result.toLowerCase()).toBe('enero');
    });
  });
});
