'use client';

import useFavoriteStocks from '@/hooks/useFavoriteStocks';
import { useState } from 'react';
import Favorite from './Favorite';

export default function FavoriteList(): JSX.Element {
  const [favorites, setFavorites] = useState<string[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));
  const stocks = useFavoriteStocks(favorites);

  return (
    <div>
      {stocks.map((stock, idx) => {
        return (
          <div
            key={`${JSON.stringify(stock.data)}-${idx}`}
            className="flex items-center justify-between py-4 border-b border-muted"
          >
            <div className="grid grid-cols-[repeat(2,max-content)] gap-x-4">
              <div>
                Name: {stock.data?.['2. name']} ({stock.data?.['1. symbol']})
              </div>
              <div>Type: {stock.data?.['3. type']}</div>
              <div>Region: {stock.data?.['4. region']}</div>
            </div>
            <div>
              <Favorite
                symbol={stock.data?.['1. symbol'] || ''}
                initialFavorites={favorites}
                onFavorite={setFavorites}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
