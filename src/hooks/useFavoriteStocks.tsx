import { SearchResponse } from '@/interfaces/api';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import { API_KEY } from '@/env';

export default function useFavoriteStocks(symbols: string[]) {
  return useQueries({
    queries: symbols.map(symbol => {
      return {
        queryKey: ['favoriteSymbol', symbol],
        queryFn: async ({ queryKey }: any) => {
          const [_, sym] = queryKey;
          const { data } = await axios.get<SearchResponse>(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${sym}&apikey=${API_KEY}`
            // 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo'
          );
          return data;
        },
        enabled: !!symbols.length,
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: Infinity,
        select: (data: SearchResponse) => {
          return data.bestMatches.find(x => +x['9. matchScore'] === 1);
        },
      };
    }),
  });
}
