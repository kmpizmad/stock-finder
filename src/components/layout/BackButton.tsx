import { useRouter } from 'next/navigation';
import { Undo2 } from 'lucide-react';

export default function BackButton(): JSX.Element {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 transition-all rounded-md cursor-pointer w-max text-secondary hover:bg-secondary hover:text-secondary-foreground"
      onClick={() => router.back()}
    >
      <Undo2 />
      Back
    </div>
  );
}
