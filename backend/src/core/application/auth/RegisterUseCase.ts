import { User } from '../../domain/user/user.entity';
import { UserAlreadyExistsError } from '../../domain/user/auth.errors';
import { IUserRepository } from './interfaces/IUserRepository';
import { randomUUID } from 'crypto';
import { UserRole } from '../../domain/user/user-role.enum';

/**
 * RegisterUseCase - Register a new user
 */
export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: UserRole = UserRole.PATIENT
  ): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistsError(email);
    }

    // Create new user with hashed password
    const user = await User.create(
      randomUUID(),
      email,
      password,
      firstName,
      lastName,
      role
    );

    // Save to repository
    await this.userRepository.save(user);

    return user;
  }
}
