'use client';

import { useMemo, useState } from 'react';
import { ChevronsRight, Crown, TextSearch } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type ActionGroupObject = { id: string; icon: JSX.Element; link: string };

const iconSize: number = 20;
const actionGroups: ActionGroupObject[][] = [
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

export default function Sidebar(): JSX.Element {
  const [selectedId, setSelectedId] = useState<string>(actionGroups[0][0].id);

  return (
    <aside className="fixed top-0 bottom-0 left-0 flex flex-col items-center justify-between border-r bg-background border-border">
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
                    className={cn('nav-item px-6', { active: item.id === selectedId })}
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
