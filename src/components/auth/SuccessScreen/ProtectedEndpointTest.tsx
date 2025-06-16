import React, { useState } from 'react';
import { getProtectedDataAPI, ProtectedResponseDTO } from '../../../api/auth';
import { ProtectedTestHeader } from './ProtectedTestHeader';
import {TestButton} from './TestButton';
import {ErrorDisplay} from './ErrorDisplay';
import {SuccessDisplay} from './SuccessResponseDisplay';

interface ProtectedEndpointTestProps {
  token: string | null;
}

const ProtectedEndpointTest: React.FC<ProtectedEndpointTestProps> = ({ token }) => {
  const [protectedData, setProtectedData] = useState<ProtectedResponseDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showProtectedTest, setShowProtectedTest] = useState(false);

  const testProtectedEndpoint = async () => {
    if (!token) {
      setError('Token não encontrado. Faça login novamente.');
      return;
    }

    setLoading(true);
    setError('');
    setProtectedData(null);

    console.debug('Token (first 20 chars):', token.substring(0, 20) + '...');

    try {
      const response = await getProtectedDataAPI(token);
      
      if (response.data) {
        setProtectedData(response.data);
        setError('');
      }
    } catch (err: any) {
      if (err.message) {
        setError(err.message);
      } else if (err.response?.status === 401) {
        setError('Token inválido ou expirado. Faça login novamente.');
      } else if (err.response?.status) {
        setError(`Erro ${err.response.status}: ${err.response.statusText}`);
      } else {
        setError('Erro de conexão: Verifique se a API está rodando');
      }
      setProtectedData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearProtectedData = () => {
    setProtectedData(null);
    setError('');
  };

  const toggleVisibility = () => {
    setShowProtectedTest(!showProtectedTest);
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <ProtectedTestHeader 
        showProtectedTest={showProtectedTest} 
        onToggle={toggleVisibility} 
      />

      {showProtectedTest && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Teste o acesso a um endpoint protegido usando seu token JWT atual
          </p>

          <TestButton 
            onTest={testProtectedEndpoint} 
            loading={loading} 
          />

          <ErrorDisplay error={error} />

          <SuccessDisplay 
            protectedData={protectedData} 
            onClear={clearProtectedData} 
          />
        </div>
      )}
    </div>
  );
};

export default ProtectedEndpointTest;