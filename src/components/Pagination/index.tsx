import { Box, Button, Stack } from "@chakra-ui/react";

export function Pagination() {
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
