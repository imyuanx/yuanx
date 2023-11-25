import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useBackground } from '@/common/useBackground';
import Background from '@/components/Background';
import Nav from '@/components/Nav';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import '@/styles/tailwind.css';
import { create as ackeeTrackerCreate } from 'ackee-tracker';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
  const { route } = useRouter();
  const [active, setActive] = useState('home');
  const [background, setBackground] = useBackground();
  const [showBackground, setShowBackground] = useState(background);

  useEffect(() => {
    ackeeTrackerCreate('https://ackee.yuanx.me').record(
      'cff959e0-1e4b-4a3e-b91b-5ffd06b6c870'
    );
  }, []);

  useEffect(() => {
    setShowBackground(background);
  }, [background]);

  useEffect(() => {
    // TODO: refactor
    if (route === '/') {
      setActive('home');
    } else if (route.indexOf('/blog') === 0) {
      setActive('blog');
    } else if (route.indexOf('/projects') === 0) {
      setActive('projects');
    } else if (route.indexOf('/notes') === 0) {
      setActive('notes');
    }
  }, [route]);

  return (
    <ThemeProvider attribute="class">
      {showBackground && <Background pointer={route === '/'} />}
      <Nav active={active} setBackground={setBackground} />
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  );
}

export default MyApp;
