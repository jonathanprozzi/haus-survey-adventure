import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

// interface Question {
//   questionId: number;
//   questionCopy: string;
// }

const BranchPage = () => {
  const router = useRouter();
  const branch = router.query.branch;
  return (
    <Box>
      <VStack spacing={4}>
        <Heading>Response {branch}</Heading>
        <Text>Hi</Text>
      </VStack>
    </Box>
  );
};

export default BranchPage;
