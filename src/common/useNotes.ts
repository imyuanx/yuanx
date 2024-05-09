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

export type AddNote = {
  arg: {
    title: string;
    content: string;
    x: number;
    y: number;
  };
};

const BASE_URL = '/api/notes';

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
  const { trigger: addNoteTrigger } = useSWRMutation(BASE_URL, addNote);

  function updateNotePosition(
    url: string,
    { arg }: { arg: UpdateNotePosition }
  ) {
    const { id, position } = arg;
    return axios.put(`${url}/${id}`, { data: position });
  }

  function addNote(url: string, { arg }: AddNote) {
    return axios.post(url, { data: arg });
  }

  return {
    noteList: data as NoteInfo[] | null,
    setNotePositionTrigger,
    addNoteTrigger,
    isLoading,
    isError: error,
    mutate,
  };
}
