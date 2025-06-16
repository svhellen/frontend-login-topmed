import React from 'react';
import { Shield } from 'lucide-react';

interface ProtectedTestHeaderProps {
  showProtectedTest: boolean;
  onToggle: () => void;
}

export const ProtectedTestHeader: React.FC<ProtectedTestHeaderProps> = ({ 
  showProtectedTest, 
  onToggle 
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Shield className="h-5 w-5 text-blue-600" />
        Teste de Endpoint Protegido
      </h3>
      <button
        onClick={onToggle}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        {showProtectedTest ? 'Ocultar' : 'Mostrar'}
      </button>
    </div>
  );
};
