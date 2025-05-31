import useSWRImmutable from "swr/immutable";

export default function useData(count: number) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWRImmutable(
    `http://192.168.31.94:3000/${count}`,
    fetcher,
    {
      refreshInterval: 0
    }
  );
  
  return {
    data,
    error,
    isLoading,
  };
}
