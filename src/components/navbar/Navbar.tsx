import Link from 'next/link';
import { LucideGroup } from 'lucide-react';

const Navbar = async () => {
  return (
    <div className='bg-zinc-100 dark:bg-zinc-900 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='w-full px-2 flex items-center justify-between'>
        <Link href='/'>
          <LucideGroup />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
