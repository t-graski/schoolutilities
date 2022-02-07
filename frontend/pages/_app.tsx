import React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { globalCss, lightTheme } from "../stitches.config";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";

const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
  body: {
    fontFamily: "Poppins",
    fontWeight: "400",
    overflowX: "hidden",
    backgroundColor: "$backgroundPrimary",
    minHeight: "100vh",
  },
});

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    hotjar.initialize(2700632, 6);
  }, []);
  const router = useRouter();

  globalStyles();

  const isDocs = router.pathname.includes("/docs");

  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      value={{ light: lightTheme.className, dark: "dark-theme" }}
      defaultTheme="system"
    >
      {/* <NextUIProvider> */}
        <Component {...pageProps} router={router} />
      {/* </NextUIProvider> */}
    </ThemeProvider>
  );
}

export default App;
