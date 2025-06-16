import { TEST_CREDENTIALS } from "../../constants/auth";

const TestCredentialsInfo: React.FC = () => (
  <div className="mt-6 text-center">
    <div className="text-sm text-gray-500 mb-2">Credenciais para teste:</div>
    <div className="text-xs text-gray-400 space-y-1">
      <div>{TEST_CREDENTIALS.user1.username} / {TEST_CREDENTIALS.user1.password}</div>
      <div>{TEST_CREDENTIALS.user2.username} / {TEST_CREDENTIALS.user1.password}</div>
    </div>
  </div>
);

export default TestCredentialsInfo;