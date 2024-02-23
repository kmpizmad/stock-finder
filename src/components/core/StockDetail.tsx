'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useStockDetails } from '@/hooks/useStockDetails';
import useStockHistory from '@/hooks/useStockHistory';
import { capitalize } from '@/lib/utils';
import LoadingSkeleton from '../layout/LoadingSkeleton';
import { Skeleton } from '../ui/skeleton';
import ErrorMessage from './ErrorMessage';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LineElement, LinearScale, PointElement);

const chartSize: number = 800;

export default function StockDetail({ symbol }: StockDetailProps): JSX.Element {
  const { data, isLoading, error } = useStockDetails(symbol);
  const { data: history, isLoading: isHistoryLoading, error: historyError } = useStockHistory(symbol);

  if (!!error || typeof data === 'string') {
    return (
      <ErrorMessage
        message={error?.message || JSON.stringify(data)}
        resource={symbol}
      />
    );
  }

  return (
    <>
      <div className="mb-8">
        {!isLoading ? (
          <div className="grid grid-cols-1 gap-2 text-center md:text-left md:grid-cols-4 lg:grid-cols-5 place-items-center sm:grid-cols-2 sm:place-items-start md:gap-4">
            {data?.map((detail, idx) => {
              return (
                <div
                  key={`${JSON.stringify(detail)}-${idx}`}
                  className="w-full"
                >
                  <div className="text-lg font-bold">{capitalize(detail.name)}</div>
                  <div className="font-light">{detail.value}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <LoadingSkeleton
            centered
            noAvatar
          />
        )}
      </div>
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Last 30 day</h1>
        {!isHistoryLoading ? (
          !historyError && typeof history !== 'string' ? (
            <div>
              <Line
                data={{
                  labels: history?.labels,
                  datasets: [...(history?.datasets.high_low || []), ...(history?.datasets.open_close || [])],
                }}
                className="mx-auto"
                style={{ width: chartSize, height: chartSize / 2, maxWidth: '100%' }}
              />
            </div>
          ) : (
            <ErrorMessage
              message={historyError?.message || JSON.stringify(history)}
              resource={symbol}
            />
          )
        ) : (
          <Skeleton className="mx-auto h-[400px] w-[800px] max-w-full rounded-xl aspect-[2/1]" />
        )}
      </div>
    </>
  );
}

type StockDetailProps = { symbol: string };
