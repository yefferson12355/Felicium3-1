import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth/authService';

// Define types
interface User {
  id: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: any) => Promise<any>;
  logout: () => void;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getProfile();
          // userData ya es UserResponseDTO directo
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          authService.logout();
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (credentials: any) => {
    try {
      console.log('🔐 Attempting login with:', credentials);
      const response = await authService.login(credentials);
      console.log('✅ Login response received:', response);
      
      // response ya es LoginResponseDTO { user, token, expiresIn }
      const { token, user: userData } = response;
      console.log('✅ Extracted token and userData:', { 
        token: token?.substring(0, 20) + '...', 
        userData 
      });

      // Store token and user data
      authService.setToken(token);
      setUser(userData);
      setIsAuthenticated(true);

      console.log('✅ Login successful, user stored in context');
      return { success: true, user: userData };
    } catch (error: any) {
      console.error('❌ Login failed with error:', error);
      console.error('Error response:', error.response?.data);
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      setUser(response.data);
      return { success: true, user: response.data };
    } catch (error) {
      console.error('Failed to update profile:', error);
      return { success: false, error: error.response?.data?.message || 'Failed to update profile' };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;