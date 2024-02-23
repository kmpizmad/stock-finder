import { SearchStock } from '@/components/core/SearchStock';
import Heading from '@/components/layout/Heading';
import Separator from '@/components/layout/Separator';

export default function Home() {
  return (
    <div>
      <Heading title="Search stocks" />
      <Separator />
      <SearchStock />
    </div>
  );
}
