/**
 * UserDbMapper
 * 
 * Responsabilidad ÚNICA: Convertir entre filas de PostgreSQL y entidad User
 * 
 * ┌─────────────────┐       ┌─────────────────┐
 * │   DB Row        │ ←───→ │   User          │
 * │  (snake_case)   │       │   (camelCase)   │
 * └─────────────────┘       └─────────────────┘
 */

import { User } from '../../../core/domain/user/user.entity';
import { UserRole } from '../../../core/domain/user/user-role.enum';

/**
 * Interfaz que representa una fila de la tabla 'users'
 */
export interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  last_login: Date | string | null;
  deleted_at?: Date | string | null;
}

/**
 * Interfaz para datos de persistencia (INSERT/UPDATE)
 */
export interface UserPersistenceData {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  last_login: Date | null;
}

export class UserDbMapper {
  /**
   * Convierte una fila de PostgreSQL a entidad User
   * 
   * @param row - Fila de la tabla users
   * @returns User - Entidad de dominio reconstruida
   */
  static toDomain(row: UserRow): User {
    return new User(
      row.id,
      row.email,
      row.password_hash,
      row.first_name,
      row.last_name,
      row.role as UserRole,
      row.is_active,
      this.toDate(row.created_at),
      this.toDate(row.updated_at),
      row.last_login ? this.toDate(row.last_login) : undefined
    );
  }

  /**
   * Convierte múltiples filas a entidades
   * 
   * @param rows - Array de filas de la tabla users
   * @returns Array de entidades User
   */
  static toDomainList(rows: UserRow[]): User[] {
    return rows.map(row => this.toDomain(row));
  }

  /**
   * Convierte una entidad User a datos para persistir en DB
   * Usa el método toJSON() de la entidad que ya existe
   * 
   * @param user - Entidad User
   * @returns Objeto con campos mapeados a snake_case para la DB
   */
  static toPersistence(user: User): UserPersistenceData {
    const userData = user.toJSON();
    return {
      id: userData.id,
      email: userData.email,
      password_hash: userData.passwordHash,
      first_name: userData.firstName,
      last_name: userData.lastName,
      role: userData.role,
      is_active: userData.isActive,
      created_at: new Date(userData.createdAt),
      updated_at: new Date(userData.updatedAt),
      last_login: userData.lastLogin ? new Date(userData.lastLogin) : null,
    };
  }

  /**
   * Extrae los valores para un INSERT ordenados
   * 
   * @param user - Entidad User
   * @returns Array de valores en orden para INSERT
   */
  static toInsertValues(user: User): any[] {
    const data = this.toPersistence(user);
    return [
      data.id,
      data.email,
      data.password_hash,
      data.first_name,
      data.last_name,
      data.role,
      data.is_active,
      data.created_at,
      data.updated_at,
      data.last_login,
    ];
  }

  /**
   * Extrae los valores para un UPDATE ordenados
   * 
   * @param user - Entidad User
   * @returns Array de valores en orden para UPDATE
   */
  static toUpdateValues(user: User): any[] {
    const data = this.toPersistence(user);
    return [
      data.email,
      data.password_hash,
      data.first_name,
      data.last_name,
      data.role,
      data.is_active,
      data.updated_at,
      data.last_login,
      data.id, // WHERE id = $9
    ];
  }

  /**
   * Helper para convertir string/Date a Date
   */
  private static toDate(value: Date | string): Date {
    return value instanceof Date ? value : new Date(value);
  }
}
