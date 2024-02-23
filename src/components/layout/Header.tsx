import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import Logo from '../icons/Logo';

type LinkObject = { id: string; label: string };
const links: LinkObject[] = [
  { id: 'link-1', label: 'News' },
  { id: 'link-2', label: 'Request Feature' },
  { id: 'link-3', label: 'Need Help?' },
  { id: 'link-4', label: 'Membership' },
  { id: 'link-5', label: 'Invite & Earn' },
  { id: 'link-6', label: 'Beginners Guide' },
];

export default function Header({
  iconSize,
  paddingX,
  paddingY,
}: {
  iconSize: number;
  paddingX: number;
  paddingY: number;
}): JSX.Element {
  return (
    <header className="text-xs border-b border-border">
      <div className="flex items-center">
        <div
          className="h-full border-r border-border"
          style={{ padding: `${paddingY}px ${paddingX}px` }}
        >
          <Logo
            width={iconSize}
            height={iconSize}
          />
        </div>
        <nav
          className="w-full"
          style={{ paddingLeft: paddingX, paddingRight: paddingX }}
        >
          <ul className="flex items-center gap-4">
            {links.map(link => {
              return (
                <li
                  key={link.id}
                  className="font-light"
                >
                  {link.label}
                </li>
              );
            })}
          </ul>
        </nav>
        <div
          className="flex items-center gap-2"
          style={{ paddingLeft: paddingX, paddingRight: paddingX }}
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="w-max">
            <div>shadcn ui</div>
            <div className="text-green-500">156,878,000 BTS</div>
          </div>
        </div>
      </div>
    </header>
  );
}
