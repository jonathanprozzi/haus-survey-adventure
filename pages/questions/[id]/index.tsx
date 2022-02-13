import { useState } from "react";
import { Box, Heading, Text, Button, VStack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ResponseForm from "components/ResponseForm";
import ResponseButtons from "components/ResponseButtons";
import { branchingPaths } from "../../../utils/branches";

interface Question {
  questionId: number;
  questionCopy: string;
  questionResponse: string;
}

const QuestionPage = ({ questionId, questionCopy }: Question) => {
  const router = useRouter();
  const [isSending, setSending] = useState(false);
  const toast = useToast();

  const sendResponse = async ({ questionId, questionResponse }) => {
    setSending(false);

    const res = await fetch("/api/create-response", {
      method: "POST",
      body: JSON.stringify({
        questionCopy: questionCopy,
        response: questionResponse,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const apiResponse = await res.json();
    if (apiResponse) {
      toast({
        title: "Response Sent",
        description: "Your response has been sent",
        status: "success",
        duration: 3000,
        isClosable: true,
      }),
        setSending(false);
    }
  };

  return (
    <Box>
      <VStack spacing={4}>
        <Heading>Question {questionId}</Heading>
        <Text>{questionCopy}</Text>
        <ResponseButtons
          YesCopy='Yes!'
          NoCopy='No!'
          OriginCopy='Back'
          onClickYes={() => {
            sendResponse({ questionId, questionResponse: "Yes" });
            router.push(branchingPaths[questionId].yes);
          }}
          onClickNo={() => {
            sendResponse({ questionId, questionResponse: "No" });
            router.push(branchingPaths[questionId].no);
          }}
          onClickOrigin={() => {
            router.push(branchingPaths[questionId].backToOrigin);
          }}
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
  console.log(params);

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
