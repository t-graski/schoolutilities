import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
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
            defer
          ></script>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7476966411807562"
            crossOrigin="anonymous"
            defer
          ></script>
          <script
            type="text/javascript"
            src="https://cdn.cookielaw.org/consent/7d50b473-ca67-4ccc-9509-8fc4008d70b7-test/OtAutoBlock.js"
            async
            defer
          ></script>
          <script
            src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
            type="text/javascript"
            data-domain-script="7d50b473-ca67-4ccc-9509-8fc4008d70b7-test"
            async
            defer
          ></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `function OptanonWrapper() {}`,
            }}
          ></script>
          <style
            dangerouslySetInnerHTML={{
              __html: `
/* poppins-regular - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local(''),
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
  font-display: swap;
  src: local(''),
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
  font-display: swap;
  src: local(''),
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
  font-display: swap;
  src: local(''),
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

#__next{
  min-height: 100vh;
  position: relative;
}
}
`,
            }}
          />
          <link
            href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
