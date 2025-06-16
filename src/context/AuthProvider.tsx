import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { VALIDATION_MESSAGES } from '../constants/auth';
import { loginAPI } from "../api/auth";
import { UserInfo } from '../types/auth';
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await loginAPI(username, password);
      
      if (result?.data?.success && result.data.user && result.data.token) {
        const user = result.data.user;
        const token = result.data.token;

        setIsAuthenticated(true);
        setUser(user);
        setToken(token);

        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));
      } else {
        setError(result?.data?.message || VALIDATION_MESSAGES.INVALID_CREDENTIALS);
      }
    } catch (error) {
      setError(VALIDATION_MESSAGES.CONNECTION_ERROR);
    } finally {
      setIsLoading(false);
    }
  }, []);

const logout = useCallback(async () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
}, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    token,
    isLoading,
    error,
    login,
    logout,
    clearError
  }), [isAuthenticated, user, token, isLoading, error, login, logout, clearError]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
