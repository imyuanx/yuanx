import { useEffect, useState } from 'react';
import MoonIcon from '@/icons/moon.svg';
import SunIcon from '@/icons/sun.svg';
import SystemIcon from '@/icons/system.svg';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

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
        nextTheme = 'system';
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
    <a
      onClick={onClickHandle}
      className={clsx('flex items-center', TEXT_COLOR)}
    >
      {theme === 'dark' && <MoonIcon />}
      {theme === 'light' && <SunIcon />}
      {(theme === 'system' || theme === 'undefined') && (
        <>
          <SystemIcon
            data-tooltip-id="system-theme-tips"
            data-tooltip-content="Follow System Theme"
          />
          <Tooltip id="system-theme-tips" className="rounded-[5px]" />
        </>
      )}
    </a>
  );
}

export default ThemeMode;
