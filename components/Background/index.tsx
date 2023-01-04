import { useEffect, useState } from 'react';

const BACKGROUND_RATE = Math.floor((1_440 * 900) / 6_500);

function Background() {
  const [backgroundNum, setBackgroundNum] = useState(0);
  useEffect(() => {
    const width = window.screen.width;
    let height = window.screen.height;
    if (document.body.clientHeight > height) {
      height =
        document.body.clientHeight +
        (window.screen.height - window.innerHeight);
    }

    // Max width with real height(min height is the height of screen), guaranteed coverage.
    setBackgroundNum((width * height) / BACKGROUND_RATE);
  }, []);
  return (
    <div className="absolute flex-1 w-full h-full indent-[40px] leading-[13px] select-none box-border tracking-[10px] text-[#bfbfbf] dark:text-[#535353] text-center z-[-5] break-words">
      {'.'.repeat(backgroundNum)}
    </div>
  );
}

export default Background;
