import { useEffect, useState } from 'react';

/**
 * @desc 主题切换
 */
function useDarkMode ():[boolean, ((isDark_?: boolean|null) => void)] {
  const [isDark, setDark] = useState(false);
  useEffect(() => {
    setDark(localStorage['yuanx.me_theme'] === 'dark');
  }, []);

  const toggleDark = (isDark_: boolean|null = null) => {
    if (isDark_ !== null ? isDark_ : isDark) {
      document.documentElement.classList.remove('dark');
      localStorage['yuanx.me_theme'] = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage['yuanx.me_theme'] = 'dark';
    }
    setDark(!isDark);
  };

  return [isDark, toggleDark];
}

function initTheme() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage['yuanx.me_theme'] === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export { useDarkMode };
export { initTheme };
