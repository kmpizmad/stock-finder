import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ChartDataset } from 'chart.js';
import { DailyHistoryResponse } from '@/interfaces/api';
import { API_KEY } from '@/env';

export default function useStockHistory(symbol: string) {
  return useQuery<DailyHistoryResponse, Error, MappedHistory, [string, string]>({
    queryKey: ['stockHistory', symbol],
    queryFn: async ({ queryKey }) => {
      const [_, sym] = queryKey;
      const { data } = await axios.get<DailyHistoryResponse>(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${sym}&apikey=${API_KEY}`
        // 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo'
      );
      return data;
    },
    enabled: !!symbol,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: data => {
      const labels = Object.keys(data['Time Series (Daily)']).slice(0, 30);
      const commonOptions: Omit<ChartDataset<'line', string[]>, 'data'> = {
        tension: 0.3,
      };
      const highDataset: ChartDataset<'line', string[]> = {
        label: 'High',
        data: Object.values(data['Time Series (Daily)'])
          .map(x => {
            return x['2. high'];
          })
          .slice(0, 30),
        borderColor: '#DC143C',
        backgroundColor: '#DC143C',
        ...commonOptions,
      };
      const lowDataset: ChartDataset<'line', string[]> = {
        label: 'Low',
        data: Object.values(data['Time Series (Daily)'])
          .map(x => {
            return x['3. low'];
          })
          .slice(0, 30),
        borderColor: '#FFB347',
        backgroundColor: '#FFB347',
        ...commonOptions,
      };
      const openDataset: ChartDataset<'line', string[]> = {
        label: 'Open',
        data: Object.values(data['Time Series (Daily)'])
          .map(x => {
            return x['1. open'];
          })
          .slice(0, 30),
        borderColor: '#77BFA3',
        backgroundColor: '#77BFA3',
        ...commonOptions,
      };
      const closeDataset: ChartDataset<'line', string[]> = {
        label: 'Close',
        data: Object.values(data['Time Series (Daily)'])
          .map(x => {
            return x['4. close'];
          })
          .slice(0, 30),
        borderColor: '#2C3E50',
        backgroundColor: '#2C3E50',
        ...commonOptions,
      };
      const volumeDataset: ChartDataset<'line', string[]> = {
        label: 'Volume',
        data: Object.values(data['Time Series (Daily)'])
          .map(x => {
            return x['6. volume'];
          })
          .slice(0, 30),
        borderColor: '#EAEAEA',
        backgroundColor: '#EAEAEA',
        ...commonOptions,
      };

      return {
        labels,
        datasets: {
          high_low: [highDataset, lowDataset],
          open_close: [openDataset, closeDataset],
          volume: [volumeDataset],
        },
      };
    },
  });
}

type MappedHistory = {
  labels: string[];
  datasets: {
    high_low: ChartDataset<'line', string[]>[];
    open_close: ChartDataset<'line', string[]>[];
    volume: ChartDataset<'line', string[]>[];
  };
};
