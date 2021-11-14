import React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { globalCss } from "../stitches.config";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";

const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    color: "#ffffff",
  },
  body: {
    fontFamily: "Montserrat",
    fontWeight: "500",
    backgroundColor: "#2f3136",
    overflowX: "hidden",
  },
});

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    hotjar.initialize(2700632, 6);
  }, []);
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  globalStyles();

  const isDocs = router.pathname.includes("/docs");

  return <Component {...pageProps} router={router} />;
}

export default App;
