import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { useTheme } from 'next-themes';

import MoonIcon from '@/icons/moon.svg';
import SunIcon from '@/icons/sun.svg';

const TEXT_COLOR =
  'text-[#808080] hover:text-black dark:text-[#a1a1a1] dark:hover:!text-white';

function ThemeMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /**
   * @desc Change theme
   */
  const onClickHandle = () => {
    const nextTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <a
      onClick={onClickHandle}
      className={clsx('flex items-center', TEXT_COLOR)}
    >
      {resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </a>
  );
}

export default ThemeMode;
