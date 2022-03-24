import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { globalCss, lightTheme } from "../stitches.config";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import AOS from "aos";
import '../misc/skeleton.css';
import "../misc/sunEditor.css";

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
  ".nestable-item.is-dragging:before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent !important",
    border: "1px dashed $fontPrimary !important",
    borderRadius: "15px !important",
    zIndex: 1,
  },
});

import "aos/dist/aos.css";
import { SkeletonTheme } from "react-loading-skeleton";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    hotjar.initialize(2700632, 6);
    AOS.init({});
  }, []);
  const router = useRouter();

  globalStyles();

  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      value={{ light: lightTheme.className, dark: "dark-theme" }}
      defaultTheme="system"
    >
      <SkeletonTheme baseColor="var(--colors-backgroundSecondary)" highlightColor="var(--colors-skeletonSecondary)" duration={1.3}>
        {/* <NextUIProvider> */}
        <Component {...pageProps} router={router} />
        {/* </NextUIProvider> */}

      </SkeletonTheme>
    </ThemeProvider >
  );
}

export default App;
