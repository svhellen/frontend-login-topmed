import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ProtectedResponseDTO } from '../../../api/auth';
import { UserDataCard} from './UserDataCard';
import { TimeDataCard } from './TimeDataCard';

interface SuccessDisplayProps {
  protectedData: ProtectedResponseDTO | null;
  onClear: () => void;
}

export const SuccessDisplay: React.FC<SuccessDisplayProps> = ({ protectedData, onClear }) => {
  if (!protectedData) return null;

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <span className="font-medium">Endpoint Acessado com Sucesso!</span>
        </div>
        <button
          onClick={onClear}
          className="text-green-600 hover:text-green-800 text-xs"
        >
          Limpar
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="bg-white p-3 rounded border">
          <p className="text-sm text-green-800 font-medium mb-2">Mensagem do Servidor:</p>
          <p className="text-sm text-gray-700">{protectedData.message}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <UserDataCard 
            userId={protectedData.userId} 
            username={protectedData.username} 
          />
          <TimeDataCard 
            accessTime={protectedData.accessTime} 
            serverTime={protectedData.serverTime} 
          />
        </div>
      </div>
    </div>
  );
};
