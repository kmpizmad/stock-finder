'use client';

import { useMemo, useState } from 'react';
import { ChevronsRight, Crown, TextSearch } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type ActionGroupObject = { id: string; icon: JSX.Element; link: string };

export default function Sidebar({
  iconSize,
  paddingX,
  offset,
}: {
  iconSize: number;
  paddingX: number;
  offset: number;
}): JSX.Element {
  const actionGroups: ActionGroupObject[][] = useMemo(() => {
    return [
      [
        {
          id: 'group-icon-search',
          icon: (
            <TextSearch
              width={iconSize}
              height={iconSize}
            />
          ),
          link: '/',
        },
        {
          id: 'group-icon-crown',
          icon: (
            <Crown
              width={iconSize}
              height={iconSize}
            />
          ),
          link: '/favorites',
        },
      ],
    ];
  }, [iconSize]);
  const [selectedId, setSelectedId] = useState<string>(actionGroups[0][0].id);

  return (
    <aside
      className="fixed bottom-0 left-0 flex flex-col items-center justify-between border-r bg-background border-border"
      style={{ top: `${offset}px` }}
    >
      <div>
        {actionGroups.map((group, index) => {
          return (
            <ul
              key={`action-group-${index}`}
              className="flex flex-col items-center justify-around py-2 border-b border-border"
            >
              {group.map(item => {
                return (
                  <li
                    key={item.id}
                    className={cn('nav-item', { active: item.id === selectedId })}
                    style={{ paddingLeft: paddingX, paddingRight: paddingX }}
                    onClick={() => {
                      setSelectedId(item.id);
                    }}
                  >
                    <Link href={item.link}>{item.icon}</Link>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
      <div className="flex justify-center w-full nav-item">
        <ChevronsRight />
      </div>
    </aside>
  );
}
