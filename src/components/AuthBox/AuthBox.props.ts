import React from "react";

import { AuthContextType } from "../../contexts/AuthContext/AuthContext.props";

export interface AuthBoxType {
  authType: "login" | "register";
  handleAuth: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state: AuthContextType;
  handleSubmit: ({
    email,
    password,
    confirm_password,
  }: {
    email: string;
    password: string;
    confirm_password?: string;
  }) => Promise<{ token: string }>;
}
