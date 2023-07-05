import Image from 'next/image';
import Link from 'next/link';
import useOGInfo, { OGInfo } from '@/common/useOGInfo';
import LoadingIcon from '@/icons/loading.svg';
import clsx from 'clsx';

export interface Props {
  className?: string;
  target: string;
  staticData?: Partial<OGInfo>;
  linkTarget?: boolean;
}

function OGCard({
  className = '',
  target,
  staticData,
  linkTarget = false,
}: Props) {
  const { OGInfo, isError, isLoading } = useOGInfo(target);

  return (
    <div
      className={clsx(
        'relative flex h-[254px] w-[300px] flex-col overflow-hidden rounded-[6px] bg-[#ffffff] shadow-[0px_0px_10px_rgba(0,0,0,0.12)] dark:bg-[#121314] dark:shadow-[0px_0px_10px_rgba(255,255,255,0.12)]',
        className
      )}
    >
      {((!staticData && !OGInfo && !isLoading) || isError) && (
        <div className="flex h-full w-full items-center justify-center text-[#121314] dark:text-[#ffffff]">
          No Preview
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative h-[158px] w-full overflow-hidden">
            {(staticData?.ogImage || OGInfo?.ogImage) && (
              <Image
                src={(staticData?.ogImage || OGInfo?.ogImage) as string}
                alt="og image"
                className="object-cover"
                sizes="100vw"
                fill
              />
            )}
          </div>
          <div className="p-[14px] pb-[10px] pt-[12px]">
            <div className="mb-[8px] text-[14px] font-[700] text-[#121314] line-clamp-1 dark:text-[#ffffff]">
              {linkTarget ? (
                <Link
                  href={target}
                  target="_blank"
                  className="text-[#121314] dark:text-[#ffffff]"
                >
                  {staticData?.ogTitle || OGInfo?.ogTitle}
                </Link>
              ) : (
                staticData?.ogTitle || OGInfo?.ogTitle
              )}
            </div>
            <div className="text-[12px] text-[#737373] line-clamp-3 dark:text-[#808080]">
              {staticData?.ogDescription || OGInfo?.ogDescription}
            </div>
          </div>
        </>
      )}
      {isLoading && (
        <div className="t-0 l-0 absolute flex h-full w-full items-center justify-center gap-2 bg-[rgba(255,255,255,38%)] text-[#121314] backdrop-blur-md dark:bg-[rgba(0,0,0,38%)] dark:text-[#ffffff]">
          <LoadingIcon />
          Loading...
        </div>
      )}
    </div>
  );
}

export default OGCard;
