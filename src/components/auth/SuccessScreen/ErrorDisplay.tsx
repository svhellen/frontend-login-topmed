import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center gap-2 text-red-800">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm font-medium">Erro</span>
      </div>
      <p className="text-red-700 text-sm mt-1">{error}</p>
    </div>
  );
};
