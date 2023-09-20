import axios from 'axios';
import useSWR from 'swr';

export type NoteInfoData = {
  id: number;
  attributes: {
    content: string;
    createdAt: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
    x: number;
    y: number;
  };
};

export type NoteInfo = { id: number } & NoteInfoData['attributes'];

const BASE_URL = 'https://yuanx-strapi.zeabur.app/api/notes';

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    const data = res.data.data;
    return data?.map((item: NoteInfoData) => ({
      id: item.id,
      content: item.attributes.content,
      createdAt: item.attributes.createdAt,
      publishedAt: item.attributes.publishedAt,
      title: item.attributes.title,
      updatedAt: item.attributes.updatedAt,
      x: item.attributes.x,
      y: item.attributes.y,
    }));
  });

export type setNoteXY = (
  id: number,
  position: { x: number; y: number }
) => Promise<any>;

export default function useNotes() {
  const { data, error, isLoading } = useSWR(BASE_URL, fetcher);

  const setNoteXY: setNoteXY = async (id, position) => {
    return axios.put(`${BASE_URL}/${id}`, {
      data: { x: position.x, y: position.y },
    });
  };

  return {
    noteList: data as NoteInfo[] | null,
    setNoteXY,
    isLoading,
    isError: error,
  };
}
