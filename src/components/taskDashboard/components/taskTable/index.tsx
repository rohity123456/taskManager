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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTaskActions } from '@/app/hooks/useTaskActions';
import { TaskRow } from './components/taskRow';
import { ITask } from '@/types/task';
import { Suspense, useState } from 'react';
import { MoveDown, MoveUp } from 'lucide-react';

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
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortKey, setSortKey] = useState('');
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

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

  const handleSorting = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', String(key));
    const newSortOrder =
      sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortKey(key);
    params.set('sortOrder', newSortOrder);
    params.set('sortBy', key);
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

  const handleTaskDelete = async () => {
    deleteTask(taskToDelete as string);
    setIsDeleteAlertOpen(false);
  };

  return (
    <Suspense>
      <div>
        <Table>
          <TableHeader className='cursor-pointer'>
            <TableRow>
              <TableHead onClick={() => handleSorting('updatedAt')}>
                <div className='flex items-center'>
                  <span>Modified At</span>
                  {sortKey === 'updatedAt' && sortOrder === 'asc' && (
                    <MoveDown size={15} fontWeight={800} />
                  )}
                  {sortKey === 'updatedAt' && sortOrder === 'desc' && (
                    <MoveUp size={15} fontWeight={800} />
                  )}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSorting('name')}>
                <div className='flex items-center'>
                  <span>Task Name</span>
                  {sortKey === 'name' && sortOrder === 'asc' && (
                    <MoveDown size={15} fontWeight={800} />
                  )}
                  {sortKey === 'name' && sortOrder === 'desc' && (
                    <MoveUp size={15} fontWeight={800} />
                  )}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSorting('description')}>
                <div className='flex items-center'>
                  <span>Description</span>
                  {sortKey === 'description' && sortOrder === 'asc' && (
                    <MoveDown size={15} fontWeight={800} />
                  )}
                  {sortKey === 'description' && sortOrder === 'desc' && (
                    <MoveUp size={15} fontWeight={800} />
                  )}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSorting('status')}>
                <div className='flex items-center'>
                  <span>Status</span>
                  {sortKey === 'status' && sortOrder === 'asc' && (
                    <MoveDown size={15} fontWeight={800} />
                  )}
                  {sortKey === 'status' && sortOrder === 'desc' && (
                    <MoveUp size={15} fontWeight={800} />
                  )}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSorting('priority')}>
                <div className='flex items-center'>
                  <span>Priority</span>
                  {sortKey === 'priority' && sortOrder === 'asc' && (
                    <MoveDown size={15} fontWeight={800} />
                  )}
                  {sortKey === 'priority' && sortOrder === 'desc' && (
                    <MoveUp size={15} fontWeight={800} />
                  )}
                </div>
              </TableHead>
              <TableHead onClick={() => handleSorting('dueDate')}>
                <div className='flex items-center'>
                  <span>Due Date</span>
                  {sortKey === 'dueDate' && sortOrder === 'asc' && (
                    <MoveDown size={15} fontWeight={800} />
                  )}
                  {sortKey === 'dueDate' && sortOrder === 'desc' && (
                    <MoveUp size={15} fontWeight={800} />
                  )}
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onDelete={(taskId) => {
                  setTaskToDelete(taskId);
                  setIsDeleteAlertOpen(true);
                }}
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
      <AlertDialog open={isDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              task, please be certain.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleTaskDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Suspense>
  );
}
