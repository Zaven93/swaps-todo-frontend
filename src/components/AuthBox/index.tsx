import React, { FC, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../contexts/AuthContext";
import { AuthBoxType } from "./AuthBox.props";
import PasswordFormControl from "../PasswordFormControl";

const AuthBox: FC<AuthBoxType> = ({
  authType,
  state,
  handleAuth,
  handleSubmit: handleSbmt,
}) => {
  const { dispatch } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState("");
  const { email, password, confirmPassword } = state;
  const heading = authType === "login" ? "Login" : "Register";

  const onSubmit = async (data: { [x: string]: any }) => {
    try {
      setLoading(true);
      if (Object.values(errors).some((value) => value)) return;

      const { email, password } = data as { email: string; password: string };

      const { token, message }: { token: string; message?: string } =
        await handleSbmt({
          email,
          password,
        });

      if (message) {
        setServerErrors(message);
        setLoading(false);
        return;
      }

      setLoading(false);
      dispatch({ type: "SET_AUTH", payload: token });
      dispatch({ type: "SET_EMAIL", payload: "" });
      dispatch({ type: "SET_PASSWORD", payload: "" });
      dispatch({ type: "SET_CONFIRM_PASSWORD", payload: "" });
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderLink = () => {
    if (authType === "login") {
      return (
        <Text>
          Don't have an account?
          <Link to="/register">
            <Text textDecoration="underline">Register</Text>
          </Link>
        </Text>
      );
    }

    return (
      <Text>
        Already have an account?{" "}
        <Link to="/login">
          <Text textDecoration="underline">Login</Text>
        </Link>
      </Text>
    );
  };

  const renderError = (field: string) => {
    if (!errors[field]) return;

    if (errors[field]?.type === "required") {
      return (
        <Text textAlign="left" color="red">
          {field} is required
        </Text>
      );
    } else {
      return (
        <Text textAlign="left" color="red">
          {errors?.[field].message}
        </Text>
      );
    }
  };

  const clearError = (name: string) => (errors[name] = "");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={10}
      maxW="500px"
      w={{ sm: "100%", lg: "50%" }}
      ml="auto"
      mr="auto"
      textAlign="center"
    >
      <Heading as="h1" size="medium">
        {heading}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="10px">
          <FormLabel>Email</FormLabel>
          <Input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            value={email || ""}
            name="email"
            onFocus={() => clearError("email")}
            onChange={handleAuth}
            isInvalid={errors.email}
          />
          {renderError("email")}
        </FormControl>
        <PasswordFormControl
          renderError={renderError}
          register={register}
          placeholder="Password"
          value={password || ""}
          name="password"
          onChange={handleAuth}
          isInvalid={errors.password}
          onFocus={() => clearError("password")}
        />
        {authType === "register" && (
          <PasswordFormControl
            renderError={renderError}
            comparePassword={password}
            register={register}
            value={confirmPassword || ""}
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={handleAuth}
            isInvalid={errors.confirm_password}
            onFocus={() => clearError("confirm_password")}
          />
        )}
        {serverErrors && (
          <Text textAlign="left" color="red">
            {serverErrors}
          </Text>
        )}
        <Button type="submit" m="10px" w="100%">
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </form>
      {renderLink()}
    </Box>
  );
};

export default AuthBox;
