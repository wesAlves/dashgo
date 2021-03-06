import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { destroyCookie } from "nookies";
import { useContext } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import { authApi } from "../services/apiAuthClient";
import { setupAuthClient } from "../services/authApi";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { withSSRAuth } from "../utils/withSSRAuth";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2022-03-18T00:00:00.000Z",
      "2022-03-19T00:00:00.000Z",
      "2022-03-20T00:00:00.000Z",
      "2022-03-21T00:00:00.000Z",
      "2022-03-22T00:00:00.000Z",
      "2022-03-23T00:00:00.000Z",
      "2022-03-24T00:00:00.000Z",
    ],
  },
};

const series = [{ name: "series1", data: [31, 120, 10, 28, 61, 18, 109] }];

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="autos" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart type="area" height={160} options={options} series={series} />
          </Box>
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart type="area" height={160} options={options} series={series} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiAuthClient = setupAuthClient(ctx);
    const response = await apiAuthClient.get("/me");

    return {
      props: {},
    };
  }
);
