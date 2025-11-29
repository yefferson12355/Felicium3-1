/**
 * Utilidades para manejo de fechas en citas
 */

/**
 * Formatear fecha a formato legible en español
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} Fecha formateada (ej: "Lunes, 13 de Noviembre de 2025")
 */
export const formatDate = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('es-ES', options);
};

/**
 * Formatear fecha a formato corto
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} Fecha formateada (ej: "13/11/2025")
 */
export const formatDateShort = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES');
};

/**
 * Formatear hora a formato 12h o 24h
 * @param {string} time - Hora en formato HH:MM
 * @param {boolean} use24h - Usar formato 24h (default: true)
 * @returns {string} Hora formateada
 */
export const formatTime = (time, use24h = true) => {
    if (use24h) return time;

    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
};

/**
 * Formatear fecha y hora juntas
 * @param {string|Date} date - Fecha
 * @param {string} time - Hora
 * @returns {string} Fecha y hora formateadas
 */
export const formatDateTime = (date, time) => {
    return `${formatDate(date)} a las ${formatTime(time)}`;
};

/**
 * Obtener fecha actual en formato YYYY-MM-DD
 * @returns {string} Fecha actual
 */
export const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

/**
 * Obtener hora actual en formato HH:MM
 * @returns {string} Hora actual
 */
export const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

/**
 * Verificar si una fecha es hoy
 * @param {string|Date} date - Fecha a verificar
 * @returns {boolean} True si es hoy
 */
export const isToday = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    return dateObj.toDateString() === today.toDateString();
};

/**
 * Verificar si una fecha es pasada
 * @param {string|Date} date - Fecha a verificar
 * @returns {boolean} True si es pasada
 */
export const isPastDate = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateObj < today;
};

/**
 * Verificar si una fecha es futura
 * @param {string|Date} date - Fecha a verificar
 * @returns {boolean} True si es futura
 */
export const isFutureDate = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateObj > today;
};

/**
 * Obtener rango de fechas de la semana actual
 * @returns {Object} { start, end } en formato YYYY-MM-DD
 */
export const getCurrentWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Lunes

    const monday = new Date(today.setDate(diff));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
        start: monday.toISOString().split('T')[0],
        end: sunday.toISOString().split('T')[0],
    };
};

/**
 * Obtener rango de fechas del mes actual
 * @returns {Object} { start, end } en formato YYYY-MM-DD
 */
export const getCurrentMonthRange = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
        start: firstDay.toISOString().split('T')[0],
        end: lastDay.toISOString().split('T')[0],
    };
};

/**
 * Agregar días a una fecha
 * @param {string|Date} date - Fecha base
 * @param {number} days - Días a agregar
 * @returns {string} Nueva fecha en formato YYYY-MM-DD
 */
export const addDays = (date, days) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const result = new Date(dateObj);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
};

/**
 * Calcular diferencia en días entre dos fechas
 * @param {string|Date} date1 - Primera fecha
 * @param {string|Date} date2 - Segunda fecha
 * @returns {number} Diferencia en días
 */
export const daysDifference = (date1, date2) => {
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Obtener nombre del día de la semana
 * @param {string|Date} date - Fecha
 * @returns {string} Nombre del día
 */
export const getDayName = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dateObj.getDay()];
};

/**
 * Obtener nombre del mes
 * @param {string|Date} date - Fecha
 * @returns {string} Nombre del mes
 */
export const getMonthName = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[dateObj.getMonth()];
};

/**
 * Comparar dos horas
 * @param {string} time1 - Primera hora HH:MM
 * @param {string} time2 - Segunda hora HH:MM
 * @returns {number} -1 si time1 < time2, 0 si iguales, 1 si time1 > time2
 */
export const compareTime = (time1, time2) => {
    const [h1, m1] = time1.split(':').map(Number);
    const [h2, m2] = time2.split(':').map(Number);

    if (h1 < h2) return -1;
    if (h1 > h2) return 1;
    if (m1 < m2) return -1;
    if (m1 > m2) return 1;
    return 0;
};

/**
 * Agregar minutos a una hora
 * @param {string} time - Hora base HH:MM
 * @param {number} minutes - Minutos a agregar
 * @returns {string} Nueva hora HH:MM
 */
export const addMinutes = (time, minutes) => {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
};

export default {
    formatDate,
    formatDateShort,
    formatTime,
    formatDateTime,
    getTodayDate,
    getCurrentTime,
    isToday,
    isPastDate,
    isFutureDate,
    getCurrentWeekRange,
    getCurrentMonthRange,
    addDays,
    daysDifference,
    getDayName,
    getMonthName,
    compareTime,
    addMinutes,
};
