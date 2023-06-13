import useSWR from 'swr';
import axios from 'axios';
import type { DuolingoInfo } from '@/pages/api/getDuolingoInfo';

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    return res.data;
  });

export default function useDuolingoInfo() {
  const { data, error, isLoading } = useSWR('/api/getDuolingoInfo', fetcher);

  return {
    duolingoInfo: data as DuolingoInfo | null,
    isLoading,
    isError: error,
  };
}
