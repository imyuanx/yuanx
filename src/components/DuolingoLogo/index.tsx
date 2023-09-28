import DuolingoCard from '@/components/DuolingoCard';
import DuolingoLogoIcon from '@/icons/duolingo-logo.svg';
import { animated, useSpringValue } from 'react-spring';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function DuolingoLogo() {
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
          style={{ height, opacity }}
          className="overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.12)]"
        >
          <DuolingoCard />
        </animated.div>
      </Tooltip>
    </>
  );
}

export default DuolingoLogo;
