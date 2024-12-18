'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTaskActions } from '@/app/hooks/useTaskActions';
import { TaskRow } from './components/taskRow';
import { ITask } from '@/types/task';
import { Suspense } from 'react';

interface TaskTableProps {
  tasks: ITask[];
  taskCount: number;
  page?: number;
  itemsPerPage?: number;
}

export function TaskTable({
  tasks,
  taskCount,
  page = 1,
  itemsPerPage = 10
}: TaskTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(taskCount / itemsPerPage);

  const { deleteTask, updateTask } = useTaskActions();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    router.push(`/?${params}`);
  };

  const createPageLinks = () => {
    const pageLinks = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    const params = new URLSearchParams(searchParams);
    for (let i = startPage; i <= endPage; i++) {
      params.set('page', String(i));
      pageLinks.push(
        <PaginationItem key={i}>
          <Link
            className={`${
              page == i ? 'bg-primary text-primary-foreground' : ''
            } cursor-pointer p-1 px-2 rounded ml-1`}
            href={`?${params}`}
          >
            {i}
          </Link>
        </PaginationItem>
      );
    }

    // Add ellipsis if needed
    if (startPage > 2) {
      pageLinks.unshift(<PaginationEllipsis key='start-ellipsis' />);
    }
    if (endPage < totalPages - 1) {
      pageLinks.push(<PaginationEllipsis key='end-ellipsis' />);
    }

    return pageLinks;
  };

  return (
    <Suspense>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Modified At</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))}
          </TableBody>
        </Table>

        <Pagination className='mt-4'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </PaginationPrevious>
            </PaginationItem>
            {createPageLinks()}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                className={
                  page === totalPages
                    ? 'cursor-not-allowed bg-gray'
                    : 'cursor-pointer'
                }
              >
                Next
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Suspense>
  );
}
