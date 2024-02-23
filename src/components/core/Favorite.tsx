'use client';

import { useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Favorite({ symbol }: FavoriteProps): JSX.Element {
  const favorites = useMemo(() => JSON.parse(localStorage.getItem('favorites') || '[]') as string[], []);
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
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setIsFavorite(prev => !prev);
      }}
    />
  );
}

type FavoriteProps = { symbol: string };
