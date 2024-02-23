import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { SearchResponse } from '@/interfaces/api';
import { API_KEY } from '@/env';

export default function useSearchStock(keyword: string) {
  const debouncedKeyword = useDebounce(keyword, 750);
  return useQuery<SearchResponse, Error, SearchResponse, [string, string]>({
    queryKey: ['searchStock', debouncedKeyword],
    queryFn: async ({ queryKey }) => {
      const [_, kw] = queryKey;
      const { data } = await axios.get<SearchResponse>(
        // `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${kw}&apikey=${API_KEY}`
        'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo'
      );
      return data;
    },
    enabled: !!keyword,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: prev => prev,
  });
}
