import axios from 'axios';
import { useEffect, useState } from 'react';

export interface Props {
  target: string;
}

export interface ogInfo {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

function OGCard({ target }: Props) {
  const [ogInfo, setOgInfo] = useState<ogInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        '/api/getOGInfo',
        { target },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(({ data }) => {
        if (data.msg) return;
        const { ogTitle, ogDescription, ogImage } = data;
        const ogInfo =
          !ogTitle && !ogDescription && !ogImage
            ? null
            : { ogTitle, ogDescription, ogImage };

        setOgInfo(ogInfo);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative flex flex-col w-[300px] h-[254px] rounded-[6px] shadow-[0px_0px_10px_rgba(0,0,0,0.12)] overflow-hidden bg-[#ffffff]">
      {!ogInfo && !loading && (
        <div className="flex justify-center items-center w-full h-full text-[#121314]">
          No Preview
        </div>
      )}
      {ogInfo && (
        <>
          <div className="w-full h-[158px] overflow-hidden">
            {ogInfo.ogImage && <img src={ogInfo.ogImage} className="w-full" />}
          </div>
          <div className="p-[14px] pt-[12px] pb-[10px]">
            <div className="text-[#121314] text-[14px] font-[700] mb-[8px] line-clamp-1">
              {ogInfo.ogTitle}
            </div>
            <div className="text-[#737373] text-[12px] line-clamp-3">
              {ogInfo.ogDescription}
            </div>
          </div>
        </>
      )}
      {loading && (
        <div className="absolute flex justify-center items-center gap-2 bg-[rgba(255,255,255,38%)] backdrop-blur-md w-full h-full t-0 l-0 text-[#121314]">
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
