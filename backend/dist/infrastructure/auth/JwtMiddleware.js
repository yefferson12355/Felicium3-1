"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const JwtService_1 = require("./JwtService");
/**
 * JWT Middleware - Verifica el token JWT en el header Authorization
 *
 * Uso: router.get('/protected', verifyToken, controller.method)
 */
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log('❌ No authorization header provided');
            res.status(401).json({ error: 'No token provided' });
            return;
        }
        // Extract token from "Bearer <token>"
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            console.log('❌ Invalid authorization header format');
            res.status(401).json({ error: 'Invalid token format' });
            return;
        }
        const token = parts[1];
        // Verify token
        const decoded = (0, JwtService_1.verifyToken)(token);
        // Add user info to request
        req.user = decoded;
        console.log('✅ Token verified for user:', decoded.id);
        next();
    }
    catch (error) {
        console.log('❌ Token verification failed:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
exports.verifyToken = verifyToken;
exports.default = exports.verifyToken;
