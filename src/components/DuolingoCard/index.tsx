import { useEffect, useState } from 'react';
import useDuolingoInfo from '@/common/useDuolingoInfo';
import country from '@/config/country.json';
import DuolingoDuoWhistlingLottie from '@/icons/duolingo-duo-whistling.json';
import DuolingoHotIcon from '@/icons/duolingo-hot.svg';
import DuolingoIconsIcon from '@/icons/duolingo-icons.svg';
import DuolingoLightningIcon from '@/icons/duolingo-lightning.svg';
import DuolingoLogoIcon from '@/icons/duolingo-logo.svg';
import dayjs from 'dayjs';
import Lottie from 'lottie-react';
import { Area, AreaChart, XAxis } from 'recharts';

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

function getDayGap(datetime1: number, datetime2: number) {
  return Math.abs(
    dayjs(dayjs(datetime1).format('YYYY-MM-DD')).diff(
      dayjs(datetime2).format('YYYY-MM-DD'),
      'day'
    )
  );
}

function getFlagY(language: string) {
  const index = country.findIndex((countryItem) => countryItem === language);
  return `-${index * 66 + 23}`;
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
            dateIsSame(accItem.datetime, cur.datetime)
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
        .reduce((acc, cur) => {
          if (acc.length === 0) return [cur];
          if (acc.length === 7) return acc;
          const lastCalendar = acc[0];
          const gap = getDayGap(cur.datetime, lastCalendar.datetime) - 1;
          if (gap === 0) return [cur, ...acc];
          const patchLen = 7 - acc.length - gap >= 0 ? gap : acc.length - gap;
          const patchCalendar = Array.from({ length: patchLen }, (v, k) => {
            const patchDay = dayjs(cur.datetime).add(k + 1, 'day');
            return {
              name: patchDay.format('D'),
              experience: 0,
              datetime: patchDay.valueOf(),
            };
          });
          return [cur, ...patchCalendar, ...acc];
        }, [] as DuolingoCalendar[]);
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
        newLanguages.length > 2 ? newLanguages.slice(0, 2) : newLanguages
      );
    }
  }, [duolingoInfo]);

  return (
    <div className="relative box-border flex h-[254px] w-[300px] flex-col overflow-hidden rounded-[6px] bg-[#ffffff] px-[20px] py-[18px] text-[14px] font-normal text-[#121314] shadow-[0px_0px_10px_rgba(0,0,0,0.12)] dark:bg-[#121314] dark:!text-white dark:shadow-[0px_0px_10px_rgba(255,255,255,0.12)]">
      <DuolingoLogoIcon className="absolute right-[10px] top-[16px] w-[145px] opacity-[0.16]" />
      <div className="mb-[20px] flex flex-col gap-[4px]">
        <div className="text-[24px] font-bold">{duolingoInfo?.username}</div>
        <div className="flex items-center gap-[2px]">
          {`${duolingoInfo?.streak} day streak`}
          <DuolingoHotIcon className="w-[16px]" />
        </div>
      </div>
      <div className="mb-[8px] flex justify-between gap-[8px]">
        {languages.map((language) => (
          <div
            key={language.language}
            className="box-border h-[76px] w-full rounded-[6px] border-[2px] border-solid border-[#E5E5E5] px-[10px] py-[8px] dark:border-[#E5E5E5]/20"
          >
            <div className="flex items-center gap-[6px]">
              <div className="h-[19px] w-[24px] overflow-hidden">
                <DuolingoIconsIcon
                  width={24}
                  style={{ marginTop: getFlagY(language.language) }}
                />
              </div>
              <div className="font-medium uppercase">{language.language}</div>
            </div>
            <div className="my-[7.5px] block h-[1px] w-full bg-[#F2F2F2] dark:bg-[#F2F2F2]/20" />
            <div className="flex items-center gap-[5px] text-[12px] font-normal">
              <DuolingoLightningIcon />
              {`${language.points} points`}
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
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white/30 text-xl font-light backdrop-blur dark:bg-black/30">
          {isLoading && (
            <>
              <Lottie
                className="w-44"
                animationData={DuolingoDuoWhistlingLottie}
              />
              <div className="absolute bottom-0 w-full h-1 duolingo-strip-light"></div>
            </>
          )}
          {!isLoading && isError && 'Sorry, there has an error.'}
        </div>
      )}
    </div>
  );
}

export default DuolingoCard;
