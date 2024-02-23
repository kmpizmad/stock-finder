import StockDetail from '@/components/core/StockDetail';
import { PageParams } from '@/interfaces/page';

export default function StockDetails({ params }: PageParams<{ symbol: string }>) {
  return (
    <div>
      <h1>Details: {params.symbol}</h1>
      <StockDetail symbol={params.symbol} />
    </div>
  );
}
