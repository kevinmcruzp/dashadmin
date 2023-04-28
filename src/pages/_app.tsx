import { ChakraProvider, Flex } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { SidebarDrawerProvider } from "../context/SidebarDrawerContext";
import { makeServer } from "../services/mirage";
import { queryClient } from "../services/queryClient";
import { theme } from "../styles/theme";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        {router.pathname !== "/" ? (
          <SidebarDrawerProvider>
            <Flex direction="column" h="100vh">
              <Header />
              <Flex
                w="100%"
                my="6"
                maxW={1480}
                mx="auto"
                px="6"
                overflow="hidden"
              >
                <Sidebar />
                <Component {...pageProps} />
              </Flex>
            </Flex>
          </SidebarDrawerProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
