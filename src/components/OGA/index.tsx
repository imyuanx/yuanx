import { useMemo } from 'react';
import OGCard, { OGInfo } from '@/components/OGCard';
import { animated, useSpringValue } from 'react-spring';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export interface Props {
  className: string;
  target: string;
  name: string;
  OGInfo?: OGInfo;
}

function OGA({ className, target, name, OGInfo }: Props) {
  const id = useMemo(() => `og-a-${name.replaceAll(' ', '')}`, [name]);
  const height = useSpringValue(0, { config: { duration: 200 } });
  const opacity = useSpringValue(0.5, { config: { duration: 200 } });

  function animatedStart() {
    height.start(254);
    opacity.start(1);
  }

  function animatedReset() {
    height.start(0);
    opacity.start(0.5);
  }

  return (
    <>
      <a
        id={id}
        className={className}
        href={target}
        target="_blank"
        rel="noreferrer"
        data-tooltip-id={id}
        data-tooltip-wrapper="span"
      >
        {name}
      </a>
      <Tooltip
        anchorSelect={`#${id}`}
        className="pointer-events-auto h-[254px] bg-[transparent] p-0 opacity-100"
        afterShow={animatedStart}
        afterHide={animatedReset}
      >
        <animated.div
          style={{ height, opacity }}
          className="overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.12)]"
        >
          <OGCard OGInfo={OGInfo} target={target} />
        </animated.div>
      </Tooltip>
    </>
  );
}

export default OGA;
