"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
/**
 * Create Auth routes
 */
const createAuthRoutes = (authController) => {
    const router = (0, express_1.Router)();
    // Middleware para loguear requests a auth
    router.use((req, res, next) => {
        console.log(`[AUTH] ${req.method} ${req.path}`);
        next();
    });
    /**
     * POST /auth/register
     * Register a new user
     */
    router.post('/register', (req, res) => {
        console.log('[AUTH-REGISTER] Handling register request');
        authController.register(req, res);
    });
    /**
     * POST /auth/login
     * Login with email and password
     */
    router.post('/login', (req, res) => {
        console.log('[AUTH-LOGIN] Handling login request');
        authController.login(req, res);
    });
    /**
     * POST /auth/logout
     * Logout (requires authentication)
     */
    router.post('/logout', auth_middleware_1.verifyToken, (req, res) => authController.logout(req, res));
    /**
     * GET /auth/me
     * Get current user from token (requires authentication)
     */
    router.get('/me', auth_middleware_1.verifyToken, (req, res) => authController.getCurrentUser(req, res));
    return router;
};
exports.createAuthRoutes = createAuthRoutes;
