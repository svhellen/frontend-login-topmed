export type LoginCredentials = {
  username: string;
  password: string;
}

export type UserInfo = {
  id: number;
  username: string;
  name: string;
  email: string;
}

export type AuthResponse = {
  success: boolean;
  user?: UserInfo;
  token?: string;
  message?: string;
}
