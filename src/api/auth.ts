import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../types/auth";
import { toast } from "react-toastify";

// Configuration
const API_CONFIG = {
  baseUrl: "https://localhost:7199/api/",
  endpoints: {
    login: "auth/login",
    protected: "ProtectedEndpoint",
    logout: "auth/logout",
  },
  timeout: 10000
};

// Error response types
interface ValidationError {
  description: string;
}

interface ErrorResponse {
  errors?: ValidationError[] | Record<string, string[]> | string;
  message?: string;
}

const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const loginAPI = async (
  username: string, 
  password: string
): Promise<AxiosResponse<AuthResponse> | undefined> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      API_CONFIG.endpoints.login,
      { username, password }
    );
    return response;
  } catch (error) {
    handleLoginError(error);
    return undefined;
  }
};

const handleLoginError = (error: unknown): void => {
  if (!axios.isAxiosError(error) || !error.response) {
    toast.error("Network error occurred");
    return;
  }

  const errorData = error.response.data as ErrorResponse;
  
  if (Array.isArray(errorData.errors)) {
    errorData.errors.forEach((err: ValidationError) => {
      toast.warning(err.description);
    });
  } else if (typeof errorData.errors === "object" && errorData.errors) {
    Object.values(errorData.errors).forEach((messages) => {
      if (Array.isArray(messages) && messages.length > 0) {
        toast.warning(messages[0]);
      }
    });
  } else if (errorData.message) {
    toast.warning(errorData.message);
  } else if (error.response.status === 401) {
    toast.warning("Invalid credentials");
  } else {
    toast.error(`Login failed: ${error.response.statusText}`);
  }
};

export interface ProtectedResponseDTO {
  message: string;
  userId: string;
  username: string;
  accessTime: string;
  serverTime: string;
}

export const getProtectedDataAPI = async (
  token?: string
): Promise<AxiosResponse<ProtectedResponseDTO>> => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };

    const response = await apiClient.get<ProtectedResponseDTO>(
      API_CONFIG.endpoints.protected,
      config
    );
    
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API Error Response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
        
        const message = error.response.data?.message || error.response.statusText;
        throw new Error(`API Error ${error.response.status}: ${message}`);
      } else if (error.request) {
        console.error('Network Error:', error.request);
        throw new Error('Connection error: Unable to reach the API');
      }
    }
    
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};

export interface LogoutResponseDTO {
  success: boolean;
  message: string;
  timestamp: string | null;
}

export const logoutAPI = async (
  token?: string
): Promise<AxiosResponse<LogoutResponseDTO>> => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };

    const response = await apiClient.post<LogoutResponseDTO>(
      API_CONFIG.endpoints.logout,
      config
    );
    
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API Error Response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
        
        const message = error.response.data?.message || error.response.statusText;
        throw new Error(`API Error ${error.response.status}: ${message}`);
      } else if (error.request) {
        console.error('Network Error:', error.request);
        throw new Error('Connection error: Unable to reach the API');
      }
    }
    
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};

