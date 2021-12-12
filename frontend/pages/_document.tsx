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
            href="/fonts/poppins-v15-latin-100.woff2"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/poppins-v15-latin-300.woff2"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/poppins-v15-latin-regular.woff2"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/poppins-v15-latin-500.woff2"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          
          <link
            rel="preload"
            href="/fonts/poppins-v15-latin-700.woff2"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins-v15-latin-900.woff2"
            as="font"
            type="font/woff"
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
              /* poppins-100 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 100;
  src: url('/fonts/poppins-v15-latin-100.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('/fonts/poppins-v15-latin-100.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/fonts/poppins-v15-latin-100.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/poppins-v15-latin-100.woff') format('woff'), /* Modern Browsers */
       url('/fonts/poppins-v15-latin-100.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/poppins-v15-latin-100.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-300 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  src: url('/fonts/poppins-v15-latin-300.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('/fonts/poppins-v15-latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/fonts/poppins-v15-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/poppins-v15-latin-300.woff') format('woff'), /* Modern Browsers */
       url('/fonts/poppins-v15-latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/poppins-v15-latin-300.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-regular - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  src: url('/fonts/poppins-v15-latin-regular.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('/fonts/poppins-v15-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/fonts/poppins-v15-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/poppins-v15-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('/fonts/poppins-v15-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/poppins-v15-latin-regular.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-500 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  src: url('/fonts/poppins-v15-latin-500.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('/fonts/poppins-v15-latin-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/fonts/poppins-v15-latin-500.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/poppins-v15-latin-500.woff') format('woff'), /* Modern Browsers */
       url('/fonts/poppins-v15-latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/poppins-v15-latin-500.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-700 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  src: url('/fonts/poppins-v15-latin-700.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('/fonts/poppins-v15-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/fonts/poppins-v15-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/poppins-v15-latin-700.woff') format('woff'), /* Modern Browsers */
       url('/fonts/poppins-v15-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/poppins-v15-latin-700.svg#Poppins') format('svg'); /* Legacy iOS */
}
/* poppins-900 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  src: url('/fonts/poppins-v15-latin-900.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('/fonts/poppins-v15-latin-900.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/fonts/poppins-v15-latin-900.woff2') format('woff2'), /* Super Modern Browsers */
       url('/fonts/poppins-v15-latin-900.woff') format('woff'), /* Modern Browsers */
       url('/fonts/poppins-v15-latin-900.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/fonts/poppins-v15-latin-900.svg#Poppins') format('svg'); /* Legacy iOS */
}
#__next {
  height: 100%;
}
* {
  font-family: 'Poppins', sans-serif;
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
