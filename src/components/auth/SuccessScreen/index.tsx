import React from 'react';
import UserInfoCard from '../UserInfoCard';
import { useAuth } from "../../../hooks/useAuth";
import { SuccessHeader } from '../SuccessScreen/SuccessHeader';
import { LogoutButton } from './LogoutButton';
import ProtectedEndpointTest from './ProtectedEndpointTest';

const SuccessScreen: React.FC = () => {
  const { user, logout, token } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <SuccessHeader />
        <UserInfoCard user={user} />
        <ProtectedEndpointTest token={token} />
        <LogoutButton onLogout={logout} />
      </div>
    </div>
  );
};

export default SuccessScreen;