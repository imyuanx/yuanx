export type DuolingoCalendar = {
  name: string;
  experience: number;
  datetime: number;
};

export type DuolingoLanguage = {
  language: string;
  points: number;
  language_string: string;
};

export type DuolingoRawCalendarItem = {
  datetime: number;
  improvement: number;
};

export type DuolingoRawLanguage = {
  language: string;
  points: number;
  learning: boolean;
  language_string: string;
};
