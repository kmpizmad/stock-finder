import Favorite from '@/components/core/Favorite';
import StockDetail from '@/components/core/StockDetail';
import { PageParams } from '@/interfaces/page';

export default function StockDetails({ params }: PageParams<{ symbol: string }>) {
  return (
    <div>
      <div className="detail-header">
        <div></div>
        <h1 className="w-full text-5xl font-bold text-center">{params.symbol} details</h1>
        <Favorite symbol={params.symbol} />
      </div>
      <div className="w-full h-px my-4 bg-foreground"></div>
      <StockDetail symbol={params.symbol} />
    </div>
  );
}
