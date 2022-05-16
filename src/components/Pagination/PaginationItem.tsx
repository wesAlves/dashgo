import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  iscurrent: () => void;
}

export function PaginationItem() {
  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      colorScheme="pink"
      disabled
      _disabled={{ bgColor: "pink.500", cursor: "default" }}
    >
      1
    </Button>
  );
}
