import { User } from '../../domain/user/user.entity';
import { UserNotFoundError } from '../../domain/user/auth.errors';
import { IUserRepository } from './interfaces/IUserRepository';

/**
 * VerifyTokenUseCase - Verify JWT token and return user data
 * Used to validate that a token belongs to an active user
 */
export class VerifyTokenUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<User> {
    // Find user by ID
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    // Check if user is active
    if (!user.getIsActive()) {
      throw new UserNotFoundError(userId);
    }

    return user;
  }
}
