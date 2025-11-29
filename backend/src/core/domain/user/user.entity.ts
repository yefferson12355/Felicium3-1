import * as bcrypt from 'bcryptjs';
import { UserRole } from './user-role.enum';
import { WeakPasswordError } from './auth.errors';

/**
 * User Entity - Represents a system user (Dentist, Receptionist, Admin, Patient)
 * Handles password hashing and validation
 */
export class User {
  private id: string;
  private email: string;
  private passwordHash: string;
  private firstName: string;
  private lastName: string;
  private role: UserRole;
  private isActive: boolean;
  private createdAt: Date;
  private updatedAt: Date;
  private lastLogin?: Date;

  constructor(
    id: string,
    email: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    isActive: boolean = true,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    lastLogin?: Date
  ) {
    this.id = id;
    this.email = email.toLowerCase();
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastLogin = lastLogin;
  }

  /**
   * Create a new user with password hashing
   */
  static async create(
    id: string,
    email: string,
    plainPassword: string,
    firstName: string,
    lastName: string,
    role: UserRole
  ): Promise<User> {
    // Validate password strength
    User.validatePassword(plainPassword);

    // Hash password
    const passwordHash = await bcrypt.hash(plainPassword, 10);

    return new User(
      id,
      email,
      passwordHash,
      firstName,
      lastName,
      role,
      true,
      new Date(),
      new Date()
    );
  }

  /**
   * Verify password against hash
   */
  async verifyPassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.passwordHash);
  }

  /**
   * Validate password strength
   */
  private static validatePassword(password: string): void {
    if (password.length < 8) {
      throw new WeakPasswordError();
    }
    if (!/[A-Z]/.test(password)) {
      throw new WeakPasswordError();
    }
    if (!/[a-z]/.test(password)) {
      throw new WeakPasswordError();
    }
    if (!/[0-9]/.test(password)) {
      throw new WeakPasswordError();
    }
  }

  /**
   * Update last login timestamp
   */
  recordLogin(): void {
    this.lastLogin = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Deactivate user account
   */
  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  /**
   * Activate user account
   */
  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: UserRole): boolean {
    return this.role === role;
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  /**
   * Check if user is dentist
   */
  isDentist(): boolean {
    return this.role === UserRole.DENTIST;
  }

  /**
   * Check if user is receptionist
   */
  isReceptionist(): boolean {
    return this.role === UserRole.RECEPTIONIST;
  }

  /**
   * Check if user is patient
   */
  isPatient(): boolean {
    return this.role === UserRole.PATIENT;
  }

  /**
   * Get user full name
   */
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getRole(): UserRole {
    return this.role;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getLastLogin(): Date | undefined {
    return this.lastLogin;
  }

  /**
   * Convert to plain object for storage/serialization
   */
  toJSON(): any {
    return {
      id: this.id,
      email: this.email,
      passwordHash: this.passwordHash,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastLogin: this.lastLogin,
    };
  }

  /**
   * Create User from plain object (from database)
   */
  static fromJSON(data: any): User {
    return new User(
      data.id,
      data.email,
      data.passwordHash,
      data.firstName,
      data.lastName,
      data.role,
      data.isActive,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.lastLogin ? new Date(data.lastLogin) : undefined
    );
  }
}
