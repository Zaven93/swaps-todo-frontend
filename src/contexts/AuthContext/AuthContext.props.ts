export interface AuthContextType {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  authToken: string | null;
}

export interface AuthActionType {
  type: string;
  payload: string | null;
}
