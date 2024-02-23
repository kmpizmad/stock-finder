'use client';

import { useStockDetails } from '@/hooks/useStockDetails';

export default function StockDetail({ symbol }: StockDetailProps): JSX.Element {
  const { data } = useStockDetails(symbol);

  console.log(data);

  return (
    <div className="grid grid-cols-2 w-1/2">
      {data?.map(detail => {
        return (
          <>
            <div className="font-bold text-lg">{detail.name}</div>
            <div className="font-light">{detail.value}</div>
          </>
        );
      })}
    </div>
  );
}

type StockDetailProps = { symbol: string };
