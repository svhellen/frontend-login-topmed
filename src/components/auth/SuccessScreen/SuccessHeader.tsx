import { CheckCircle } from 'lucide-react'
import React from 'react'

export const SuccessHeader: React.FC = () => {
    return (
        <div className="text-center mb-6">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login Realizado com Sucesso!</h1>
          <p className="text-gray-600">Bem vindo a TopMed</p>
        </div>
    )
}
