import { useState } from 'react';
import OGCard, { OGInfo } from '@/components/OGCard';
import LoadingIcon from '@/icons/loading.svg';
import RefreshIcon from '@/icons/refresh.svg';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export type Props = {
  link: string;
  OGInfo?: OGInfo;
};

function ProjectCard({ link, OGInfo }: Props) {
  const [isBack, setIsBack] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);

  function turnBack() {
    setIsBack(true);
  }

  function turnFront() {
    setIsBack(false);
  }

  function onModelLoad(e: Application) {
    setIsModelLoading(false);
  }

  return (
    <div className="relative perspective-1000 hover:z-10">
      <div
        className={clsx(
          'group/front transition-transform duration-1000 ease-in-out backface-hidden',
          isBack && 'rotate-y-180-reverse'
        )}
      >
        <div
          className={clsx(
            'rounded-[6px] transition-all duration-200 hover:shadow-[0px_0px_22px_rgba(0,0,0,0.16)] hover:duration-300 hover:dark:shadow-[0px_0px_22px_rgba(255,255,255,0.16)]',
            !isBack && 'hover:scale-105'
          )}
        >
          <OGCard key={link} target={link} OGInfo={OGInfo} linkTarget />
          {OGInfo?.ogModel && (
            <div
              className="absolute bottom-2 right-2 h-[18px] w-[18px] cursor-pointer opacity-0 transition-all duration-300 hover:!opacity-100 group-hover/front:opacity-30"
              onClick={turnBack}
            >
              <RefreshIcon />
            </div>
          )}
        </div>
      </div>
      <div
        className={clsx(
          'absolute left-0 top-0 h-full w-full rounded-[6px] bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.12)] transition-transform duration-1000 ease-in-out backface-hidden dark:bg-[#121314] dark:shadow-[0px_0px_10px_rgba(255,255,255,0.12)]',
          !isBack && 'rotate-y-180'
        )}
      >
        {OGInfo?.ogModel && (
          <Spline
            className="overflow-hidden rounded-[6px] bg-[#FFFFFF] dark:bg-[#121314]"
            scene={OGInfo.ogModel}
            onLoad={onModelLoad}
          />
        )}
        {isModelLoading && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-2 bg-white dark:bg-[#121314]">
            <LoadingIcon /> Loading...
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex justify-center gap-1">
          <div
            className={clsx(
              'flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[13px] bg-white/20 text-[18px] font-[450] text-white opacity-70 hover:opacity-100'
            )}
            data-tooltip-id={`project-card-3d-model-${link}-tips`}
            data-tooltip-content="It's a 3D model that you can drag or scale."
            data-tooltip-place={'bottom'}
          >
            ?
          </div>
          <Tooltip
            id={`project-card-3d-model-${link}-tips`}
            className="rounded-[5px]"
          />
          <div
            className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[13px] bg-white/20 text-white opacity-70 hover:opacity-100"
            onClick={turnFront}
          >
            <RefreshIcon className="text-[16px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
