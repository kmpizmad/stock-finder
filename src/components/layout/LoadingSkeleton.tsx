import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

export default function LoadingSkeleton({ noAvatar = false, centered = false }: LoadingSkeletonProps): JSX.Element {
  return (
    <div className={cn('flex items-center space-x-4 w-full', { 'justify-center': centered })}>
      {!noAvatar && <Skeleton className="w-12 h-12 rounded-full" />}
      <div className="space-y-2">
        <Skeleton className="w-[600px] max-w-full h-4" />
        <Skeleton className={cn('w-[575px] max-w-full h-4', { 'mx-auto': centered })} />
      </div>
    </div>
  );
}

type LoadingSkeletonProps = { noAvatar?: boolean; centered?: boolean };
