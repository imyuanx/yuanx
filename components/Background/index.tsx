import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';

export interface Props {
  pointer: boolean;
}

export interface ColorBlockData {
  mouseX: number;
  mouseY: number;
  firstMove: boolean;
}

function Background({ pointer }: Props) {
  const colorBlockRef = useRef<HTMLDivElement>(null);
  const colorBlockFirstMove = useRef<boolean | null>(null);
  const [colorBlockData, setColorBlockData] = useState<ColorBlockData>({
    mouseX: 0,
    mouseY: 0,
    firstMove: true,
  });
  const animatedProps = useSpring<{
    left: number;
    top: number;
  }>({
    left: colorBlockData.mouseX - (colorBlockRef.current?.clientWidth || 0) / 2,
    top: colorBlockData.mouseY - (colorBlockRef.current?.clientHeight || 0) / 2,
    opacity: colorBlockData.firstMove === false ? 1 : 0,
    config: {
      duration: colorBlockData.firstMove === false ? 200 : 0,
    },
  });

  useEffect(() => {
    const moveFollow = (e: { clientX: number; clientY: number }) => {
      const $colorBlock = colorBlockRef.current;
      if (!$colorBlock) return;
      const { clientX, clientY } = e;
      colorBlockFirstMove.current = colorBlockFirstMove.current === null;
      setColorBlockData({
        mouseX: clientX,
        mouseY: clientY,
        firstMove: colorBlockFirstMove.current,
      });
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
        <animated.div
          ref={colorBlockRef}
          style={animatedProps}
          className={`absolute opacity-0 z-[-6] w-[180px] h-[180px] global-color-block`}
        />
      )}
    </div>
  );
}

export default Background;
