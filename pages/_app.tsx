import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ContextProvider } from "@/context/Context";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </QueryClientProvider>
    </ContextProvider>
  );
}
