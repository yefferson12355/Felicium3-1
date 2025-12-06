module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/tests/**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        target: 'ES2020',
        module: 'commonjs',
        lib: ['ES2020'],
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        types: ['node', 'jest'],
      },
    }],
  },
  collectCoverageFrom: [
    'src/core/domain/**/user.entity.ts',
    'src/core/domain/**/appointment.entity.ts',
    'src/core/domain/**/time-slot.entity.ts',
    'src/shared/errors/**/*.ts',
    'src/interfaces/http/middlewares/**/*.ts',
    'src/interfaces/http/dtos/**/*.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!(uuid)/)'],
  modulePaths: ['<rootDir>'],
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};
