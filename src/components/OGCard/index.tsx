import Image from 'next/image';
import useOGInfo, { OGInfo } from '@/common/useOGInfo';
import LoadingIcon from '@/icons/loading.svg';

export interface Props {
  target: string;
  staticData?: Partial<OGInfo>;
}

function OGCard({ target, staticData }: Props) {
  const { OGInfo, isError, isLoading } = useOGInfo(target);

  return (
    <div className="relative flex flex-col w-[300px] h-[254px] rounded-[6px] shadow-[0px_0px_10px_rgba(0,0,0,0.12)] dark:shadow-[0px_0px_10px_rgba(255,255,255,0.12)] overflow-hidden bg-[#ffffff] dark:bg-[#121314]">
      {((!OGInfo && !isLoading) || isError) && (
        <div className="flex justify-center items-center w-full h-full text-[#121314] dark:text-[#ffffff]">
          No Preview
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative w-full h-[158px] overflow-hidden">
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
          <div className="p-[14px] pt-[12px] pb-[10px]">
            <div className="text-[#121314] dark:text-[#ffffff] text-[14px] font-[700] mb-[8px] line-clamp-1">
              {staticData?.ogTitle || OGInfo?.ogTitle}
            </div>
            <div className="text-[#737373] dark:text-[#808080] text-[12px] line-clamp-3">
              {staticData?.ogDescription || OGInfo?.ogDescription}
            </div>
          </div>
        </>
      )}
      {isLoading && (
        <div className="absolute flex justify-center items-center gap-2 bg-[rgba(255,255,255,38%)] dark:bg-[rgba(0,0,0,38%)] backdrop-blur-md w-full h-full t-0 l-0 text-[#121314] dark:text-[#ffffff]">
          <LoadingIcon />
          Loading...
        </div>
      )}
    </div>
  );
}

export default OGCard;
