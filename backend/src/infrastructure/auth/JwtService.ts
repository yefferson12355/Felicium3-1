import * as jwt from 'jsonwebtoken';
import { getConfig } from '../config/app.config'; // Importamos tu configuración para leer el secreto

// Obtenemos la CLAVE SECRETA del .env (la "tinta especial" para firmar)
const config = getConfig();
const SECRET = config.jwtSecret; 

/**
 * Define qué datos guardaremos DENTRO del brazalete (Token).
 * No guardes contraseñas aquí, solo identificación.
 */
export interface UserPayload {
  id: string;
  email: string;
  role: string; // 'ADMIN' | 'DENTIST' | 'RECEPTIONIST' | 'PATIENT'
}

/**
 * MÁQUINA 1: Generar Token (Firmar)
 * Se usa cuando el usuario hace LOGIN exitoso.
 * @param payload Los datos del usuario (ID, Rol)
 * @returns El string del token (el brazalete)
 */
export const generateToken = (payload: UserPayload): string => {
  // Crea un token que expira en 24 horas
  return jwt.sign(payload, SECRET, { expiresIn: '24h' });
};

/**
 * MÁQUINA 2: Verificar Token (Leer)
 * Se usa en el Middleware para ver si el usuario puede pasar.
 * @param token El string del token que envió el usuario
 * @returns Los datos que había dentro (UserPayload)
 */
export const verifyToken = (token: string): UserPayload => {
  try {
    // Intenta desencriptar usando nuestra CLAVE SECRETA.
    // Si el token fue modificado por un hacker o expiró, esto lanza un error.
    return jwt.verify(token, SECRET) as UserPayload;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};