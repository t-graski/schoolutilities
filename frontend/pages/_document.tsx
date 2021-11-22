import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/montserrat-v18-latin-100.woff2"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/montserrat-v18-latin-300.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/montserrat-v18-latin-regular.woff2"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/montserrat-v18-latin-500.woff"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          
          <link
            rel="preload"
            href="/fonts/montserrat-v18-latin-700.woff2"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/montserrat-v18-latin-900.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-879Y3BTW0K"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-879Y3BTW0K', {
                  page_path: window.location.pathname,
                });`,
            }}
          ></script>
          <style
            dangerouslySetInnerHTML={{
              __html: `
              /* montserrat-100 - latin */
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 100;
    src: local(''), url('/fonts/montserrat-v18-latin-100.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */ url('./fonts/montserrat-v18-latin-100.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* montserrat-300 - latin */
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 300;
    src: local(''), url('/fonts/montserrat-v18-latin-300.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */ url('./fonts/montserrat-v18-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* montserrat-regular - latin */
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: local(''), url('/fonts/montserrat-v18-latin-regular.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */ url('./fonts/montserrat-v18-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* montserrat-500 - latin */
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    src: local(''), url('/fonts/montserrat-v18-latin-500.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */ url('./fonts/montserrat-v18-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* montserrat-700 - latin */
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    src: local(''), url('/fonts/montserrat-v18-latin-700.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */ url('./fonts/montserrat-v18-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* montserrat-900 - latin */
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 900;
    src: local(''), url('/fonts/montserrat-v18-latin-900.woff2') format('woff2'),
        /* Chrome 26+, Opera 23+, Firefox 39+ */ url('./fonts/montserrat-v18-latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
