"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyTokenUseCase = void 0;
const auth_errors_1 = require("../../domain/user/auth.errors");
/**
 * VerifyTokenUseCase - Verify JWT token and return user data
 * Used to validate that a token belongs to an active user
 */
class VerifyTokenUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId) {
        // Find user by ID
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new auth_errors_1.UserNotFoundError(userId);
        }
        // Check if user is active
        if (!user.getIsActive()) {
            throw new auth_errors_1.UserNotFoundError(userId);
        }
        return user;
    }
}
exports.VerifyTokenUseCase = VerifyTokenUseCase;
