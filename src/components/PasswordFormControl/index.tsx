import { FC, useState } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { PasswrordFormControlType } from "./PasswordFormControl.props";

const PasswordControlComponent: FC<PasswrordFormControlType> = ({
  placeholder,
  value,
  name,
  onChange,
  register,
  comparePassword = null,
  renderError,
  isInvalid,
  onFocus,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const registerValue = () => {
    if (name === "confirm_password") {
      return {
        required: true,
        validate: (value: string) =>
          value === comparePassword || "The passwords do not match",
      };
    }

    return { required: true };
  };

  return (
    <FormControl mb="10px">
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          {...register(name, registerValue())}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          isInvalid={isInvalid}
          onFocus={onFocus}
        />
        <InputRightElement>
          <Button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {renderError(name)}
    </FormControl>
  );
};

export default PasswordControlComponent;
