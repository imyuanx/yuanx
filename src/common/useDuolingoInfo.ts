import type { DuolingoInfo } from '@/pages/api/getDuolingoInfo';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    return res.data;
  });

export default function useDuolingoInfo() {
  const { data, error, isLoading } = useSWR('/api/getDuolingoInfo', fetcher);

  return {
    duolingoInfo: data as DuolingoInfo,
    isLoading,
    isError: error,
  };
}
