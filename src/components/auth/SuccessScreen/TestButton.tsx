import React from 'react';
import { Shield, Loader } from 'lucide-react';

interface TestButtonProps {
  onTest: () => void;
  loading: boolean;
}

export const TestButton: React.FC<TestButtonProps> = ({ onTest, loading }) => {
  return (
    <button
      onClick={onTest}
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
    >
      {loading ? (
        <>
          <Loader className="h-4 w-4 animate-spin" />
          Testando Endpoint...
        </>
      ) : (
        <>
          <Shield className="h-4 w-4" />
          Testar Endpoint Protegido
        </>
      )}
    </button>
  );
};
