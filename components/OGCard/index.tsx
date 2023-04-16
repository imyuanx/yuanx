import useOGInfo from '../../common/useOGInfo';

export interface Props {
  target: string;
}

function OGCard({ target }: Props) {
  const { OGInfo, isError, isLoading } = useOGInfo(target);

  return (
    <div className="relative flex flex-col w-[300px] h-[254px] rounded-[6px] shadow-[0px_0px_10px_rgba(0,0,0,0.12)] dark:shadow-[0px_0px_10px_rgba(255,255,255,0.12)] overflow-hidden bg-[#ffffff] dark:bg-[#121314]">
      {((!OGInfo && !isLoading) || isError) && (
        <div className="flex justify-center items-center w-full h-full text-[#121314] dark:text-[#ffffff]">
          No Preview
        </div>
      )}
      {OGInfo && (
        <>
          <div className="w-full h-[158px] overflow-hidden">
            {OGInfo.ogImage && <img src={OGInfo.ogImage} className="w-full" />}
          </div>
          <div className="p-[14px] pt-[12px] pb-[10px]">
            <div className="text-[#121314] dark:text-[#ffffff] text-[14px] font-[700] mb-[8px] line-clamp-1">
              {OGInfo.ogTitle}
            </div>
            <div className="text-[#737373] dark:text-[#808080] text-[12px] line-clamp-3">
              {OGInfo.ogDescription}
            </div>
          </div>
        </>
      )}
      {isLoading && (
        <div className="absolute flex justify-center items-center gap-2 bg-[rgba(255,255,255,38%)] dark:bg-[rgba(0,0,0,38%)] backdrop-blur-md w-full h-full t-0 l-0 text-[#121314] dark:text-[#ffffff]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="black"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeDasharray="15"
              strokeDashoffset="15"
              strokeLinecap="round"
              strokeWidth="1.6"
              d="M12 3C16.9706 3 21 7.02944 21 12"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.3s"
                values="15;0"
              />
              <animateTransform
                attributeName="transform"
                dur="1.3s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </svg>
          Loading...
        </div>
      )}
    </div>
  );
}

export default OGCard;
