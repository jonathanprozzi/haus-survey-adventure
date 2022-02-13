import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Box>
      <VStack spacing={4}>
        <Heading>🏰 DAOhaus Onboarding Adventure 🏰</Heading>
        <Text>Welcome to the DAOhaus Onboarding Adventure</Text>
        <Button
          colorScheme='purple'
          onClick={() => {
            router.push("/questions/[id]", `/questions/1`);
          }}
        >
          Start My Adventure 📜
        </Button>
      </VStack>
    </Box>
  );
}
