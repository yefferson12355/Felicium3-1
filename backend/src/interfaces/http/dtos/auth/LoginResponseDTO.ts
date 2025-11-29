import { UserResponseDTO } from './UserResponseDTO';

/**
 * LoginResponseDTO - Response after successful login with JWT token
 */
export class LoginResponseDTO {
  user: UserResponseDTO;
  token: string;
  expiresIn: number; // seconds

  constructor(user: UserResponseDTO, token: string, expiresIn: number = 86400) {
    this.user = user;
    this.token = token;
    this.expiresIn = expiresIn;
  }
}
