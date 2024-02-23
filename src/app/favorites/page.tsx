import FavoriteList from '@/components/core/FavoriteList';

export default function Favorites(): JSX.Element {
  return (
    <div>
      <h1 className="w-full text-5xl font-bold text-center">Favorite stocks</h1>
      <div className="w-full h-px my-4 bg-foreground"></div>
      <FavoriteList />
    </div>
  );
}
