import {
  FormControl,
  FormLabel,
  Input as InputChakra,
  InputProps as InputPropsChakra,
} from "@chakra-ui/react";

interface InputProps extends InputPropsChakra {
  idName: string;
  label?: string;
}

export function Input({ idName, label, ...rest }: InputProps) {
  return (
    <FormControl variant="floating" id={idName} isRequired>
      <InputChakra
        name={idName}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
        placeholder=" "
        {...rest}
      />
      {!!label && <FormLabel>{label}</FormLabel>}
    </FormControl>
  );
}
