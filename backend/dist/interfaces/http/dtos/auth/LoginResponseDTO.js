"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponseDTO = void 0;
/**
 * LoginResponseDTO - Response after successful login with JWT token
 */
class LoginResponseDTO {
    constructor(user, token, expiresIn = 86400) {
        this.user = user;
        this.token = token;
        this.expiresIn = expiresIn;
    }
}
exports.LoginResponseDTO = LoginResponseDTO;
