import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Kevin Cruz</Text>
          <Text color="gray.300" fontSize="small">
            kevin@email.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Kevin Cruz"
        src="https://github.com/KevinMCruzP.png"
      />
    </Flex>
  );
}
