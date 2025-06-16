import { useAuth } from "../hooks/useAuth";
import LoginForm from "./auth/LoginForm";
import SuccessScreen from "./auth/SuccessScreen";

const LoginSystem: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <SuccessScreen /> : <LoginForm />;
};

export default LoginSystem;
