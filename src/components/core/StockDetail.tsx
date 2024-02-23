'use client';

import { useStockDetails } from '@/hooks/useStockDetails';
import useStockHistory from '@/hooks/useStockHistory';
import { capitalize } from '@/lib/utils';
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

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LineElement, LinearScale, PointElement);

export default function StockDetail({ symbol }: StockDetailProps): JSX.Element {
  const { data } = useStockDetails(symbol);
  const { data: history } = useStockHistory(symbol);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
      <div className="grid grid-cols-1 gap-2 text-center place-items-center sm:grid-cols-2 sm:place-items-start md:gap-4">
        {data?.map((detail, idx) => {
          return (
            <div key={`${JSON.stringify(detail)}-${idx}`}>
              <div className="w-full text-lg font-bold md:w-max">{capitalize(detail.name)}</div>
              <div className="w-full font-light">{detail.value}</div>
            </div>
          );
        })}
      </div>
      <div className="justify-self-center">
        <h1 className="mb-4 text-2xl font-bold">Last 30 day</h1>
        <div>
          <Line
            data={{
              labels: history?.labels,
              datasets: [...(history?.datasets.high_low || []), ...(history?.datasets.open_close || [])],
            }}
          />
        </div>
      </div>
    </div>
  );
}

type StockDetailProps = { symbol: string };
