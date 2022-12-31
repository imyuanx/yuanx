import { useState } from 'react';

/**
 * @desc 主题切换
 */
function useBackground(): [boolean, (background_?: boolean | null) => void] {
  const [background, setBackground] = useState(true);

  const toggleBackground = () => {
    setBackground(!background);
  };

  return [background, toggleBackground];
}

export { useBackground };
