import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { capitalize } from '@/lib/utils';
import { DetailResponse } from '@/interfaces/api';

export function useStockDetails(symbol: string) {
  return useQuery<DetailResponse, Error, MappedDetail[], [string, string]>({
    queryKey: ['stockDetails', symbol],
    queryFn: async ({ queryKey }) => {
      const [_, sym] = queryKey;
      const { data } = await axios.get<DetailResponse>(
        // `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${API_KEY}`
        'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo'
      );
      return data;
    },
    enabled: !!symbol,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: data => {
      const result: MappedDetail[] = [];
      for (const [key, value] of Object.entries(data['Global Quote'])) {
        const name = key.substring(3).trim();
        result.push({ name: capitalize(name), value });
      }
      return result;
    },
  });
}

type MappedDetail = { name: string; value: string };
