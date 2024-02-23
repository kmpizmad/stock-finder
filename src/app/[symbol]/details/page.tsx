import StockDetail from '@/components/core/StockDetail';
import { PageParams } from '@/interfaces/page';

export default function StockDetails({ params }: PageParams<{ symbol: string }>) {
  return (
    <div>
      <h1 className="w-full text-5xl font-bold text-center">Details</h1>
      <div className="w-full h-px my-3 bg-foreground"></div>
      <StockDetail symbol={params.symbol} />
    </div>
  );
}
