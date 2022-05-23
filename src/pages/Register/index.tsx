import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";

import { AuthContext } from "../../contexts/AuthContext";
import { registerUser } from "../../services/auth.service";
import AuthBox from "../../components/AuthBox";

const RegisterPage = () => {
  const { state, dispatch } = useContext(AuthContext);

  const handleAuth = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: `SET_${e.target.name.toUpperCase()}`,
      payload: e.target.value,
    });

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <AuthBox
        handleSubmit={registerUser}
        handleAuth={handleAuth}
        state={state}
        authType="register"
      />
    </Box>
  );
};

export default RegisterPage;
