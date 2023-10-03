import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import clsx from 'clsx';

export interface OGInfo {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogModel?: string;
}

export interface Props {
  className?: string;
  target: string;
  OGInfo?: OGInfo;
  linkTarget?: boolean;
}

function OGCard({ className = '', target, OGInfo, linkTarget = false }: Props) {
  const [imgLoading, setImgLoading] = useState(true);
  function imgOnLoad() {
    setImgLoading(false);
  }

  return (
    <div
      className={clsx(
        'relative flex h-[254px] w-[300px] flex-col overflow-hidden rounded-[6px] bg-[#ffffff] shadow-[0px_0px_10px_rgba(0,0,0,0.12)] dark:bg-[#121314] dark:shadow-[0px_0px_10px_rgba(255,255,255,0.12)]',
        className
      )}
    >
      {!OGInfo ? (
        <div className="flex h-full w-full items-center justify-center text-[#121314] dark:text-[#ffffff]">
          No Preview
        </div>
      ) : (
        <>
          <div className="relative h-[158px] w-full overflow-hidden">
            {OGInfo.ogImage && (
              <>
                <Skeleton
                  className={clsx(
                    'absolute left-0 top-0 w-full h-full rounded-none',
                    !imgLoading && 'hidden'
                  )}
                />
                <Image
                  src={OGInfo.ogImage}
                  alt="og image"
                  className="object-cover"
                  sizes="100vw"
                  fill
                  onLoad={imgOnLoad}
                />
              </>
            )}
          </div>
          <div className="p-[14px] pb-[10px] pt-[12px]">
            <div className="mb-[8px] line-clamp-1 text-[14px] font-[700] text-[#121314] dark:text-[#ffffff]">
              {linkTarget ? (
                <a
                  href={target}
                  target="_blank"
                  className="text-[#121314] dark:text-[#ffffff] underline"
                >
                  {OGInfo.ogTitle}
                </a>
              ) : (
                OGInfo.ogTitle
              )}
            </div>
            <div className="line-clamp-3 text-[12px] text-[#737373] dark:text-[#808080]">
              {OGInfo.ogDescription}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OGCard;
