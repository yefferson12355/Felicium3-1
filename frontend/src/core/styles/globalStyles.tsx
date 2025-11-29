/**
 * Estilos Globales para la Aplicación
 * 
 * Resetea estilos por defecto del navegador y aplica
 * estilos base consistentes en toda la aplicación.
 */

import theme from './theme';

export const globalStyles = `
  /* ========================================
     RESET Y NORMALIZE
     ======================================== */
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* ========================================
     HTML Y BODY BASE
     ======================================== */
  
  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.normal};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.default};
    min-height: 100vh;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ========================================
     TIPOGRAFÍA
     ======================================== */
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.semibold};
    line-height: ${theme.typography.lineHeight.tight};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing[4]};
  }

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
  }

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
  }

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
  }

  h4 {
    font-size: ${theme.typography.fontSize.xl};
  }

  h5 {
    font-size: ${theme.typography.fontSize.lg};
  }

  h6 {
    font-size: ${theme.typography.fontSize.base};
  }

  p {
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.text.primary};
  }

  a {
    color: ${theme.colors.text.link};
    text-decoration: none;
    transition: color ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut};
  }

  a:hover {
    color: ${theme.colors.text.linkHover};
    text-decoration: underline;
  }

  /* ========================================
     LISTAS
     ======================================== */
  
  ul, ol {
    list-style-position: inside;
    margin-bottom: ${theme.spacing[4]};
  }

  li {
    margin-bottom: ${theme.spacing[2]};
  }

  /* ========================================
     FORMULARIOS
     ======================================== */
  
  input,
  textarea,
  select,
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    box-shadow: ${theme.shadows.focus};
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: ${theme.opacity.disabled};
  }

  /* ========================================
     TABLAS
     ======================================== */
  
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    text-align: left;
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
  }

  /* ========================================
     IMÁGENES Y MEDIA
     ======================================== */
  
  img,
  video,
  canvas,
  svg {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* ========================================
     SCROLLBAR PERSONALIZADO
     ======================================== */
  
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.neutral[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.neutral[400]};
    border-radius: ${theme.borders.radius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.neutral[500]};
  }

  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.neutral[400]} ${theme.colors.neutral[100]};
  }

  /* ========================================
     UTILIDADES
     ======================================== */
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing[5]};
  }

  .container-fluid {
    width: 100%;
    padding: 0 ${theme.spacing[5]};
  }

  /* ========================================
     ANIMACIONES
     ======================================== */
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInFromBottom {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* ========================================
     RESPONSIVE HELPERS
     ======================================== */
  
  @media (max-width: ${theme.breakpoints.sm}) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    .hide-mobile {
      display: none !important;
    }
  }

  @media (min-width: ${theme.breakpoints.md}) {
    .hide-desktop {
      display: none !important;
    }
  }
`;

/**
 * Inyectar estilos globales en el documento
 */
export const injectGlobalStyles = () => {
  const styleId = 'felicium-global-styles';
  
  // Evitar inyección duplicada
  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = globalStyles;
  document.head.appendChild(style);
};

export default globalStyles;
