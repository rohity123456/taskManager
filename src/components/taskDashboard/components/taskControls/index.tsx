import Modal from '@/components/common/Modal';
import AddTaskForm, { AddTaskFormValues } from '@/components/form/AddTask';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAddTaskMutation } from '@/lib/store/features/tasks/service';
import { Task } from '@prisma/client';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Search } from './components/searchTasks';

interface TaskControlsProps {}
const TaskControls: React.FC<TaskControlsProps> = ({}) => {
  const { toast } = useToast();
  const [addTask, { isLoading, isSuccess, isError }] = useAddTaskMutation();
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
    }
    if (isError) {
      toast({
        title: 'Error',
        description: 'Failed to add task',
        variant: 'destructive'
      });
    }
  }, [isSuccess, isError, toast]);
  const handleAddTask = async (values: AddTaskFormValues) => {
    try {
      const task: Partial<Task> = {
        ...values
      };
      addTask(task);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to add task',
        variant: 'destructive'
      });
    }
  };
  return (
    <div className='flex'>
      <Search />
      <Button className='ml-2' onClick={() => setModalOpen(true)}>
        <Plus className='mr-2' />
        Add Task
      </Button>
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        trigger={null}
        title='Add Task'
      >
        <AddTaskForm handleAddTask={handleAddTask} isLoading={isLoading} />
      </Modal>
    </div>
  );
};

export default TaskControls;
