import { VStack, HStack, Button } from "@chakra-ui/react";

interface ResponseButtonsProps {
  onClickYes: () => void;
  YesCopy: string;
  onClickNo: () => void;
  NoCopy: string;
  onClickOrigin?: () => void;
  OriginCopy?: string;
}

const ResponseButtons = ({
  onClickYes,
  YesCopy,
  onClickNo,
  NoCopy,
  onClickOrigin,
  OriginCopy,
}: ResponseButtonsProps) => (
  <VStack align='flex-start'>
    <HStack width='100%'>
      <Button
        size='lg'
        width='50%'
        minWidth='50%'
        colorScheme='purple'
        onClick={() => {
          onClickYes();
        }}
      >
        {YesCopy}
      </Button>
      <Button
        size='lg'
        width='50%'
        minWidth='50%'
        colorScheme='green'
        onClick={() => {
          onClickNo();
        }}
      >
        {NoCopy}
      </Button>
    </HStack>
    <HStack width='100%'>
      <Button
        size='lg'
        width='50%'
        minWidth='50%'
        colorScheme='blue'
        variant='outline'
        onClick={() => {
          onClickOrigin();
        }}
      >
        {OriginCopy}
      </Button>
      <Button
        size='lg'
        width='50%'
        minWidth='50%'
        colorScheme='orange'
        variant='outline'
        onClick={() => {
          onClickOrigin();
        }}
      >
        Respawn ⛺️
      </Button>
    </HStack>
  </VStack>
);

export default ResponseButtons;
