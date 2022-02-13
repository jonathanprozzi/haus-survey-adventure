import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ResponseButtons from "components/ResponseButtons";
import { branchingPaths } from "../../../utils/branches";

interface Question {
  questionId: number;
  questionCopy: string;
}

const QuestionPage = ({ questionId, questionCopy }: Question) => {
  console.log("questionId: ", questionId);
  console.log("questionCopy: ", questionCopy);
  const router = useRouter();
  return (
    <Box>
      <VStack spacing={4}>
        <Heading>Question {questionId}</Heading>
        <Text>{questionCopy}</Text>
        <ResponseButtons
          onClickYes={() => {
            router.push(branchingPaths[questionId].yes);
          }}
          YesCopy='Yes!'
          onClickNo={() => {
            router.push(branchingPaths[questionId].no);
          }}
          NoCopy='No!'
        />
      </VStack>
    </Box>
  );
};

export default QuestionPage;

export async function getServerSideProps({ params }) {
  const airApiKey = process.env.AIR_API_KEY;
  const baseId = process.env.BASE_ID;
  const tableName = process.env.SURVEY_TABLE_NAME;

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=%7Bquestionid%7D%3D%27${params.id}%27&api_key=${airApiKey}`,
    { method: "GET", mode: "no-cors", credentials: "same-origin" }
  );
  const data = await res.json();
  console.log("response data:", data);
  if (!data.error) {
    return {
      props: {
        id: data.records[0].id,
        questionId: data.records[0].fields.questionId,
        questionCopy: data.records[0].fields.questionCopy,
      },
    };
  } else {
    return {
      props: {
        name: null,
      },
    };
  }
}
