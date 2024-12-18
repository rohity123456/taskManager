'use client';

import { taskApi } from '@/lib/store/features/tasks/service';
import { toast } from '@/components/ui/use-toast';
import { Task } from '@prisma/client';

export function useTaskActions() {
  const [addTask] = taskApi.useAddTaskMutation();
  const [deleteTask] = taskApi.useDeleteTaskMutation();
  const [toggleTaskComplete] = taskApi.useToggleTaskCompleteMutation();
  const [updateTask] = taskApi.useUpdateTaskMutation();

  const handleAddTask = async (taskData: Partial<Task>) => {
    try {
      await addTask(taskData).unwrap();
      toast({
        title: 'Task added Successfully!'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to add task',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({ id }).unwrap();
      toast({
        title: 'Task deleted!'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive'
      });
    }
  };

  const handleToggleTaskComplete = async (id: string) => {
    try {
      await toggleTaskComplete({ id }).unwrap();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive'
      });
    }
  };

  const handleUpdateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      await updateTask({ id, ...taskData }).unwrap();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive'
      });
    }
  };

  return {
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
    toggleTaskComplete: handleToggleTaskComplete,
    updateTask: handleUpdateTask
  };
}
