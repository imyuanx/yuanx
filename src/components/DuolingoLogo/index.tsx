import dynamic from 'next/dynamic';
import DuolingoLogoIcon from '@/icons/duolingo-logo.svg';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const DuolingoCard = dynamic(() => import('@/components/DuolingoCard'), {
  ssr: false,
});

function DuolingoLogo() {
  return (
    <>
      <DuolingoLogoIcon id="duolingo-card" className="h-[22px] align-middle" />
      <Tooltip
        anchorSelect={'#duolingo-card'}
        className="pointer-events-auto bg-[transparent] p-0 opacity-100 shadow-[0px_0px_10px_rgba(0,0,0,0.12)]"
      >
        <DuolingoCard />
      </Tooltip>
    </>
  );
}

export default DuolingoLogo;
