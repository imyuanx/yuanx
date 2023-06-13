// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const DUOLINGO_USERNAME = process.env.DUOLINGO_USERNAME;
const DUOLINGO_TOKEN = process.env.DUOLINGO_TOKEN;

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

export type DuolingoInfo = {
  languages: DuolingoLanguage[];
  calendar: Omit<DuolingoCalendar, 'skill_id'>[];
  streak: number;
  username: string;
};

export type ErrData = {
  msg: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DuolingoInfo | ErrData>,
) {
  if (!DUOLINGO_USERNAME || !DUOLINGO_TOKEN) {
    res.status(500).json({
      msg: 'Please configure your `DUOLINGO_USERNAME` and `DUOLINGO_TOKEN` in the environment variables.',
    });
    return;
  }
  const target = `https://www.duolingo.com/users/${DUOLINGO_USERNAME}`;
  axios
    .get(target, {
      headers: {
        'User-Agent': '',
        Authorization: `Bearer ` + DUOLINGO_TOKEN,
      },
    })
    .then((response) => {
      const {
        languages,
        calendar,
        tracking_properties: { streak, username },
      } = response.data;
      res.status(200).json({
        languages,
        calendar: (calendar as DuolingoCalendar[]).map(
          ({ skill_id, ...calendarItem }) => calendarItem,
        ),
        streak,
        username,
      });
    })
    .catch((error) => {
      console.log('getDuolingoInfo/error', error);
      res.status(error?.response?.status || 500).json({ msg: error?.message });
    });
}
