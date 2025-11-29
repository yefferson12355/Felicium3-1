import { User } from '../../domain/user/user.entity';
import { InvalidCredentialsError, UserNotFoundError } from '../../domain/user/auth.errors';
import { IUserRepository } from './interfaces/IUserRepository';

/**
 * LoginUseCase - Authenticate user and return user data for token generation
 */
export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<User> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email.toLowerCase());
    if (!user) {
      throw new InvalidCredentialsError();
    }

    // Check if user is active
    if (!user.getIsActive()) {
      throw new InvalidCredentialsError();
    }

    // Verify password
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    // Record login
    user.recordLogin();
    await this.userRepository.update(user);

    return user;
  }
}
