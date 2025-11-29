/**
 * Sistema de Design Tokens - Felicium 3.0
 * Inspirado en Atlassian Design System
 * 
 * Centraliza todos los valores de diseño:
 * - Colores (paleta completa con variantes)
 * - Tipografía (familias, tamaños, pesos)
 * - Espaciados (sistema de 8px)
 * - Sombras (elevaciones)
 * - Bordes (radios, anchos)
 * - Breakpoints (responsive design)
 * - Transiciones (animaciones)
 */

const theme = {
  // ========================================
  // COLORES
  // ========================================
  colors: {
    // Colores primarios (identidad de marca)
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#0052CC',  // Color principal
      600: '#0747A6',
      700: '#0A3D8F',
      800: '#09326C',
      900: '#082145',
    },

    // Colores secundarios
    secondary: {
      50: '#F3E5F5',
      100: '#E1BEE7',
      200: '#CE93D8',
      300: '#BA68C8',
      400: '#AB47BC',
      500: '#6554C0',  // Púrpura Atlassian
      600: '#5243AA',
      700: '#403294',
      800: '#352C7D',
      900: '#2B2566',
    },

    // Colores de estado (feedback)
    success: {
      50: '#E8F5E9',
      100: '#C8E6C9',
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: '#36B37E',  // Verde Atlassian
      600: '#2E9D6A',
      700: '#268756',
      800: '#1E7142',
      900: '#165B2E',
    },

    warning: {
      50: '#FFF8E1',
      100: '#FFECB3',
      200: '#FFE082',
      300: '#FFD54F',
      400: '#FFCA28',
      500: '#FFAB00',  // Amarillo Atlassian
      600: '#FF991F',
      700: '#FF8B00',
      800: '#FF7D00',
      900: '#FF6F00',
    },

    error: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#DE350B',  // Rojo Atlassian
      600: '#C62828',
      700: '#B71C1C',
      800: '#A01414',
      900: '#8A0E0E',
    },

    info: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3',
      600: '#1976D2',
      700: '#1565C0',
      800: '#0D47A1',
      900: '#0A3D8F',
    },

    // Colores neutrales (grises)
    neutral: {
      0: '#FFFFFF',
      50: '#FAFBFC',
      100: '#F4F5F7',
      200: '#EBECF0',
      300: '#DFE1E6',
      400: '#C1C7D0',
      500: '#B3BAC5',
      600: '#A5ADBA',
      700: '#97A0AF',
      800: '#8993A4',
      900: '#7A869A',
      1000: '#6B778C',
      1100: '#5E6C84',
      1200: '#505F79',
      1300: '#42526E',
      1400: '#344563',
      1500: '#253858',
      1600: '#172B4D',
      1700: '#091E42',
    },

    // Colores de texto
    text: {
      primary: '#172B4D',     // Texto principal (90% opacidad)
      secondary: '#505F79',   // Texto secundario (70% opacidad)
      tertiary: '#6B778C',    // Texto terciario (50% opacidad)
      disabled: '#A5ADBA',    // Texto deshabilitado (30% opacidad)
      inverse: '#FFFFFF',     // Texto sobre fondos oscuros
      link: '#0052CC',        // Enlaces
      linkHover: '#0747A6',   // Enlaces hover
    },

    // Colores de fondo
    background: {
      default: '#FAFBFC',       // Fondo general
      paper: '#FFFFFF',         // Fondo de tarjetas/modales
      elevated: '#FFFFFF',      // Fondo elevado (sobre paper)
      overlay: 'rgba(9, 30, 66, 0.54)', // Overlay de modales
      disabled: '#F4F5F7',      // Fondo deshabilitado
      hover: '#F4F5F7',         // Hover sobre elementos
      selected: '#DEEBFF',      // Elemento seleccionado
      brand: '#0052CC',         // Fondo de marca
    },

    // Colores de borde
    border: {
      default: '#DFE1E6',
      light: '#EBECF0',
      dark: '#C1C7D0',
      focus: '#4C9AFF',
      error: '#DE350B',
      success: '#36B37E',
    },

    // Colores especiales para dashboard médico
    medical: {
      appointment: '#2196F3',
      patient: '#36B37E',
      treatment: '#6554C0',
      billing: '#FFAB00',
      emergency: '#DE350B',
    },
  },

  // ========================================
  // TIPOGRAFÍA
  // ========================================
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      monospace: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    },

    fontSize: {
      xs: '11px',    // Extra small
      sm: '12px',    // Small
      base: '14px',  // Base (por defecto)
      md: '16px',    // Medium
      lg: '18px',    // Large
      xl: '20px',    // Extra large
      '2xl': '24px', // 2X large
      '3xl': '29px', // 3X large (títulos)
      '4xl': '35px', // 4X large (heros)
      '5xl': '42px', // 5X large
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },

    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.02em',
    },
  },

  // ========================================
  // ESPACIADOS (sistema de 8px)
  // ========================================
  spacing: {
    0: '0',
    1: '2px',    // 0.125rem
    2: '4px',    // 0.25rem
    3: '8px',    // 0.5rem (base)
    4: '12px',   // 0.75rem
    5: '16px',   // 1rem
    6: '20px',   // 1.25rem
    7: '24px',   // 1.5rem
    8: '32px',   // 2rem
    9: '40px',   // 2.5rem
    10: '48px',  // 3rem
    12: '64px',  // 4rem
    16: '96px',  // 6rem
    20: '128px', // 8rem
    24: '160px', // 10rem
  },

  // ========================================
  // SOMBRAS (elevaciones)
  // ========================================
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(9, 30, 66, 0.12)',
    base: '0 1px 3px rgba(9, 30, 66, 0.12), 0 1px 2px rgba(9, 30, 66, 0.08)',
    md: '0 4px 6px rgba(9, 30, 66, 0.12), 0 2px 4px rgba(9, 30, 66, 0.08)',
    lg: '0 8px 12px rgba(9, 30, 66, 0.15), 0 4px 6px rgba(9, 30, 66, 0.10)',
    xl: '0 16px 24px rgba(9, 30, 66, 0.18), 0 8px 12px rgba(9, 30, 66, 0.12)',
    '2xl': '0 24px 36px rgba(9, 30, 66, 0.20), 0 12px 18px rgba(9, 30, 66, 0.15)',
    inner: 'inset 0 2px 4px rgba(9, 30, 66, 0.08)',
    focus: '0 0 0 2px #FFFFFF, 0 0 0 4px #4C9AFF',
    focusError: '0 0 0 2px #FFFFFF, 0 0 0 4px #FF8F73',
    overlay: '0 20px 32px rgba(9, 30, 66, 0.25), 0 8px 16px rgba(9, 30, 66, 0.18)',
  },

  // ========================================
  // BORDES
  // ========================================
  borders: {
    width: {
      none: '0',
      thin: '1px',
      medium: '2px',
      thick: '4px',
    },
    radius: {
      none: '0',
      sm: '3px',
      base: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
      '2xl': '16px',
      full: '9999px',
    },
  },

  // ========================================
  // BREAKPOINTS (responsive design)
  // ========================================
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1440px',
    '3xl': '1920px',
  },

  // ========================================
  // TRANSICIONES
  // ========================================
  transitions: {
    duration: {
      fast: '100ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },

  // ========================================
  // Z-INDEX (capas de profundidad)
  // ========================================
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // ========================================
  // OPACIDADES
  // ========================================
  opacity: {
    disabled: 0.38,
    hover: 0.08,
    active: 0.12,
    selected: 0.16,
    focus: 0.24,
  },
};

export default theme;
