import { Button, Flex, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function SignIn() {
  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input idName="email" type="email" label="Email" />
          <Input idName="password" type="password" label="Password" />
        </Stack>

        <Button
          type="submit"
          mt="6"
          bg="pink.500"
          _hover={{
            bgColor: "pink.400",
          }}
          size="lg"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
