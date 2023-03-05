import { FC } from 'react';
import { THEME, useTheme } from '../../common/useTheme';
import MoonIcon from '../Icon/moon';
import SunIcon from '../Icon/sun';
import SystemIcon from '../Icon/system';

const TEXT_COLOR =
  'text-[#808080] hover:text-black dark:text-[#a1a1a1] dark:hover:!text-white';

function ThemeMode() {
  const [theme, setTheme] = useTheme();

  /**
   * @desc Change theme
   */
  const onClickHandle = () => {
    const _theme = Number(theme) + 1 > 2 ? '0' : `${Number(theme) + 1}`;
    typeof setTheme !== 'string' && setTheme(`${_theme}`);
  };

  return (
    <a onClick={onClickHandle} className={`flex items-center ${TEXT_COLOR}`}>
      {theme === THEME['DARK'] && <MoonIcon />}
      {theme === THEME['LIGHT'] && <SunIcon />}
      {theme === THEME['SYSTEM'] && <SystemIcon />}
    </a>
  );
}

export default ThemeMode;
