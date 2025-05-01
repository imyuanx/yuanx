import dayjs from 'dayjs';

import {
  DuolingoCalendar,
  DuolingoLanguage,
  DuolingoRawCalendarItem,
  DuolingoRawLanguage,
} from './types';

/**
 * 检查两个日期是否为同一天
 */
export function dateIsSame(datetime1: number, datetime2: number): boolean {
  return (
    dayjs(datetime1).format('YYYYMMDD') === dayjs(datetime2).format('YYYYMMDD')
  );
}

/**
 * 计算两个日期之间的天数差
 */
export function getDayGap(datetime1: number, datetime2: number): number {
  return Math.abs(
    dayjs(dayjs(datetime1).format('YYYY-MM-DD')).diff(
      dayjs(datetime2).format('YYYY-MM-DD'),
      'day'
    )
  );
}

/**
 * 处理多邻国日历数据
 * 1. 按日期合并同一天的经验值
 * 2. 补充最近7天的数据
 */
export function processDuolingoCalendar(
  rawCalendar: DuolingoRawCalendarItem[]
): DuolingoCalendar[] {
  // 合并同一天的经验值
  const dataList = rawCalendar.reduce((acc, cur) => {
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
  }, [] as DuolingoCalendar[]);

  // 补充最近7天的数据，如果某天没有数据则经验值为0
  const completedCalendar = Array.from({ length: 7 }, (_, index) => {
    const day = dayjs()
      .subtract(6 - index, 'day')
      .format('D');

    const data = dataList.find(({ name }) => day === name);

    if (data) return data;

    return {
      name: day,
      experience: 0,
      datetime: Number(dayjs().subtract(6 - index, 'day')),
    };
  });

  return completedCalendar;
}

/**
 * 处理多邻国语言数据
 * 1. 筛选学习中的语言
 * 2. 按经验值排序
 * 3. 返回经验值最高的语言
 */
export function processDuolingoLanguages(
  languages: DuolingoRawLanguage[]
): DuolingoLanguage {
  const sortedLanguages = languages
    .filter((language) => language.learning)
    .sort((a, b) => b.points - a.points)
    .map((language) => ({
      language: language.language,
      points: language.points,
      language_string: language.language_string,
    }));

  return (
    sortedLanguages[0] || {
      language: 'EN',
      points: 0,
      language_string: 'English',
    }
  );
}
