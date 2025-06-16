import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthProvider';
import LoginSystem from './components/LoginSystem';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LoginSystem />
    </AuthProvider>
  );
};

export default App;
