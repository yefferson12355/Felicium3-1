"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const JwtService_1 = require("../../../infrastructure/auth/JwtService");
const auth_1 = require("../dtos/auth");
const auth_errors_1 = require("../../../core/domain/user/auth.errors");
const user_role_enum_1 = require("../../../core/domain/user/user-role.enum");
/**
 * AuthController - Handles authentication endpoints
 */
class AuthController {
    constructor(registerUseCase, loginUseCase, logoutUseCase, verifyTokenUseCase) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
        this.logoutUseCase = logoutUseCase;
        this.verifyTokenUseCase = verifyTokenUseCase;
    }
    /**
     * POST /auth/register - Register a new user
     */
    async register(req, res) {
        try {
            const { email, password, firstName, lastName, role } = req.body;
            // Validate input
            if (!email || !password || !firstName || !lastName) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }
            // Call use case
            const user = await this.registerUseCase.execute(email, password, firstName, lastName, role ? role : user_role_enum_1.UserRole.PATIENT);
            // Create response
            const userDTO = new auth_1.UserResponseDTO(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole(), user.getIsActive(), user.getCreatedAt(), user.getUpdatedAt(), user.getLastLogin());
            res.status(201).json({
                message: 'User registered successfully',
                user: userDTO,
            });
        }
        catch (error) {
            if (error instanceof auth_errors_1.UserAlreadyExistsError) {
                res.status(409).json({ error: error.message });
            }
            else if (error instanceof auth_errors_1.WeakPasswordError) {
                res.status(400).json({ error: error.message });
            }
            else {
                console.error('Register error:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    /**
     * POST /auth/login - Login user
     */
    async login(req, res) {
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
            const token = (0, JwtService_1.generateToken)({
                id: user.getId(),
                email: user.getEmail(),
                role: user.getRole(),
            });
            console.log('✅ Token generated, creating response');
            // Create response
            const userDTO = new auth_1.UserResponseDTO(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole(), user.getIsActive(), user.getCreatedAt(), user.getUpdatedAt(), user.getLastLogin());
            const response = new auth_1.LoginResponseDTO(userDTO, token);
            console.log('✅ Response created, sending JSON');
            res.status(200).json(response);
            console.log('✅ Login successful');
        }
        catch (error) {
            console.log('❌ Login error:', error.message, error.stack);
            if (error instanceof auth_errors_1.InvalidCredentialsError) {
                res.status(401).json({ error: error.message });
            }
            else {
                console.error('Login error:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    /**
     * POST /auth/logout - Logout user (client-side removes token)
     */
    async logout(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: 'Not authenticated' });
                return;
            }
            // Call use case
            await this.logoutUseCase.execute(userId);
            res.status(200).json({ message: 'Logged out successfully' });
        }
        catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    /**
     * GET /auth/me - Get current user from token (verify token)
     */
    async getCurrentUser(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: 'Not authenticated' });
                return;
            }
            // Call use case
            const user = await this.verifyTokenUseCase.execute(userId);
            // Create response
            const userDTO = new auth_1.UserResponseDTO(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole(), user.getIsActive(), user.getCreatedAt(), user.getUpdatedAt(), user.getLastLogin());
            res.status(200).json(userDTO);
        }
        catch (error) {
            if (error instanceof auth_errors_1.UserNotFoundError) {
                res.status(404).json({ error: error.message });
            }
            else {
                console.error('Get current user error:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
exports.AuthController = AuthController;
