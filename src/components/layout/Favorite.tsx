'use client';

import { useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Favorite({ symbol, initialFavorites, onFavorite }: FavoriteProps): JSX.Element {
  const favorites = useMemo(
    () => initialFavorites || (JSON.parse(window.localStorage.getItem('favorites') || '[]') as string[]),
    [initialFavorites]
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(favorites.includes(symbol));

  return (
    <Star
      className={cn('transition-all cursor-pointer hover:text-yellow-500 justify-self-end hover:fill-current', {
        'text-yellow-500 fill-current': isFavorite,
      })}
      width={32}
      height={32}
      onClick={() => {
        let newFavorites: string[] = [];
        if (isFavorite) {
          newFavorites = favorites.filter(x => x !== symbol);
        } else {
          const set = new Set([...favorites, symbol]);
          newFavorites = Array.from(set);
        }
        window.localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setIsFavorite(prev => !prev);
        if (onFavorite) onFavorite(newFavorites);
      }}
    />
  );
}

type FavoriteProps = {
  symbol: string;
  initialFavorites?: string[];
  onFavorite?: (favorites: string[]) => void;
};
