import { Request, Response, NextFunction } from 'express';
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
  UnauthorizedError,
  ValidationError
} from '../../../shared/errors';
import { UserRole } from '../../../core/domain/user/user-role.enum';

/**
 * AuthController - Handles authentication endpoints
 * 
 * Todos los métodos son async y delegan el manejo de errores al globalErrorHandler.
 * No se usa try/catch interno - los errores se propagan al middleware.
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
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password, firstName, lastName, role } = req.body;

    // Validate input - lanzar error si faltan campos
    if (!email || !password || !firstName || !lastName) {
      throw new ValidationError('Campos requeridos faltantes', {
        email: !email ? ['El email es requerido'] : [],
        password: !password ? ['La contraseña es requerida'] : [],
        firstName: !firstName ? ['El nombre es requerido'] : [],
        lastName: !lastName ? ['El apellido es requerido'] : [],
      });
    }

    // Call use case (puede lanzar UserAlreadyExistsError o WeakPasswordError)
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
      success: true,
      message: 'Usuario registrado exitosamente',
      data: { user: userDTO },
    });
  }

  /**
   * POST /auth/login - Login user
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      throw new ValidationError('Email y contraseña son requeridos', {
        email: !email ? ['El email es requerido'] : [],
        password: !password ? ['La contraseña es requerida'] : [],
      });
    }

    // Call use case (puede lanzar InvalidCredentialsError)
    const user = await this.loginUseCase.execute(email, password);

    // Generate JWT token
    const token = generateToken({
      id: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
    });

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

    res.status(200).json({
      success: true,
      data: response,
    });
  }

  /**
   * POST /auth/logout - Logout user (client-side removes token)
   */
  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = (req as any).user?.id;

    if (!userId) {
      throw new UnauthorizedError('No autenticado');
    }

    // Call use case
    await this.logoutUseCase.execute(userId);

    res.status(200).json({
      success: true,
      message: 'Sesión cerrada exitosamente',
    });
  }

  /**
   * GET /auth/me - Get current user from token (verify token)
   */
  async getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = (req as any).user?.id;

    if (!userId) {
      throw new UnauthorizedError('No autenticado');
    }

    // Call use case (puede lanzar UserNotFoundError)
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

    res.status(200).json({
      success: true,
      data: userDTO,
    });
  }
}
