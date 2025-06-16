import { Eye, EyeOff, Lock, User } from "lucide-react";
import ErrorMessage from "../ui/ErrorMessage";
import LoadingSpinner from "../ui/LoadingSpinner";
import TestCredentialsInfo from "./TestCredentialsInfo";
import InputField from "../ui/InputField";
import { useCallback, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useLoginForm } from "../../hooks/useLoginForm";

const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const {
    credentials,
    showPassword,
    formErrors,
    validateForm,
    handleInputChange,
    togglePasswordVisibility,
    setFormErrors
  } = useLoginForm();

  const handleSubmit = useCallback(async () => {
    if (error) clearError();

    const errors = validateForm(credentials);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    await login(credentials.username, credentials.password);
  }, [credentials, validateForm, setFormErrors, login, error, clearError]);

  const passwordToggleButton = useMemo(() => (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
      disabled={isLoading}
      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
    >
      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </button>
  ), [showPassword, togglePasswordVisibility, isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sistema de Login</h1>
          <p className="text-gray-600">Entre com suas credenciais</p>
        </div>

        <div className="space-y-6">
          <InputField
            label="Usuário"
            type="text"
            value={credentials.username}
            onChange={(value) => handleInputChange('username', value)}
            placeholder="Digite seu usuário"
            icon={<User className="h-5 w-5" />}
            disabled={isLoading}
            error={formErrors.username}
          />

          <InputField
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            value={credentials.password}
            onChange={(value) => handleInputChange('password', value)}
            placeholder="Digite sua senha"
            icon={<Lock className="h-5 w-5" />}
            disabled={isLoading}
            error={formErrors.password}
            rightIcon={passwordToggleButton}
          />

          {error && <ErrorMessage message={error} />}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner />
                <span>Autenticando...</span>
              </div>
            ) : (
              'Entrar'
            )}
          </button>
        </div>

        <TestCredentialsInfo />
      </div>
    </div>
  );
};

export default LoginForm;
