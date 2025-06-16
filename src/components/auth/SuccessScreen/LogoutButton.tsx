import React from 'react';

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="w-full mt-6 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
    >
      Sair do Sistema
    </button>
  );
};
