'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TableCell, TableRow } from '@/components/ui/table';
import { useRef, useState } from 'react';
import { format } from 'date-fns';
import { ITask } from '@/types/task';
import { Check, Trash } from 'lucide-react';
import { constants } from '@/global/constants';

interface TaskRowProps {
  task: ITask;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, updatedTask: Partial<ITask>) => void;
}

export function TaskRow({ task, onDelete, onUpdate }: TaskRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const rowRef = useRef<HTMLTableRowElement>(null);

  const handleBlur = () => {
    if (
      editedTask.name !== task.name ||
      editedTask.description !== task.description ||
      editedTask.status !== task.status ||
      editedTask.priority !== task.priority
    ) {
      onUpdate(task.id, editedTask);
    }
    setIsEditing(false);
  };
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const formattedDate = format(task.createdAt as Date, 'MMM d, yyyy');
  const formattedUpdatedAt = task.updatedAt
    ? format(new Date(task.updatedAt), 'MMM d, yyyy')
    : null;
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), 'MMM d, yyyy')
    : null;

  return (
    <TableRow
      ref={rowRef}
      onDoubleClick={handleDoubleClick}
      className={
        isEditing
          ? 'bg-yellow-100 hover:bg-yellow-100 dark:bg-amber-500 dark:hover:bg-amber-500'
          : ''
      }
    >
      <TableCell className='font-medium'>
        {formattedUpdatedAt || formattedDate}
      </TableCell>

      <TableCell>
        {isEditing ? (
          <Input
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
          />
        ) : (
          editedTask.name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
          />
        ) : (
          editedTask.description
        )}
      </TableCell>

      <TableCell>
        {isEditing ? (
          <Select
            onValueChange={(value) =>
              setEditedTask({ ...editedTask, status: value })
            }
            defaultValue={editedTask.status}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select a status' />
            </SelectTrigger>
            <SelectContent>
              {constants.TASK_STATUS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          editedTask.status
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Select
            onValueChange={(value) =>
              setEditedTask({ ...editedTask, priority: value })
            }
            defaultValue={editedTask.priority}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select a priority' />
            </SelectTrigger>
            <SelectContent>
              {constants.TASK_PRIORITIES.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          editedTask.priority
        )}
      </TableCell>
      <TableCell className='font-medium'>{formattedDueDate}</TableCell>
      <TableCell className='flex justify-center gap-2 items-center'>
        {!isEditing && (
          <Button
            variant='ghost'
            size='icon'
            className='hover:bg-transparent'
            onClick={() => onDelete(task.id)}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
        {isEditing && (
          <Button
            variant='ghost'
            size='icon'
            onClick={() => handleBlur()}
            className='hover:bg-transparent'
          >
            <Check className='h-4 w-4' />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
