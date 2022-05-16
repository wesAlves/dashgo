import { Box, Button, Stack } from "@chakra-ui/react";

interface PaginationProps {
  totalCountOfRecords: number;
  recordsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const sibilingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRecords,
  recordsPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRecords / recordsPerPage);

  const previeousPatges =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - sibilingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(currentPage + sibilingsCount, lastPage)
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      spacing="6"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
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

        <Button
          size="sm"
          fontSize="xs"
          width="4"
          colorScheme="pink"
          bg="gray.700"
          _hover={{ bgColor: "pink.500" }}
        >
          2
        </Button>
      </Stack>
    </Stack>
  );
}
