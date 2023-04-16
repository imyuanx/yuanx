import useSWR from 'swr';
import axios from 'axios';

export interface OGInfo {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    const { ogTitle, ogDescription, ogImage } = res.data;
    if (!ogTitle && !ogDescription && !ogImage) return null;
    return res.data;
  });

export default function useOGInfo(target: string) {
  const { data, error, isLoading } = useSWR(
    `/api/getOGInfo?target=${target}`,
    fetcher,
  );

  return {
    OGInfo: data as OGInfo | null,
    isLoading,
    isError: error,
  };
}
