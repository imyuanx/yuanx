import { useEffect, useState, useRef } from 'react';
import type { AppProps } from 'next/app';
import { create as ackeeTrackerCreate } from 'ackee-tracker';
import Background from '../components/Background';
import { initTheme } from '../common/useTheme';
import { useBackground } from '../common/useBackground';
import '../styles/globals.css';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [background, setBackground] = useBackground();
  const [showBackground, setShowBackground] = useState(background);

  useEffect(() => {
    initTheme();
    ackeeTrackerCreate('https://ackee.yuanx.me').record(
      'cff959e0-1e4b-4a3e-b91b-5ffd06b6c870',
    );
  }, []);

  useEffect(() => {
    setShowBackground(background);
  }, [background]);

  return (
    <>
      {showBackground && <Background />}
      <Component {...pageProps} setBackground={setBackground} />
    </>
  );
}

export default MyApp;
