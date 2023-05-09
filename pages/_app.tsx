import { useEffect, useState, useRef } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { create as ackeeTrackerCreate } from 'ackee-tracker';
import { ThemeProvider } from 'next-themes';
import Nav from '../components/Nav';
import Background from '../components/Background';
import { useBackground } from '../common/useBackground';
import '../styles/globals.css';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { route } = useRouter();
  const [active, setActive] = useState('home');
  const [background, setBackground] = useBackground();
  const [showBackground, setShowBackground] = useState(background);

  useEffect(() => {
    ackeeTrackerCreate('https://ackee.yuanx.me').record(
      'cff959e0-1e4b-4a3e-b91b-5ffd06b6c870',
    );
  }, []);

  useEffect(() => {
    setShowBackground(background);
  }, [background]);

  useEffect(() => {
    if (route === '/') {
      setActive('home');
    } else if (route.indexOf('/blog') === 0) {
      setActive('blog');
    }
  }, [route]);

  return (
    <ThemeProvider attribute="class">
      {showBackground && <Background pointer={route === '/'} />}
      <Nav active={active} setBackground={setBackground} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
