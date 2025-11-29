/**
 * Exportar todos los estilos centralizados
 */

export { default as theme } from './theme';
export { default as styleUtils } from './utils';
export { default as globalStyles, injectGlobalStyles } from './globalStyles';

// Exportar utilidades individuales para imports nombrados
export {
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
} from './utils';
