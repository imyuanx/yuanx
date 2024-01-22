import axios from 'axios';
import dayjs from 'dayjs';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export type NoteInfoData = {
  id: number;
  attributes: {
    author?: string;
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

type UpdateNotePosition = {
  id: number;
  position: { x: number; y: number };
};

export type addNote = (
  title: string,
  content: string,
  x: number,
  y: number
) => Promise<any>;

const BASE_URL = 'https://yuanx-strapi.zeabur.app/api/notes';

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    const data = res.data.data;
    return data?.map((item: NoteInfoData) => ({
      id: item.id,
      content: item.attributes.content,
      createdAt: dayjs(item.attributes.createdAt).format('YYYY.MM.DD'),
      publishedAt: item.attributes.publishedAt,
      title: item.attributes.title,
      updatedAt: item.attributes.updatedAt,
      x: item.attributes.x,
      y: item.attributes.y,
      author: item.attributes?.author
        ? `@${item.attributes.author}`
        : '@visitor',
    }));
  });

export default function useNotes() {
  const { data, error, isLoading, mutate } = useSWR(BASE_URL, fetcher);
  const { trigger: setNotePositionTrigger } = useSWRMutation(
    BASE_URL,
    updateNotePosition
  );

  function updateNotePosition(
    url: string,
    { arg: { id, position } }: { arg: UpdateNotePosition }
  ) {
    return axios.put(`${url}/${id}`, { data: position });
  }

  const addNote: addNote = async (title, content, x, y) => {
    return axios.post(BASE_URL, {
      data: { title, content, x, y },
    });
  };

  return {
    noteList: data as NoteInfo[] | null,
    setNotePositionTrigger,
    addNote,
    isLoading,
    isError: error,
    mutate,
  };
}
