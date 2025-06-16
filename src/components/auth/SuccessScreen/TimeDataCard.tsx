import React from 'react';
import { Clock } from 'lucide-react';

interface TimeDataCardProps {
  accessTime: string;
  serverTime: string;
}

export const TimeDataCard: React.FC<TimeDataCardProps> = ({ accessTime, serverTime }) => {
  return (
    <div className="bg-white p-3 rounded border">
      <div className="flex items-center gap-2 text-gray-700 mb-1">
        <Clock className="h-3 w-3" />
        <span className="text-xs font-medium">Horários</span>
      </div>
      <p className="text-xs text-gray-600">
        Acesso: {new Date(accessTime).toLocaleString()}
      </p>
      <p className="text-xs text-gray-600">Servidor: {serverTime}</p>
    </div>
  );
};
