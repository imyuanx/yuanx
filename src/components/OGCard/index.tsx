import Image from 'next/image';
import useOGInfo from '@/common/useOGInfo';
import LoadingIcon from '@/icons/loading.svg';

export interface Props {
  target: string;
}

function OGCard({ target }: Props) {
  const { OGInfo, isError, isLoading } = useOGInfo(target);

  return (
    <div className="relative flex h-[254px] w-[300px] flex-col overflow-hidden rounded-[6px] bg-[#ffffff] shadow-[0px_0px_10px_rgba(0,0,0,0.12)] dark:bg-[#121314] dark:shadow-[0px_0px_10px_rgba(255,255,255,0.12)]">
      {((!OGInfo && !isLoading) || isError) && (
        <div className="flex h-full w-full items-center justify-center text-[#121314] dark:text-[#ffffff]">
          No Preview
        </div>
      )}
      {OGInfo && (
        <>
          <div className="relative h-[158px] w-full overflow-hidden">
            {OGInfo.ogImage && (
              <Image
                src={OGInfo.ogImage}
                alt="og image"
                className="object-cover"
                sizes="100vw"
                fill
              />
            )}
          </div>
          <div className="p-[14px] pb-[10px] pt-[12px]">
            <div className="mb-[8px] text-[14px] font-[700] text-[#121314] line-clamp-1 dark:text-[#ffffff]">
              {OGInfo.ogTitle}
            </div>
            <div className="text-[12px] text-[#737373] line-clamp-3 dark:text-[#808080]">
              {OGInfo.ogDescription}
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
