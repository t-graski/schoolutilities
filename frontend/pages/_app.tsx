import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { globalCss } from '../stitches.config';

const globalStyles = globalCss({
    '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
        color: '#ffffff'
    },
  body: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    backgroundColor: "#2f3136",
    overflowX: 'hidden',
  },
});

function App({ Component, pageProps }: AppProps) {
  globalStyles();

  const router = useRouter();


  const isDocs = router.pathname.includes('/docs');

  return (
    <Component {...pageProps} router={router} />
  );
}

export default App;