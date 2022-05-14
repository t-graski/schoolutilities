import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { globalCss, lightTheme } from "../stitches.config";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";
import AOS from "aos";
import "../misc/skeleton.css";
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
import Script from "next/script";
import { ThemeProvider } from "next-themes";

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
      <SkeletonTheme
        baseColor="var(--colors-backgroundSecondary)"
        highlightColor="var(--colors-skeletonSecondary)"
        duration={1.3}
      >
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-879Y3BTW0K"
        ></Script>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-879Y3BTW0K', {
                  page_path: window.location.pathname,
                });`,
          }}
          id="google-analytics-tag"
        ></Script>
        <Script
          src="https://r1l6px23b4sc.statuspage.io/embed/script.js"
          strategy="lazyOnload"
        ></Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-879Y3BTW0K"
        ></Script>
        <Component {...pageProps} router={router} />
      </SkeletonTheme>
    </ThemeProvider>
  );
}

export default App;
