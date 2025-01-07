'use client';

import { useGetTasksQuery } from '@/lib/store/features/tasks/service';
import { TaskTable } from './components/taskTable';
import Loading from '../ui/loading';
import TaskControls from './components/taskControls';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { SimpleAlert } from '../common/SimpleAlert';

export default function TasksDashboard() {
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get('page') || 1);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || 'asc';
  const query = searchParams.get('q') || '';
  const itemsPerPage = 10;
  const { data, isLoading, isError, refetch } = useGetTasksQuery({
    page: `${pageParam}`,
    pageSize: `${itemsPerPage}`,
    q: `${query}`,
    sortBy: `${sortBy}`,
    sortOrder: `${sortOrder}`
  });

  useEffect(() => {
    refetch();
  }, [pageParam, query, sortBy, sortOrder, refetch]);

  const tasks = data?.tasks || [];
  const count = data?.count || 0;

  return (
    <Suspense>
      <div className='container'>
        <div className='flex justify-between items-center'>
          <h1>Task Dashboard</h1>
          <TaskControls />
        </div>
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : isError ? (
          <div className='mt-2 flex items-center justify-center'>
            <SimpleAlert
              title='Error'
              description='Failed to fetch tasks'
              variant={'destructive'}
              className='md:w-1/2'
            />
          </div>
        ) : (
          <TaskTable
            tasks={tasks || []}
            taskCount={count}
            page={pageParam}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </Suspense>
  );
}
