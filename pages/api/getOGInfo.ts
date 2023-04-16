// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import axios from 'axios';

type Data = {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
};

type ErrData = {
  msg: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrData>,
) {
  const { target } = req.query;
  if (!target || typeof target !== 'string') {
    res.status(200).json({ msg: 'Parameter error!' });
    return;
  }
  axios
    .get(target)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const ogTitle = $("meta[property='og:title']").attr('content') || '';
      const ogDescription =
        $('meta[property="og:description"]').attr('content') || '';
      const ogImage = $('meta[property="og:image"]').attr('content') || '';
      res.status(200).json({
        ogTitle: ogTitle,
        ogDescription: ogDescription,
        ogImage: ogImage,
      });
    })
    .catch((error) => {
      console.log('getOGInfo/error', error);
      res.status(200).json({ msg: error });
    });
}
