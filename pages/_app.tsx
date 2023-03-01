import "@/styles/globals.css";
import type { AppProps } from "next/app";
import * as React from "react";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../lib/createEmotionCache";
import Layout from "@/components/Layout";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { AuthContextProvider } from "@/context/AuthContext";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import OpenRoutes from "@/components/OpenRoutes";
import { useRouter } from "next/router";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const unprotectedRoutes = ["/login", "/signup"];

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeContextProvider>
        <AuthContextProvider>
          <CssBaseline />
          <Layout>
            {unprotectedRoutes.includes(router.pathname) ? (
              <OpenRoutes>
                <Component {...pageProps} />
              </OpenRoutes>
            ) : (
              <ProtectedRoutes>
                <Component {...pageProps} />
              </ProtectedRoutes>
            )}
          </Layout>
        </AuthContextProvider>
      </ThemeContextProvider>
    </CacheProvider>
  );
}
