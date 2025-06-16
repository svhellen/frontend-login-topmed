import { UserInfo } from "../../types/auth";

const UserInfoCard: React.FC<{ user: UserInfo }> = ({ user }) => (
  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
    <h3 className="font-semibold text-gray-800 mb-2">Informações do Usuário:</h3>
    <div className="space-y-1">
      <p className="text-sm text-gray-600"><strong>Nome:</strong> {user.name}</p>
      <p className="text-sm text-gray-600"><strong>Usuário:</strong> {user.username}</p>
      <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
      <p className="text-sm text-gray-600"><strong>ID:</strong> {user.id}</p>
    </div>
  </div>
);

export default UserInfoCard;
