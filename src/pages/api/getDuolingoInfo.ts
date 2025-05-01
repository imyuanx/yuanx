// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

// 类型定义
export type DuolingoCalendar = {
  datetime: number;
  event_type: string;
  improvement: number;
  skill_id: string;
};

export type DuolingoLanguage = {
  current_learning: boolean;
  language: string;
  language_string: string;
  learning: boolean;
  level: number;
  points: number;
  sentences_translated: number;
  streak: number;
  to_next_level: number;
};

export type AvatarStates = {
  builtAvatarStates: BuiltAvatarState[];
};

export type BuiltAvatarState = {
  inLessonExpressions: {
    correctAnswerExpressions: number[];
    incorrectAnswerExpressions: number[];
  };
  isSavedState: boolean;
  profileTabIcon: {
    lightUrl: string;
  };
  state: { [key: string]: number };
  stateId: string;
};

export type DuolingoInfo = {
  languages: DuolingoLanguage[];
  calendar: Omit<DuolingoCalendar, 'skill_id'>[];
  streak: number;
  username: string;
  userId: string;
  avatarStates?: AvatarStates;
};

export type ErrData = {
  msg: string;
};

const DUOLINGO_USERNAME = process.env.DUOLINGO_USERNAME;
const DUOLINGO_TOKEN = process.env.DUOLINGO_TOKEN;

const headers = {
  'User-Agent': '',
  Authorization: `Bearer ${DUOLINGO_TOKEN}`,
};

const validateEnvironmentVars = () => {
  if (!DUOLINGO_USERNAME || !DUOLINGO_TOKEN) {
    throw new Error('please set DUOLINGO_USERNAME and DUOLINGO_TOKEN in .env');
  }
};

const fetchUserData = async (): Promise<Partial<DuolingoInfo>> => {
  const target = `https://www.duolingo.com/users/${DUOLINGO_USERNAME}`;
  const response = await axios.get(target, { headers });

  const {
    languages,
    calendar,
    tracking_properties: { streak, username, user_id },
    fullname,
  } = response.data;

  return {
    languages,
    calendar: (calendar as DuolingoCalendar[]).map(
      ({ skill_id, ...calendarItem }) => calendarItem
    ),
    streak,
    username: fullname ?? username,
    userId: user_id,
  };
};

const fetchAvatarStates = async (userId: string): Promise<any> => {
  const timestamp = new Date().getTime();
  const url = `https://www.duolingo.com/users/${userId}/built-avatar-states?_=${timestamp}`;
  const response = await axios.get(url, { headers });
  return response.data;
};

// 主处理函数
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DuolingoInfo | ErrData>
) {
  try {
    validateEnvironmentVars();

    const userData = await fetchUserData();
    const avatarStates = await fetchAvatarStates(userData.userId as string);

    const responseData: DuolingoInfo = {
      ...(userData as DuolingoInfo),
      avatarStates,
    };

    res.status(200).json(responseData);
  } catch (error: any) {
    console.error('getDuolingoInfo/error', error);
    const statusCode = error?.response?.status || 500;
    const errorMessage = error?.message || 'getDuolingoInfo failed';

    res.status(statusCode).json({ msg: errorMessage });
  }
}
