import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as InputPropsChakra,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputPropsChakra {
  idName: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { idName, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error} variant="floating">
      <ChakraInput
        name={idName}
        id={idName}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
        placeholder=" "
        ref={ref}
        {...rest}
      />
      {!!label && <FormLabel>{label}</FormLabel>}
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
