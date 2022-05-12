import {
  Flex,
  Input,
  Text,
  Icon,
  HStack,
  Box,
  Avatar,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  RiNotificationLine,
  RiSearch2Line,
  RiUserAddLine,
} from "react-icons/ri";

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
      >
        dashgo
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>

      {isWideVersion && (
        <Flex
          as="label"
          flex="1"
          py="4"
          px="8"
          ml="6"
          maxW={400}
          alignSelf="center"
          color="gray.200"
          position="relative"
          bg="gray.800"
          borderRadius="full"
        >
          <Input
            color="gray.50"
            variant="unstyled"
            placeholder="Buscar na plataforma"
            _placeholder={{ color: "gray.400" }}
            px="4"
            mr="4"
          />
          <Icon as={RiSearch2Line} alignSelf="center" fontSize="20" />
        </Flex>
      )}

      <Flex align="center" ml="auto">
        <HStack
          spacing={["6", "8"]}
          mx={["6", "8"]}
          pr={["6", "8"]}
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} fontSize="20" alignSelf="center" />
          <Icon as={RiUserAddLine} fontSize="20" alignSelf="center" />
        </HStack>
      </Flex>

      <Flex align="center">
        {isWideVersion && (
          <Box mr="4" textAlign="right">
            <Text>Wes Benvindo</Text>
            <Text color="gray.300" fontSize="small">
              wes.bnvnd@gmail.com
            </Text>
          </Box>
        )}

        <Avatar size="md" src="#" name="Wes Benvindo" />
      </Flex>
    </Flex>
  );
}
