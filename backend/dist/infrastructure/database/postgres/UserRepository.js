"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_entity_1 = require("../../../core/domain/user/user.entity");
const database_config_1 = require("../../config/database.config");
/**
 * UserRepository - PostgreSQL implementation for User persistence
 */
class UserRepository {
    async save(user) {
        const userData = user.toJSON();
        const query = `
      INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_active, created_at, updated_at, last_login)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
        const values = [
            userData.id,
            userData.email,
            userData.passwordHash,
            userData.firstName,
            userData.lastName,
            userData.role,
            userData.isActive,
            userData.createdAt,
            userData.updatedAt,
            userData.lastLogin,
        ];
        try {
            await database_config_1.pgClient.query(query, values);
        }
        catch (error) {
            if (error.code === '23505') {
                // Unique constraint violation (duplicate email)
                throw new Error(`User with email ${user.getEmail()} already exists`);
            }
            throw error;
        }
    }
    async findById(id) {
        const query = `SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL`;
        const result = await database_config_1.pgClient.query(query, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return this.mapRowToUser(result.rows[0]);
    }
    async findByEmail(email) {
        const query = `SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL`;
        const result = await database_config_1.pgClient.query(query, [email.toLowerCase()]);
        if (result.rows.length === 0) {
            return null;
        }
        return this.mapRowToUser(result.rows[0]);
    }
    async findAll() {
        const query = `SELECT * FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC`;
        const result = await database_config_1.pgClient.query(query);
        return result.rows.map((row) => this.mapRowToUser(row));
    }
    async update(user) {
        const userData = user.toJSON();
        const query = `
      UPDATE users
      SET email = $1, password_hash = $2, first_name = $3, last_name = $4, 
          role = $5, is_active = $6, updated_at = $7, last_login = $8
      WHERE id = $9 AND deleted_at IS NULL
    `;
        const values = [
            userData.email,
            userData.passwordHash,
            userData.firstName,
            userData.lastName,
            userData.role,
            userData.isActive,
            userData.updatedAt,
            userData.lastLogin,
            userData.id,
        ];
        await database_config_1.pgClient.query(query, values);
    }
    async delete(id) {
        const query = `UPDATE users SET deleted_at = NOW() WHERE id = $1`;
        await database_config_1.pgClient.query(query, [id]);
    }
    async existsByEmail(email) {
        const query = `SELECT COUNT(*) FROM users WHERE email = $1 AND deleted_at IS NULL`;
        const result = await database_config_1.pgClient.query(query, [email.toLowerCase()]);
        return parseInt(result.rows[0].count) > 0;
    }
    async existsById(id) {
        const query = `SELECT COUNT(*) FROM users WHERE id = $1 AND deleted_at IS NULL`;
        const result = await database_config_1.pgClient.query(query, [id]);
        return parseInt(result.rows[0].count) > 0;
    }
    /**
     * Map database row to User entity
     */
    mapRowToUser(row) {
        return new user_entity_1.User(row.id, row.email, row.password_hash, row.first_name, row.last_name, row.role, row.is_active, new Date(row.created_at), new Date(row.updated_at), row.last_login ? new Date(row.last_login) : undefined);
    }
}
exports.UserRepository = UserRepository;
