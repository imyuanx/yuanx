import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { create as ackeeTrackerCreate } from 'ackee-tracker';
import '../styles/globals.css';
import '../styles/tailwind.css';
import { initTheme } from '../common/useTheme';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initTheme();
    ackeeTrackerCreate('https://ackee.yuanx.me').record('cff959e0-1e4b-4a3e-b91b-5ffd06b6c870')
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
