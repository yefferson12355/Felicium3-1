/**
 * Utilidades de Estilos - Helpers y mixins reutilizables
 * 
 * Proporciona funciones helper para crear estilos consistentes
 * en toda la aplicación sin duplicar código.
 */

import theme from './theme';

/**
 * Flexbox Utilities
 */
export const flex = {
  // Centrado perfecto (horizontal y vertical)
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Centrado vertical
  centerVertical: {
    display: 'flex',
    alignItems: 'center',
  },

  // Centrado horizontal
  centerHorizontal: {
    display: 'flex',
    justifyContent: 'center',
  },

  // Flex con espacio entre elementos
  between: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Flex con espacio alrededor
  around: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  // Columna centrada
  columnCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Columna
  column: {
    display: 'flex',
    flexDirection: 'column',
  },

  // Wrap
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

/**
 * Cards y contenedores
 */
export const card = {
  // Card base
  base: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borders.radius.lg,
    border: `1px solid ${theme.colors.border.default}`,
    boxShadow: theme.shadows.sm,
    padding: theme.spacing[6],
  },

  // Card con hover
  interactive: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borders.radius.lg,
    border: `1px solid ${theme.colors.border.default}`,
    boxShadow: theme.shadows.sm,
    padding: theme.spacing[6],
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
  },

  // Card elevada
  elevated: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borders.radius.lg,
    border: `1px solid ${theme.colors.border.default}`,
    boxShadow: theme.shadows.md,
    padding: theme.spacing[6],
  },
};

/**
 * Botones base
 */
export const button = {
  base: {
    border: 'none',
    borderRadius: theme.borders.radius.base,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.primary,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    transition: `all ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
    padding: `${theme.spacing[3]} ${theme.spacing[5]}`,
  },

  // Disabled state
  disabled: {
    opacity: theme.opacity.disabled,
    cursor: 'not-allowed',
  },
};

/**
 * Inputs base
 */
export const input = {
  base: {
    width: '100%',
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
    border: `${theme.borders.width.thin} solid ${theme.colors.border.default}`,
    borderRadius: theme.borders.radius.base,
    backgroundColor: theme.colors.background.paper,
    color: theme.colors.text.primary,
    outline: 'none',
    transition: `all ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
  },

  focus: {
    borderColor: theme.colors.border.focus,
    boxShadow: theme.shadows.focus,
  },

  error: {
    borderColor: theme.colors.border.error,
    boxShadow: theme.shadows.focusError,
  },

  disabled: {
    backgroundColor: theme.colors.background.disabled,
    cursor: 'not-allowed',
    color: theme.colors.text.disabled,
  },
};

/**
 * Typography helpers
 */
export const text = {
  // Headings
  h1: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.lineHeight.tight,
    color: theme.colors.text.primary,
    margin: 0,
  },

  h2: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.tight,
    color: theme.colors.text.primary,
    margin: 0,
  },

  h3: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.text.primary,
    margin: 0,
  },

  h4: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.medium,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.text.primary,
    margin: 0,
  },

  // Body text
  body: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.text.primary,
  },

  bodySmall: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.text.secondary,
  },

  // Caption
  caption: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.text.tertiary,
  },

  // Link
  link: {
    color: theme.colors.text.link,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: `color ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
  },
};

/**
 * Truncate text con ellipsis
 */
export const truncate = {
  singleLine: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  multiLine: (lines = 2) => ({
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
};

/**
 * Responsive utilities
 */
export const responsive = {
  // Media queries helper
  mediaQuery: (breakpoint) => `@media (min-width: ${theme.breakpoints[breakpoint]})`,

  // Hide en breakpoints específicos
  hideOn: (breakpoint) => ({
    [`@media (max-width: ${theme.breakpoints[breakpoint]})`]: {
      display: 'none',
    },
  }),

  // Show solo en breakpoints específicos
  showOn: (breakpoint) => ({
    display: 'none',
    [`@media (min-width: ${theme.breakpoints[breakpoint]})`]: {
      display: 'block',
    },
  }),
};

/**
 * Scrollbar personalizado (opcional)
 */
export const scrollbar = {
  thin: {
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.colors.neutral[400]} ${theme.colors.neutral[100]}`,
    
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    
    '&::-webkit-scrollbar-track': {
      background: theme.colors.neutral[100],
    },
    
    '&::-webkit-scrollbar-thumb': {
      background: theme.colors.neutral[400],
      borderRadius: theme.borders.radius.full,
    },
    
    '&::-webkit-scrollbar-thumb:hover': {
      background: theme.colors.neutral[500],
    },
  },
};

/**
 * Overlays y modals
 */
export const overlay = {
  dark: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background.overlay,
    zIndex: theme.zIndex.modalBackdrop,
    ...flex.center,
  },

  light: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: theme.zIndex.modalBackdrop,
    ...flex.center,
  },
};

/**
 * Efectos de hover
 */
export const hover = {
  // Hover con elevación
  lift: {
    transition: `all ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.md,
    },
  },

  // Hover con brillo
  brighten: {
    transition: `filter ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
    '&:hover': {
      filter: 'brightness(1.05)',
    },
  },

  // Hover con opacidad
  opacity: {
    transition: `opacity ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
    '&:hover': {
      opacity: 0.8,
    },
  },
};

/**
 * Focus states
 */
export const focus = {
  default: {
    outline: 'none',
    boxShadow: theme.shadows.focus,
  },

  error: {
    outline: 'none',
    boxShadow: theme.shadows.focusError,
  },
};

/**
 * Grid layouts
 */
export const grid = {
  // Grid básico con gap
  basic: (columns = 3, gap = theme.spacing[5]) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
  }),

  // Grid responsive
  responsive: (gap = theme.spacing[5]) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap,
  }),

  // Grid de cards
  cards: (gap = theme.spacing[5]) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap,
  }),
};

/**
 * Spinner/Loader animation
 */
export const spin = {
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  animation: 'spin 1s linear infinite',
};

/**
 * Fade animations
 */
export const fade = {
  in: {
    '@keyframes fadeIn': {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    animation: `fadeIn ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
  },

  out: {
    '@keyframes fadeOut': {
      '0%': { opacity: 1 },
      '100%': { opacity: 0 },
    },
    animation: `fadeOut ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
  },
};

/**
 * Helper para combinar estilos
 */
export const combineStyles = (...styles) => {
  return Object.assign({}, ...styles);
};

/**
 * Helper para aplicar estilos condicionales
 */
export const conditionalStyle = (condition, trueStyle, falseStyle = {}) => {
  return condition ? trueStyle : falseStyle;
};

/**
 * Exportar todo como objeto por defecto
 */
export default {
  flex,
  card,
  button,
  input,
  text,
  truncate,
  responsive,
  scrollbar,
  overlay,
  hover,
  focus,
  grid,
  spin,
  fade,
  combineStyles,
  conditionalStyle,
};
