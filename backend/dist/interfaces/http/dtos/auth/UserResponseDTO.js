"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDTO = void 0;
/**
 * UserResponseDTO - User data for response (without password)
 */
class UserResponseDTO {
    constructor(id, email, firstName, lastName, role, isActive, createdAt, updatedAt, lastLogin) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${firstName} ${lastName}`;
        this.role = role;
        this.isActive = isActive;
        this.createdAt = createdAt.toISOString();
        this.updatedAt = updatedAt.toISOString();
        this.lastLogin = lastLogin?.toISOString();
    }
}
exports.UserResponseDTO = UserResponseDTO;
