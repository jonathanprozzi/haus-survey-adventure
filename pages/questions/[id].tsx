import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Box>
      <VStack spacing={4}>
        <Heading>CYOA Onboarding Adventure</Heading>
        <Text>Welcome to the DAOhaus Onboarding Adventure</Text>
        <Button
          colorScheme='purple'
          onClick={() => {
            router.push("/questions/[id]", `/questions/1`);
          }}
        >
          I am on page {router.query.id}
        </Button>
      </VStack>
    </Box>
  );
}
