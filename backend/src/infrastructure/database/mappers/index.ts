/**
 * Database Mappers - Central Export
 * 
 * Los mappers de infraestructura convierten entre:
 * - Filas de Base de Datos (snake_case) ↔ Entidades de Dominio (camelCase)
 * 
 * IMPORTANTE: Estos mappers son diferentes a los HTTP mappers:
 * - DB Mappers: row (DB) ↔ Entity (Domain)
 * - HTTP Mappers: Entity (Domain) ↔ DTO (Response)
 */

export * from './PatientDbMapper';
export * from './UserDbMapper';
export * from './AppointmentDbMapper';
