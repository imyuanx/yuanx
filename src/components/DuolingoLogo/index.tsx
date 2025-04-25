import DuolingoCard from '@/components/DuolingoCard';
import DuolingoLogoIcon from '@/icons/duolingo-logo.svg';
import { animated, easings, useSpringValue } from 'react-spring';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function DuolingoLogo() {
  const scale = useSpringValue(0.95, {
    config: { duration: 200, easing: easings.linear },
  });
  const opacity = useSpringValue(0, { config: { duration: 200 } });

  function animatedStart() {
    scale.start(1);
    opacity.start(1);
  }

  function animatedReset() {
    scale.start(0.95);
    opacity.start(0.5);
  }

  return (
    <>
      <DuolingoLogoIcon
        id="duolingo-card"
        data-tooltip-wrapper="span"
        className="inline h-[22px] align-middle"
      />
      <Tooltip
        anchorSelect={'#duolingo-card'}
        className="pointer-events-auto h-[254px] bg-[transparent] p-0 opacity-100"
        afterShow={animatedStart}
        afterHide={animatedReset}
      >
        <animated.div
          style={{ opacity, scale }}
          className="overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.12)]"
        >
          <DuolingoCard />
        </animated.div>
      </Tooltip>
    </>
  );
}

export default DuolingoLogo;
