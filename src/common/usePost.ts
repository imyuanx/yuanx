import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function usePost(postId: string) {
  const { data, error, isLoading } = useSWR(`/posts/${postId}.md`, fetcher);

  return {
    post: data as string,
    isLoading,
    isError: error,
  };
}
