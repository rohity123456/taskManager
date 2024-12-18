'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background'>
      <Alert variant='destructive' className='md:w-1/2'>
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
          An unexpected error occurred. Please try refreshing the page or
          contact support.
        </AlertDescription>
      </Alert>
      <Button onClick={() => reset()} className='mt-4'>
        Try Again
      </Button>
    </div>
  );
}
