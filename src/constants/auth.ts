export const TEST_CREDENTIALS = {
  user1: { 
    username: 'user_1', 
    password: 'usertopmed123*', 
  },
  user2: { 
    username: 'user_2', 
    password: 'usertopmed123*', 
  }
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELDS: 'Por favor, preencha todos os campos.',
  INVALID_CREDENTIALS: 'Credenciais inválidas. Verifique seu usuário e senha.',
  CONNECTION_ERROR: 'Erro de conexão. Tente novamente.',
  MIN_PASSWORD_LENGTH: 'A senha deve ter pelo menos 6 caracteres.',
} as const;
