"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUseCase = void 0;
/**
 * LogoutUseCase - Handle user logout
 *
 * Note: In JWT-based systems, logout is typically handled client-side
 * by removing the token. This use case can be extended for:
 * - Blacklisting tokens
 * - Recording logout events
 * - Clearing sessions
 */
class LogoutUseCase {
    async execute(userId) {
        // In a JWT system, logout is client-side (remove token from localStorage)
        // This could be extended to:
        // - Add token to blacklist
        // - Record logout event
        // - Clear any server-side sessions
        console.log(`User ${userId} logged out`);
    }
}
exports.LogoutUseCase = LogoutUseCase;
