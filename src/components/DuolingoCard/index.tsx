import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { XAxis, AreaChart, Area } from 'recharts';
import country from '@/config/country.json';
import useDuolingoInfo from '@/common/useDuolingoInfo';
import DuolingoHotIcon from '@/icons/duolingo-hot.svg';
import DuolingoLightningIcon from '@/icons/duolingo-lightning.svg';
import DuolingoIconsIcon from '@/icons/duolingo-icons.svg';
import DuolingoLogoIcon from '@/icons/duolingo-logo.svg';

export type DuolingoCalendar = {
  name: string;
  experience: number;
  datetime: number;
};

export type DuolingoLanguage = {
  language: string;
  points: number;
};

function dateIsSame(datetime1: number, datetime2: number) {
  return (
    dayjs(datetime1).format('YYYYMMDD') === dayjs(datetime2).format('YYYYMMDD')
  );
}

function DotIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <circle
      r="2.5"
      stroke="#00C2FF"
      strokeWidth={1.3}
      fill="#fff"
      fillOpacity="1"
      width="260"
      height="32"
      className="recharts-dot recharts-area-dot"
      cx={cx}
      cy={cy}
    ></circle>
  );
}

function DuolingoCard() {
  const { duolingoInfo, isError, isLoading } = useDuolingoInfo();
  const [calendar, setCalendar] = useState<DuolingoCalendar[]>([]);
  const [languages, setLanguages] = useState<DuolingoLanguage[]>([]);

  useEffect(() => {
    const calendar = duolingoInfo?.calendar;
    const languages = duolingoInfo?.languages;
    if (calendar) {
      const newCalendar = calendar
        .reduce((acc, cur) => {
          const index = acc.findIndex((accItem) =>
            dateIsSame(accItem.datetime, cur.datetime),
          );
          if (index === -1) {
            acc.push({
              name: dayjs(cur.datetime).format('D'),
              experience: cur.improvement,
              datetime: cur.datetime,
            });
          } else {
            acc[index].experience += cur.improvement;
          }
          return acc;
        }, [] as DuolingoCalendar[])
        .sort((acc, cur) => cur.datetime - acc.datetime)
        .slice(0, 7)
        .reverse();
      setCalendar(newCalendar as DuolingoCalendar[]);
    }
    if (languages) {
      const newLanguages = languages
        .filter((language) => language.learning)
        .sort((acc, cur) => cur.points - acc.points)
        .map((language) => ({
          language: language.language,
          points: language.points,
        }));
      setLanguages(
        newLanguages.length > 2 ? newLanguages.slice(0, 2) : newLanguages,
      );
    }
  }, [duolingoInfo]);

  function getFlagY(language: string) {
    const index = country.findIndex((countryItem) => countryItem === language);
    return `-${index * 66 + 23}`;
  }

  return (
    <div
      className={`relative box-border flex flex-col w-[300px] h-[254px] rounded-[6px] shadow-[0px_0px_10px_rgba(0,0,0,0.12)] dark:shadow-[0px_0px_10px_rgba(255,255,255,0.12)] overflow-hidden bg-[#ffffff] dark:bg-[#121314] pt-[18px] pr-[20px] pb-[18px] pl-[20px] text-[14px] font-normal text-[#121314] dark:!text-white`}
    >
      <DuolingoLogoIcon className="absolute w-[145px] right-[10px] top-[16px] opacity-[0.16]" />
      <div className="flex flex-col gap-[4px] mb-[20px]">
        <div className="font-bold text-[24px]">{duolingoInfo?.username}</div>
        <div className="flex items-center gap-[2px]">
          {`${duolingoInfo?.streak} day streak`}
          <DuolingoHotIcon className="w-[16px]" />
        </div>
      </div>
      <div className="flex justify-between mb-[8px] gap-[8px]">
        {languages.map((language) => (
          <div
            key={language.language}
            className="box-border border-[2px] border-solid border-[#E5E5E5] dark:border-[#E5E5E5]/20 rounded-[6px] w-full h-[76px] pt-[8px] pr-[10px] pb-[8px] pl-[10px]"
          >
            <div className="flex items-center gap-[6px]">
              <div className="w-[24px] h-[19px] overflow-hidden">
                <DuolingoIconsIcon
                  width={24}
                  style={{ marginTop: getFlagY(language.language) }}
                />
              </div>
              <div className="uppercase font-medium">{language.language}</div>
            </div>
            <div className="h-[1px] w-full bg-[#F2F2F2] dark:bg-[#F2F2F2]/20 mt-[7.5px] mb-[7.5px]" />
            <div className="flex items-center gap-[5px] text-[12px] font-normal">
              <DuolingoLightningIcon />
              {`${language.points} 经验`}
            </div>
          </div>
        ))}
      </div>
      <AreaChart
        width={259}
        height={78}
        data={calendar}
        margin={{ top: 3, right: 3, left: 3, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93EFF4" stopOpacity={1} />
            <stop offset="100%" stopColor="#93EFF4" stopOpacity={0.16} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10 }}
          type="category"
          interval="preserveStartEnd"
        />
        <Area
          type="monotone"
          dataKey="experience"
          stroke="#00C2FF"
          animationDuration={1000}
          fill="url(#colorGradient)"
          dot={({ cx, cy }) => <DotIcon key={`${cx}-${cy}`} cx={cx} cy={cy} />}
        />
      </AreaChart>
      {(isLoading || isError) && (
        <div className="absolute left-0 top-0 flex justify-center items-center w-full h-full backdrop-blur bg-white/30 dark:bg-black/30 z-10 text-xl font-light">
          {isLoading && 'Loading...'}
          {!isLoading && isError && 'Sorry, there has an error.'}
        </div>
      )}
    </div>
  );
}

export default DuolingoCard;
