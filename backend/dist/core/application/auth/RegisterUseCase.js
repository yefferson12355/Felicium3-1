"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const user_entity_1 = require("../../domain/user/user.entity");
const auth_errors_1 = require("../../domain/user/auth.errors");
const crypto_1 = require("crypto");
const user_role_enum_1 = require("../../domain/user/user-role.enum");
/**
 * RegisterUseCase - Register a new user
 */
class RegisterUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email, password, firstName, lastName, role = user_role_enum_1.UserRole.PATIENT) {
        // Check if user already exists
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new auth_errors_1.UserAlreadyExistsError(email);
        }
        // Create new user with hashed password
        const user = await user_entity_1.User.create((0, crypto_1.randomUUID)(), email, password, firstName, lastName, role);
        // Save to repository
        await this.userRepository.save(user);
        return user;
    }
}
exports.RegisterUseCase = RegisterUseCase;
