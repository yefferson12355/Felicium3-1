/**
 * Jest Setup File
 * 
 * Se ejecuta antes de todos los tests.
 * Configura el entorno de pruebas global.
 */

import 'reflect-metadata';

// Configurar variables de entorno para tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-for-testing';

// Silenciar logs durante tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  // Mantener error para debugging
  error: console.error,
};

// Timeout global para tests async
jest.setTimeout(10000);
