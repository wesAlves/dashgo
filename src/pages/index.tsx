import { Flex, Button, Stack, FormLabel } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

import { SubmitErrorHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFomrSchema = yup.object().shape({
  email: yup
    .string()
    .required("Campo e-mail obrigatório")
    .email("e=mail inválido"),
  password: yup.string().required("Password obrigatório"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFomrSchema),
  });

  const handleSignIn: SubmitErrorHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={formState.errors.email}
            {...register("email")}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            error={formState.errors.password}
            {...register("password")}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme={"pink"}
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
