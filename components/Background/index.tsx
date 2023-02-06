import { useEffect, useState } from 'react';
import { useResizeObserver } from '../../common/useResizeObserver';

const BACKGROUND_RATE = Math.floor((1_440 * 900) / 7_500);

function Background() {
  const [backgroundNum, setBackgroundNum] = useState(0);
  const [ref, sizes] = useResizeObserver();

  useEffect(() => {
    const { width, height } = sizes;
    if (!height || !width) return;
    setBackgroundNum((width * height) / BACKGROUND_RATE);
  }, [sizes]);

  return (
    <div
      ref={ref}
      className="absolute flex-1 w-full h-full indent-[40px] leading-[13px] select-none box-border tracking-[10px] text-[#bfbfbf] dark:text-[#535353] text-center z-[-5] break-words"
    >
      {'.'.repeat(backgroundNum)}
    </div>
  );
}

export default Background;
