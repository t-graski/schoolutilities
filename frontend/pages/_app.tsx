import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { globalCss, lightTheme } from "../stitches.config";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../utils/skeleton.css";
import "../utils/tapTapEditor.css";

const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
  body: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "$regular",
    overflowX: "hidden",
    backgroundColor: "$background",
    minHeight: "100vh",
  },
  ".nestable-item.is-dragging:before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,

    width: "100%",
    height: "100%",
    border: "1px dashed $neutral-500 !important",
    borderRadius: "15px !important",

    backgroundColor: "transparent !important",
  },
});

import { SkeletonTheme } from "react-loading-skeleton";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import ProtectedRoute from "../components/atoms/ProtectedRoute";

function App({ Component, pageProps }: AppProps) {
  globalStyles();

  useEffect(() => {
    hotjar.initialize(2700632, 6);
  }, []);

  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <ProtectedRoute router={router}>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: lightTheme.className, dark: "dark-theme" }}
        defaultTheme="system"
      >
        <SkeletonTheme
          baseColor="var(--colors-surfaceVariant)"
          highlightColor="var(--colors-outline)"
          duration={1.3}
        >
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-879Y3BTW0K"
            strategy="lazyOnload"
            defer
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
            strategy="lazyOnload"
            defer
          ></Script>
          <Script
            src="https://r1l6px23b4sc.statuspage.io/embed/script.js"
            strategy="lazyOnload"
            defer
          ></Script>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-879Y3BTW0K"
            strategy="lazyOnload"
            defer
          ></Script>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SkeletonTheme>
      </ThemeProvider>
    </ProtectedRoute>
  );
}

export default App;
