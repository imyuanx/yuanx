import { useEffect, useState } from 'react';

const THEME = {
  SYSTEM: '0',
  LIGHT: '1',
  DARK: '2',
};

function useSystemTheme() {
  const [light, setLight] = useState(true);
  useEffect(() => {
    const listenLight = ({ matches }: MediaQueryListEvent) => setLight(matches);

    matchMedia('(prefers-color-scheme: light)').addEventListener(
      'change',
      listenLight,
    );
    return () => {
      matchMedia('(prefers-color-scheme: light)').removeEventListener(
        'change',
        listenLight,
      );
    };
  }, []);
  return light;
}

function useTheme() {
  const [theme, setTheme] = useState('');
  const light = useSystemTheme();

  useEffect(() => {
    setTheme(
      localStorage['yuanx.me_theme']
        ? localStorage['yuanx.me_theme']
        : THEME['SYSTEM'],
    );
  }, []);

  useEffect(() => {
    theme && changeTheme(theme);
  }, [theme, light]);

  /**
   * @desc Change site theme
   */
  const changeTheme = (theme: string) => {
    switch (theme) {
      case THEME['DARK']:
        document.documentElement.classList.add('dark');
        localStorage['yuanx.me_theme'] = THEME['DARK'];
        break;
      case THEME['LIGHT']:
        document.documentElement.classList.remove('dark');
        localStorage['yuanx.me_theme'] = THEME['LIGHT'];
        break;
      default:
      case THEME['SYSTEM']:
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        localStorage['yuanx.me_theme'] = THEME['SYSTEM'];
        break;
    }
  };

  return [theme, setTheme];
}

export { useTheme };
export { THEME };
