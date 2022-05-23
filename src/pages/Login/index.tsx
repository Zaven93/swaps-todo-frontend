import { useContext } from "react";
import { Box } from "@chakra-ui/react";

import { AuthContext } from "../../contexts/AuthContext";
import { loginUser } from "../../services/auth.service";
import AuthBox from "../../components/AuthBox";

const LoginPage = () => {
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
        handleSubmit={loginUser}
        handleAuth={handleAuth}
        state={state}
        authType="login"
      />
    </Box>
  );
};

export default LoginPage;
