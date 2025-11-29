"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const user_role_enum_1 = require("./user-role.enum");
const auth_errors_1 = require("./auth.errors");
/**
 * User Entity - Represents a system user (Dentist, Receptionist, Admin, Patient)
 * Handles password hashing and validation
 */
class User {
    constructor(id, email, passwordHash, firstName, lastName, role, isActive = true, createdAt = new Date(), updatedAt = new Date(), lastLogin) {
        this.id = id;
        this.email = email.toLowerCase();
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.lastLogin = lastLogin;
    }
    /**
     * Create a new user with password hashing
     */
    static async create(id, email, plainPassword, firstName, lastName, role) {
        // Validate password strength
        User.validatePassword(plainPassword);
        // Hash password
        const passwordHash = await bcrypt.hash(plainPassword, 10);
        return new User(id, email, passwordHash, firstName, lastName, role, true, new Date(), new Date());
    }
    /**
     * Verify password against hash
     */
    async verifyPassword(plainPassword) {
        return bcrypt.compare(plainPassword, this.passwordHash);
    }
    /**
     * Validate password strength
     */
    static validatePassword(password) {
        if (password.length < 8) {
            throw new auth_errors_1.WeakPasswordError();
        }
        if (!/[A-Z]/.test(password)) {
            throw new auth_errors_1.WeakPasswordError();
        }
        if (!/[a-z]/.test(password)) {
            throw new auth_errors_1.WeakPasswordError();
        }
        if (!/[0-9]/.test(password)) {
            throw new auth_errors_1.WeakPasswordError();
        }
    }
    /**
     * Update last login timestamp
     */
    recordLogin() {
        this.lastLogin = new Date();
        this.updatedAt = new Date();
    }
    /**
     * Deactivate user account
     */
    deactivate() {
        this.isActive = false;
        this.updatedAt = new Date();
    }
    /**
     * Activate user account
     */
    activate() {
        this.isActive = true;
        this.updatedAt = new Date();
    }
    /**
     * Check if user has specific role
     */
    hasRole(role) {
        return this.role === role;
    }
    /**
     * Check if user is admin
     */
    isAdmin() {
        return this.role === user_role_enum_1.UserRole.ADMIN;
    }
    /**
     * Check if user is dentist
     */
    isDentist() {
        return this.role === user_role_enum_1.UserRole.DENTIST;
    }
    /**
     * Check if user is receptionist
     */
    isReceptionist() {
        return this.role === user_role_enum_1.UserRole.RECEPTIONIST;
    }
    /**
     * Check if user is patient
     */
    isPatient() {
        return this.role === user_role_enum_1.UserRole.PATIENT;
    }
    /**
     * Get user full name
     */
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    // Getters
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getPasswordHash() {
        return this.passwordHash;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getRole() {
        return this.role;
    }
    getIsActive() {
        return this.isActive;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getLastLogin() {
        return this.lastLogin;
    }
    /**
     * Convert to plain object for storage/serialization
     */
    toJSON() {
        return {
            id: this.id,
            email: this.email,
            passwordHash: this.passwordHash,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            lastLogin: this.lastLogin,
        };
    }
    /**
     * Create User from plain object (from database)
     */
    static fromJSON(data) {
        return new User(data.id, data.email, data.passwordHash, data.firstName, data.lastName, data.role, data.isActive, new Date(data.createdAt), new Date(data.updatedAt), data.lastLogin ? new Date(data.lastLogin) : undefined);
    }
}
exports.User = User;
