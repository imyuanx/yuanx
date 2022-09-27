import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/tailwind.css';
import { initTheme } from '../common/useTheme';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initTheme();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
