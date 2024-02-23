'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import useSearchStock from '@/hooks/useSearchStock';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import Link from 'next/link';
import { isDescendant } from '@/lib/utils';
import ErrorMessage from './ErrorMessage';

export function SearchStock(): JSX.Element {
  const containerRef = useRef<React.ElementRef<'div'>>(null);
  const stockContainerRef = useRef<React.ElementRef<'div'>>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [scrollAreaOpen, setScrollAreaOpen] = useState<boolean>(false);
  const [scrollHeight, setScrollHeight] = useState<number>(200);
  const { data, error } = useSearchStock(keyword);

  const update = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const height: number = stockContainerRef.current?.offsetHeight || scrollHeight;
      setScrollHeight(height < scrollHeight ? height : scrollHeight);
      setKeyword(e.target.value);
    },
    [scrollHeight]
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!!e.target && !!containerRef.current && isDescendant(e.target as Node, containerRef.current)) return;
      setScrollAreaOpen(false);
    };

    window.addEventListener('click', handler);

    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);

  useEffect(() => {
    setScrollAreaOpen(!!data?.bestMatches?.length && keyword !== '');
  }, [data, keyword]);

  return (
    <div ref={containerRef}>
      <Input
        type="text"
        placeholder="Search stock symbol..."
        onChange={update}
      />
      {(!!error || !!data?.Information) && !!keyword ? (
        <ErrorMessage
          message={error?.message || data?.Information}
          resource={keyword}
        />
      ) : scrollAreaOpen ? (
        <ScrollArea
          className="mt-2 border rounded-md"
          style={{ height: scrollHeight }}
        >
          <div
            ref={stockContainerRef}
            className="py-2"
          >
            {data?.bestMatches?.map(match => {
              return (
                <Link
                  key={match['1. symbol']}
                  href={`/${match['1. symbol']}/details`}
                  className="block px-3 py-1 cursor-pointer hover:bg-muted"
                >
                  <div className="text-lg font-bold">{match['1. symbol']}</div>
                  <div className="italic font-light">{match['2. name']}</div>
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
}
