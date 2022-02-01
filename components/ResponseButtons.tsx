import { HStack, Button } from "@chakra-ui/react";

interface ResponseButtonsProps {
  onClickYes: () => void;
  YesCopy: string;
  onClickNo: () => void;
  NoCopy: string;
}

const ResponseButtons = ({
  onClickYes,
  YesCopy,
  onClickNo,
  NoCopy,
}: ResponseButtonsProps) => (
  <HStack>
    <Button
      colorScheme='purple'
      onClick={() => {
        onClickYes();
      }}
    >
      {YesCopy}
    </Button>
    <Button
      colorScheme='green'
      onClick={() => {
        onClickNo();
      }}
    >
      {NoCopy}
    </Button>
  </HStack>
);

export default ResponseButtons;
