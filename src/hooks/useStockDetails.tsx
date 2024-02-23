import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { DetailResponse } from '@/interfaces/api';
import { API_KEY } from '@/env';

export function useStockDetails(symbol: string) {
  return useQuery<DetailResponse, Error, MappedDetail[] | string, [string, string]>({
    queryKey: ['stockDetails', symbol],
    queryFn: async ({ queryKey }) => {
      const [_, sym] = queryKey;
      const { data } = await axios.get<DetailResponse>(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${sym}&apikey=${API_KEY}`
        // 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo'
      );
      return data;
    },
    enabled: !!symbol,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: data => {
      if (!!data.Information) return data.Information;
      const result: MappedDetail[] = [];
      for (const [key, value] of Object.entries(data['Global Quote']!)) {
        result.push({ name: key.substring(3).trim(), value });
      }
      return result;
    },
  });
}

type MappedDetail = { name: string; value: string };
