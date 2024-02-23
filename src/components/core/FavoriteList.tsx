'use client';

import { useState } from 'react';
import { Skull } from 'lucide-react';
import useFavoriteStocks from '@/hooks/useFavoriteStocks';
import Favorite from '../layout/Favorite';
import LoadingSkeleton from '../layout/LoadingSkeleton';
import ErrorMessage from './ErrorMessage';

export default function FavoriteList(): JSX.Element {
  const [favorites, setFavorites] = useState<string[]>(JSON.parse(window.localStorage.getItem('favorites') || '[]'));
  const stocks = useFavoriteStocks(favorites);

  return (
    <div>
      {stocks.map((stock, idx) => {
        if (stock.error || typeof stock.data === 'string') {
          return (
            <ErrorMessage
              key={`${JSON.stringify(stock.data)}-${idx}`}
              message={stock.error?.message || JSON.stringify(stock.data)}
              resource={favorites[idx]}
            />
          );
        }
        return (
          <div
            key={`${JSON.stringify(stock.data)}-${idx}`}
            className="flex items-center justify-between py-4 border-b border-muted"
          >
            {!stock.isLoading ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-[repeat(2,max-content)] gap-x-4">
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
              </>
            ) : (
              <LoadingSkeleton />
            )}
          </div>
        );
      })}
    </div>
  );
}
