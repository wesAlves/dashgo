import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  number,
  isCurrent,
  onPageChange,
}: PaginationItemProps) {
  return (
    <>
      {isCurrent ? (
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          colorScheme="pink"
          disabled
          _disabled={{ bgColor: "pink.500", cursor: "default" }}
        >
          {number}
        </Button>
      ) : (
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          colorScheme="pink"
          bg="gray.700"
          _hover={{ bgColor: "pink.500" }}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Button>
      )}
    </>
  );
}
