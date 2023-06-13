import dynamic from 'next/dynamic';
import { Tooltip } from 'react-tooltip';
import DuolingoLogoIcon from '@/icons/duolingo-logo.svg';
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
        className="bg-[transparent] opacity-100 p-0 pointer-events-auto shadow-[0px_0px_10px_rgba(0,0,0,0.12)]"
      >
        <DuolingoCard />
      </Tooltip>
    </>
  );
}

export default DuolingoLogo;
