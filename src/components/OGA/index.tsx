import { useMemo } from 'react';
import OGCard from '@/components/OGCard';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export interface Props {
  className: string;
  target: string;
  name: string;
}

function OGA({ className, target, name }: Props) {
  const id = useMemo(() => `og-a-${name.replaceAll(' ', '')}`, [name]);

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
        className="pointer-events-auto bg-[transparent] p-0 opacity-100 shadow-[0px_0px_10px_rgba(0,0,0,0.12)]"
      >
        <OGCard target={target} />
      </Tooltip>
    </>
  );
}

export default OGA;
