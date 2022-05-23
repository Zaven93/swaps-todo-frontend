import React, { FC, createContext, useReducer } from "react";

import { AuthContextType, AuthActionType } from "./AuthContext.props";

const initialState = {
  email: null,
  password: null,
  confirmPassword: null,
  authToken: localStorage.getItem("token"),
};

export const AuthContext = createContext<{
  state: AuthContextType;
  dispatch: React.Dispatch<AuthActionType>;
}>({ state: initialState, dispatch: () => null });

const reducer = (
  state: AuthContextType,
  action: AuthActionType
): AuthContextType => {
  const { type, payload } = action;

  switch (type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: payload,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: payload,
      };
    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: payload,
      };
    case "SET_AUTH":
      return {
        ...state,
        authToken: payload,
      };
    default:
      return state;
  }
};

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
