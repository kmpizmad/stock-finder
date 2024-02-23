import FavoriteList from '@/components/core/FavoriteList';
import Heading from '@/components/layout/Heading';

export default function Favorites(): JSX.Element {
  return (
    <div>
      <Heading title="Favorite stocks" />
      <FavoriteList />
    </div>
  );
}
