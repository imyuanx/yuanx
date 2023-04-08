import { useEffect, useRef } from 'react';

export interface Props {
  pointer: boolean;
}

function Background({ pointer }: Props) {
  const colorBlock = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveFollow = (e: { clientX: number; clientY: number }) => {
      const $colorBlock = colorBlock.current;
      if (!$colorBlock) return;
      const { clientX, clientY } = e;
      $colorBlock.style.left = `${clientX - 90}px`;
      $colorBlock.style.top = `${clientY - 90}px`;
      $colorBlock.style.opacity = '1';
    };
    document.addEventListener('mousemove', moveFollow);
    return () => {
      document.removeEventListener('mousemove', moveFollow);
    };
  }, []);

  return (
    <div className="global-background">
      <div className="absolute z-[-5] w-full h-full backdrop-blur-[86px]"></div>
      {pointer && (
        <div
          ref={colorBlock}
          className="opacity-0 absolute z-[-6] w-[180px] h-[180px] global-color-block"
        />
      )}
    </div>
  );
}

export default Background;
