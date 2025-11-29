import { Request, Response } from 'express';
import { RegisterUseCase } from '../../../core/application/auth/RegisterUseCase';
import { LoginUseCase } from '../../../core/application/auth/LoginUseCase';
import { LogoutUseCase } from '../../../core/application/auth/LogoutUseCase';
import { VerifyTokenUseCase } from '../../../core/application/auth/VerifyTokenUseCase';
import { generateToken } from '../../../infrastructure/auth/JwtService';
import { RegisterDTO, LoginDTO, UserResponseDTO, LoginResponseDTO } from '../dtos/auth';
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
  WeakPasswordError,
  UserNotFoundError,
} from '../../../core/domain/user/auth.errors';
import { UserRole } from '../../../core/domain/user/user-role.enum';

/**
 * AuthController - Handles authentication endpoints
 */
export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase,
    private verifyTokenUseCase: VerifyTokenUseCase
  ) {}

  /**
   * POST /auth/register - Register a new user
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, firstName, lastName, role } = req.body;

      // Validate input
      if (!email || !password || !firstName || !lastName) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      // Call use case
      const user = await this.registerUseCase.execute(
        email,
        password,
        firstName,
        lastName,
        role ? (role as UserRole) : UserRole.PATIENT
      );

      // Create response
      const userDTO = new UserResponseDTO(
        user.getId(),
        user.getEmail(),
        user.getFirstName(),
        user.getLastName(),
        user.getRole(),
        user.getIsActive(),
        user.getCreatedAt(),
        user.getUpdatedAt(),
        user.getLastLogin()
      );

      res.status(201).json({
        message: 'User registered successfully',
        user: userDTO,
      });
    } catch (error: any) {
      if (error instanceof UserAlreadyExistsError) {
        res.status(409).json({ error: error.message });
      } else if (error instanceof WeakPasswordError) {
        res.status(400).json({ error: error.message });
      } else {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  /**
   * POST /auth/login - Login user
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      console.log('🔐 Login attempt:', JSON.stringify(req.body));
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        console.log('❌ Missing email or password');
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      console.log('✅ Input validated, calling LoginUseCase');
      // Call use case
      const user = await this.loginUseCase.execute(email, password);

      console.log('✅ LoginUseCase executed successfully, generating token');
      // Generate JWT token
      const token = generateToken({
        id: user.getId(),
        email: user.getEmail(),
        role: user.getRole(),
      });

      console.log('✅ Token generated, creating response');
      // Create response
      const userDTO = new UserResponseDTO(
        user.getId(),
        user.getEmail(),
        user.getFirstName(),
        user.getLastName(),
        user.getRole(),
        user.getIsActive(),
        user.getCreatedAt(),
        user.getUpdatedAt(),
        user.getLastLogin()
      );

      const response = new LoginResponseDTO(userDTO, token);

      console.log('✅ Response created, sending JSON');
      res.status(200).json(response);
      console.log('✅ Login successful');
    } catch (error: any) {
      console.log('❌ Login error:', error.message, error.stack);
      if (error instanceof InvalidCredentialsError) {
        res.status(401).json({ error: error.message });
      } else {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  /**
   * POST /auth/logout - Logout user (client-side removes token)
   */
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;

      if (!userId) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }

      // Call use case
      await this.logoutUseCase.execute(userId);

      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error: any) {
      console.error('Logout error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * GET /auth/me - Get current user from token (verify token)
   */
  async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;

      if (!userId) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }

      // Call use case
      const user = await this.verifyTokenUseCase.execute(userId);

      // Create response
      const userDTO = new UserResponseDTO(
        user.getId(),
        user.getEmail(),
        user.getFirstName(),
        user.getLastName(),
        user.getRole(),
        user.getIsActive(),
        user.getCreatedAt(),
        user.getUpdatedAt(),
        user.getLastLogin()
      );

      res.status(200).json(userDTO);
    } catch (error: any) {
      if (error instanceof UserNotFoundError) {
        res.status(404).json({ error: error.message });
      } else {
        console.error('Get current user error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
