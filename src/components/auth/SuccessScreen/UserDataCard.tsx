import React from 'react';
import { User } from 'lucide-react';

interface UserDataCardProps {
  userId: string | number;
  username: string;
}

export const UserDataCard: React.FC<UserDataCardProps> = ({ userId, username }) => {
  return (
    <div className="bg-white p-3 rounded border">
      <div className="flex items-center gap-2 text-gray-700 mb-1">
        <User className="h-3 w-3" />
        <span className="text-xs font-medium">Dados do Usuário</span>
      </div>
      <p className="text-xs text-gray-600">ID: {userId}</p>
      <p className="text-xs text-gray-600">Username: {username}</p>
    </div>
  );
};
