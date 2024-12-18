'use client';
import { Input } from '@/components/ui/input';
import { useState, useCallback, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(currentQuery);
  const debouncedSearchTerm = useRef(currentQuery);

  const handleSearch = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const params = new URLSearchParams(searchParams);
      if (debouncedSearchTerm.current) {
        params.set('q', debouncedSearchTerm.current);
      } else {
        params.delete('q');
      }
      router.push(`/?${params}`);
    },
    [debouncedSearchTerm.current, router, searchParams]
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      debouncedSearchTerm.current = query;
      if (query === currentQuery) {
        return;
      }
      handleSearch({
        preventDefault: () => {}
      } as React.FormEvent<HTMLFormElement>);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [query, currentQuery, handleSearch]);

  return (
    <Suspense>
      <form onSubmit={handleSearch} className='flex items-center space-x-2'>
        <Input
          type='text'
          placeholder='Search by name, description, status, priority...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full md:w-[300px] dark:bg-zinc-800 outline-none border-2 dark:border-stone-100'
        />
      </form>
    </Suspense>
  );
}
