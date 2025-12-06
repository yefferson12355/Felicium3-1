import apiClient from '../api/base';
import type {
  LoginDTO,
  RegisterDTO,
  LoginResponseDTO,
  UserResponseDTO
} from '../../types/dtos';

/**
 * Servicio de Autenticación (Repositorio)
 * 
 * ARQUITECTURA (Como en el video):
 * - Capa de INFRAESTRUCTURA
 * - Maneja tokens, localStorage, llamadas HTTP
 * - Independiente de React/Context
 */

/**
 * Interfaz del Repositorio de Auth
 */
export interface IAuthRepository {
  login(credentials: LoginDTO): Promise<LoginResponseDTO>;
  register(userData: RegisterDTO): Promise<UserResponseDTO>;
  logout(): void;
  getProfile(): Promise<UserResponseDTO>;
  isAuthenticated(): boolean;
  getToken(): string | null;
  setToken(token: string): void;
  removeToken(): void;
}

/**
 * Implementación con Axios + localStorage
 */
class AxiosAuthRepository implements IAuthRepository {
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'user';

  async login(credentials: LoginDTO): Promise<LoginResponseDTO> {
    try {
      console.log('🌐 authRepository.login() called');
      const response = await apiClient.post<LoginResponseDTO>('/auth/login', credentials);
      // El interceptor de base.ts ya extrae data de { success, data }
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  }

  async register(userData: RegisterDTO): Promise<UserResponseDTO> {
    try {
      const response = await apiClient.post<UserResponseDTO>('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('❌ Register failed:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  async getProfile(): Promise<UserResponseDTO> {
    try {
      const response = await apiClient.get<UserResponseDTO>('/auth/me');
      return response.data;
    } catch (error) {
      console.error('❌ Get profile failed:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

/**
 * Instancia Singleton
 */
export const authRepository: IAuthRepository = new AxiosAuthRepository();

/**
 * DEPRECATED: Compatibilidad con código legacy
 * TODO: Migrar AuthContext a usar authRepository directamente
 */
export const authService = {
  login: (credentials: LoginDTO) => authRepository.login(credentials),
  register: (userData: RegisterDTO) => authRepository.register(userData),
  logout: () => authRepository.logout(),
  getProfile: () => authRepository.getProfile(),
  isAuthenticated: () => authRepository.isAuthenticated(),
  getToken: () => authRepository.getToken(),
  setToken: (token: string) => authRepository.setToken(token),
};

export default authService;
