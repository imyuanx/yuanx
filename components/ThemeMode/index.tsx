import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import MoonIcon from '../Icon/moon';
import SunIcon from '../Icon/sun';
import SystemIcon from '../Icon/system';

const TEXT_COLOR =
  'text-[#808080] hover:text-black dark:text-[#a1a1a1] dark:hover:!text-white';

function ThemeMode() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /**
   * @desc Change theme
   */
  const onClickHandle = () => {
    let nextTheme = 'system';
    switch (theme) {
      case 'system':
      case 'undefined':
        nextTheme = 'light';
        break;
      case 'light':
        nextTheme = 'dark';
        break;
      case 'dark':
        nextTheme = 'light';
        break;
    }
    setTheme(nextTheme);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <a onClick={onClickHandle} className={`flex items-center ${TEXT_COLOR}`}>
      {theme === 'dark' && <MoonIcon />}
      {theme === 'light' && <SunIcon />}
      {(theme === 'system' || theme === 'undefined') && <SystemIcon />}
    </a>
  );
}

export default ThemeMode;
