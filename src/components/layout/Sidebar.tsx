'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronsRight, Crown, TextSearch } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type ActionGroupObject = {
  id: string;
  label: string;
  icon: JSX.Element;
  link: string;
};

const iconSize: number = 20;
const actionGroups: ActionGroupObject[][] = [
  [
    {
      id: 'group-icon-search',
      label: 'Search stocks',
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
      label: 'Favorite stocks',
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
  const pathname = usePathname();
  const [selectedId, setSelectedId] = useState<string>(
    actionGroups.flat().find(item => item.link === pathname)?.id || actionGroups[0][0].id
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <aside className="fixed top-0 bottom-0 left-0 flex flex-col items-center justify-between border-r bg-background border-border">
      <div
        className={cn('grid grid-cols-[0fr] overflow-hidden transition-all duration-300', {
          'grid-cols-[1fr]': isOpen,
        })}
      >
        {actionGroups.map((group, index) => {
          return (
            <div
              key={`action-group-${index}`}
              className="flex flex-col items-center justify-around py-2 border-b min-w-[4.25rem] border-border"
            >
              {group.map(item => {
                return (
                  <Link
                    key={item.id}
                    href={item.link}
                    className={cn('nav-item px-6 w-full flex items-center overflow-hidden', {
                      'active': item.id === selectedId,
                      'gap-2': isOpen,
                      'gap-6': !isOpen,
                    })}
                    onClick={() => {
                      setSelectedId(item.id);
                    }}
                  >
                    <div>{item.icon}</div>
                    <div className="text-sm">{item.label}</div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
      <div
        className={cn('flex w-full nav-item transition-all', {
          'justify-end': isOpen,
          'justify-center': !isOpen,
        })}
        onClick={() => {
          setIsOpen(prev => !prev);
        }}
      >
        <div className="px-3">
          <ChevronsRight />
        </div>
      </div>
    </aside>
  );
}

type SidebarProps = { pathname: string };
