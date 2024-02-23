import Heading from '@/components/layout/Heading';
import dynamic from 'next/dynamic';

const FavoriteList = dynamic(() => import('@/components/core/FavoriteList'), { ssr: false });

export default function Favorites(): JSX.Element {
  return (
    <div>
      <Heading title="Favorite stocks" />
      <FavoriteList />
    </div>
  );
}
