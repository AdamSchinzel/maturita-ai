import { AppProps } from "next/app";
import Head from "next/head";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../../config/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Maturita AI (👨‍🎓, 🧠)</title>
        <meta name="description" content="Umělá inteligence pro vypracování knih nebo otázek k maturitě." />
        <meta name="viewport" content="width=device-width initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://maturita-ai.vercel.app" />
        <meta property="og:title" content="Maturita AI (👨‍🎓, 🧠)" />
        <meta property="og:description" content="Umělá inteligence vypracování pro knih nebo otázek k maturitě." />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://maturita-ai.vercel.app" />
        <meta property="twitter:title" content="Maturita AI (👨‍🎓, 🧠)" />
        <meta
          property="twitter:description"
          content="Umělá inteligence pro vypracování pro knih nebo otázek k maturitě."
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
