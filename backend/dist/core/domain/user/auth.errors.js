"use strict";
/**
 * Authentication specific errors
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeakPasswordError = exports.InvalidTokenError = exports.UserNotFoundError = exports.UserAlreadyExistsError = exports.InvalidCredentialsError = exports.AuthError = void 0;
class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthError';
    }
}
exports.AuthError = AuthError;
class InvalidCredentialsError extends AuthError {
    constructor() {
        super('Invalid email or password');
        this.name = 'InvalidCredentialsError';
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
class UserAlreadyExistsError extends AuthError {
    constructor(email) {
        super(`User with email ${email} already exists`);
        this.name = 'UserAlreadyExistsError';
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class UserNotFoundError extends AuthError {
    constructor(id) {
        super(`User with id ${id} not found`);
        this.name = 'UserNotFoundError';
    }
}
exports.UserNotFoundError = UserNotFoundError;
class InvalidTokenError extends AuthError {
    constructor() {
        super('Invalid or expired token');
        this.name = 'InvalidTokenError';
    }
}
exports.InvalidTokenError = InvalidTokenError;
class WeakPasswordError extends AuthError {
    constructor() {
        super('Password must be at least 8 characters with uppercase, lowercase, and numbers');
        this.name = 'WeakPasswordError';
    }
}
exports.WeakPasswordError = WeakPasswordError;
