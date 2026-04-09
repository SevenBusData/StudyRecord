import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginRequest, RegisterRequest } from '../types';
import type { AuthContextType } from './AuthContextType';
import { AuthContext } from './AuthContextType';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 检查本地存储中的 token 并验证
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // 模拟 API 响应
          const mockUser: User = {
            id: 1,
            username: 'admin',
            email: 'admin@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            bio: '全栈开发工程师',
            nickname: '管理员',
            role: 'ADMIN',
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          };
          setUser(mockUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // 登录
  const login = async (data: LoginRequest): Promise<boolean> => {
    try {
      // 真实 API 调用
      const apiModule = await import('../api');
      const response = await apiModule.authApi.login(data);

      console.log('Login response:', response);

      if (response && response.success && response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);

        // 模拟用户信息，因为后端登录接口没有返回用户信息
        const mockUser: User = {
          id: 1,
          username: data.username,
          email: 'admin@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          bio: '全栈开发工程师',
          nickname: '管理员',
          role: 'ADMIN',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        setUser(mockUser);
        setIsAuthenticated(true);
        return true;
      } else {
        const errorMessage = response?.message || '登录失败';
        console.error('Login failed:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // 注册
  const register = async (_data: RegisterRequest): Promise<boolean> => {
    try {
      // 模拟 API 响应
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  // 登出
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  // 刷新 Token
  const refreshToken = async (): Promise<boolean> => {
    try {
      // 模拟 API 响应
      const mockResponse = {
        token: 'fake-token-12345',
        refreshToken: 'fake-refresh-token-67890',
      };
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('refresh_token', mockResponse.refreshToken);
      return true;
    } catch (error) {
      console.error('Refresh token failed:', error);
      logout();
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
