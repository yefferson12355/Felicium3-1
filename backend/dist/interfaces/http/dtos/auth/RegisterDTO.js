"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDTO = void 0;
/**
 * RegisterDTO - Input for user registration
 */
class RegisterDTO {
    constructor(email, password, firstName, lastName, role) {
        this.email = email.toLowerCase();
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role || 'PATIENT';
    }
}
exports.RegisterDTO = RegisterDTO;
