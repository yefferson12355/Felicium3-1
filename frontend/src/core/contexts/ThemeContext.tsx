/**
 * ThemeContext - Provee acceso global al tema de la aplicaci\u00f3n
 * 
 * Permite acceder al theme desde cualquier componente sin
 * necesidad de importarlo directamente.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import theme from '../styles/theme';
import { injectGlobalStyles } from '../styles/globalStyles';

const ThemeContext = createContext();

/**
 * Hook para acceder al theme
 * @returns {{ theme, isDarkMode, toggleDarkMode }}
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

/**
 * ThemeProvider - Envuelve la aplicaci\u00f3n para proveer el theme
 */
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Inyectar estilos globales al montar
  useEffect(() => {
    injectGlobalStyles();
  }, []);

  // Detectar preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    theme,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
