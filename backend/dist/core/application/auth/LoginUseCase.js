"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const auth_errors_1 = require("../../domain/user/auth.errors");
/**
 * LoginUseCase - Authenticate user and return user data for token generation
 */
class LoginUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email, password) {
        // Find user by email
        const user = await this.userRepository.findByEmail(email.toLowerCase());
        if (!user) {
            throw new auth_errors_1.InvalidCredentialsError();
        }
        // Check if user is active
        if (!user.getIsActive()) {
            throw new auth_errors_1.InvalidCredentialsError();
        }
        // Verify password
        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
            throw new auth_errors_1.InvalidCredentialsError();
        }
        // Record login
        user.recordLogin();
        await this.userRepository.update(user);
        return user;
    }
}
exports.LoginUseCase = LoginUseCase;
