import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import country from '@/config/country.json';

import useDuolingoInfo from '@/common/useDuolingoInfo';

import DuolingoDuoWhistlingLottie from '@/icons/duolingo-duo-whistling.json';
import DuolingoHotIcon from '@/icons/duolingo-hot.svg';
import DuolingoIconsIcon from '@/icons/duolingo-icons.svg';
import DuolingoLightningGreenIcon from '@/icons/duolingo-lightning-green.svg';

import Avatar from './Avatar';
import { DuolingoCalendar, DuolingoLanguage } from './types';
import { processDuolingoCalendar, processDuolingoLanguages } from './utils';

// 动态导入Lottie组件以避免SSR问题
// https://github.com/airbnb/lottie-web/issues/2739
// https://github.com/airbnb/lottie-web/pull/3096
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// 根据语言获取国旗图标Y坐标位置
function getFlagY(language: string): string {
  const index = country.findIndex((countryItem) => countryItem === language);
  return `-${index * 66 + 23}`;
}

// 图表点图标组件
function DotIcon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <DuolingoLightningGreenIcon
      className="text-white dark:text-[#121314]"
      key={`${cx}-${cy}`}
      x={cx - 5}
      y={cy - 5}
      width={10}
      height={10}
    />
  );
}

// 用户信息区域组件
function UserInfoSection({
  username,
  streak,
}: {
  username: string;
  streak: number;
}) {
  return (
    <div className="flex items-center gap-3 border-b-[0.5px] border-solid border-[#F2F2F2] pb-4 dark:border-[#222222]">
      <Avatar />
      <div className="flex flex-col gap-1">
        <div className="text-xl font-semibold leading-6">{username}</div>
        <div className="flex items-center gap-1 text-sm">
          {`${streak} day streak`}
          <DuolingoHotIcon className="w-3.5" />
        </div>
      </div>
    </div>
  );
}

// 语言信息区域组件
function LanguageInfoSection({
  topLanguage,
}: {
  topLanguage: DuolingoLanguage;
}) {
  return (
    <div className="mb-auto mt-3 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <div className="h-[19px] w-6 overflow-hidden">
          <DuolingoIconsIcon
            width={24}
            style={{ marginTop: getFlagY(topLanguage?.language) }}
          />
        </div>
        <div className="text-sm">{topLanguage?.language_string}</div>
      </div>
      <div className="flex items-center gap-0.5">
        <DuolingoLightningGreenIcon className="size-4 text-white dark:text-[#121314]" />
        {`${topLanguage?.points} points`}
      </div>
    </div>
  );
}

// 活动图表组件
function ActivityChart({ calendar }: { calendar: DuolingoCalendar[] }) {
  // 固定的网格线数量
  const gridLineCount = 4;

  return (
    <div className="-mx-1 -mb-3.5">
      <AreaChart
        width={259 + 10}
        height={100}
        data={calendar}
        margin={{ top: 6, right: 10, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93F4A5" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#93F4A5" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke="#F1F4F8"
          horizontal={true}
          vertical={false}
          strokeDasharray="4 4"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10 }}
          type="category"
          interval="preserveStartEnd"
        />
        <YAxis
          type="number"
          domain={[0, 'dataMax']}
          interval={0}
          tickCount={gridLineCount}
          axisLine={false}
          tickLine={false}
          hide={true}
        />
        <Area
          type="monotone"
          dataKey="experience"
          stroke="#1DC300"
          animationDuration={0}
          fill="url(#colorGradient)"
          dot={({ cx, cy }) => <DotIcon cx={cx} cy={cy} />}
        />
      </AreaChart>
    </div>
  );
}

// 加载或错误状态组件
function LoadingErrorOverlay({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}) {
  if (!isLoading && !isError) return null;

  return (
    <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white/30 text-xl font-light backdrop-blur dark:bg-black/30">
      {isLoading && (
        <>
          <Lottie className="w-44" animationData={DuolingoDuoWhistlingLottie} />
          <div className="duolingo-strip-light absolute bottom-0 h-1 w-full"></div>
        </>
      )}
      {!isLoading && isError && 'Sorry, there has an error.'}
    </div>
  );
}

function DuolingoCard() {
  const {
    duolingoInfo = { calendar: [], languages: [], username: '', streak: 0 },
    isError,
    isLoading,
  } = useDuolingoInfo();
  const [calendar, setCalendar] = useState<DuolingoCalendar[]>([]);
  const [topLanguage, setTopLanguage] = useState<DuolingoLanguage>({
    language: 'EN',
    points: 0,
    language_string: 'English',
  });

  // 处理数据
  useEffect(() => {
    if (duolingoInfo?.calendar) {
      const processedCalendar = processDuolingoCalendar(duolingoInfo.calendar);
      setCalendar(processedCalendar);
    }

    if (duolingoInfo?.languages) {
      const topLanguage = processDuolingoLanguages(duolingoInfo.languages);
      setTopLanguage(topLanguage);
    }
  }, [duolingoInfo]);

  const cardClasses =
    'relative box-border flex h-[254px] w-[300px] flex-col overflow-hidden ' +
    'rounded-md bg-[#ffffff] px-5 py-4 text-sm font-normal text-[#121314] ' +
    'shadow-[0px_0px_10px_rgba(0,0,0,0.12)] dark:bg-[#121314] dark:!text-white ' +
    'dark:shadow-[0px_0px_10px_rgba(255,255,255,0.12)]';

  return (
    <div className={cardClasses}>
      <UserInfoSection
        username={duolingoInfo.username}
        streak={duolingoInfo.streak}
      />
      <LanguageInfoSection topLanguage={topLanguage} />
      <ActivityChart calendar={calendar} />
      <LoadingErrorOverlay isLoading={isLoading} isError={isError} />
    </div>
  );
}

export default DuolingoCard;
