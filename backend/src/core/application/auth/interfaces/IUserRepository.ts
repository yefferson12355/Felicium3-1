import { User } from '../../../domain/user/user.entity';

/**
 * IUserRepository - Contract for user persistence operations
 */
export interface IUserRepository {
  /**
   * Save a new user
   */
  save(user: User): Promise<void>;

  /**
   * Find user by ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Find user by email
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Find all users
   */
  findAll(): Promise<User[]>;

  /**
   * Update an existing user
   */
  update(user: User): Promise<void>;

  /**
   * Delete user by ID
   */
  delete(id: string): Promise<void>;

  /**
   * Check if user exists by email
   */
  existsByEmail(email: string): Promise<boolean>;

  /**
   * Check if user exists by ID
   */
  existsById(id: string): Promise<boolean>;
}
