import { useCallback, useState } from "react";
import { VALIDATION_MESSAGES } from "../constants/auth";

interface LoginCredentials {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

export const useLoginForm = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = useCallback((creds: LoginCredentials): FormErrors => {
    const errors: FormErrors = {};

    if (!creds.username.trim()) {
      errors.username = 'Usuário é obrigatório';
    }

    if (!creds.password) {
      errors.password = 'Senha é obrigatória';
    } else if (creds.password.length < 6) {
      errors.password = VALIDATION_MESSAGES.MIN_PASSWORD_LENGTH;
    }

    return errors;
  }, []);

  const handleInputChange = useCallback((field: keyof LoginCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => {
      if (prev[field]) {
        const { [field]: removedError, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const resetForm = useCallback(() => {
    setCredentials({ username: '', password: '' });
    setFormErrors({});
    setShowPassword(false);
  }, []);

  return {
    credentials,
    showPassword,
    formErrors,
    validateForm,
    handleInputChange,
    togglePasswordVisibility,
    resetForm,
    setFormErrors
  };
};
