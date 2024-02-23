'use client';

import BackButton from '@/components/layout/BackButton';
import StockDetail from '@/components/core/StockDetail';
import Heading from '@/components/layout/Heading';
import Separator from '@/components/layout/Separator';
import { PageParams } from '@/interfaces/page';
import dynamic from 'next/dynamic';

const Favorite = dynamic(() => import('@/components/layout/Favorite'), { ssr: false });

export default function StockDetails({ params }: PageParams<{ symbol: string }>) {
  return (
    <div>
      <div className="detail-header">
        <BackButton />
        <Heading title={`${params.symbol} details`} />
        <Favorite symbol={params.symbol} />
      </div>
      <Separator />
      <StockDetail symbol={params.symbol} />
    </div>
  );
}
