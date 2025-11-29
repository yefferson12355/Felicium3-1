"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDTO = void 0;
/**
 * LoginDTO - Input for user login
 */
class LoginDTO {
    constructor(email, password) {
        this.email = email.toLowerCase();
        this.password = password;
    }
}
exports.LoginDTO = LoginDTO;
