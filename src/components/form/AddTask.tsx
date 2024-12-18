'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { constants, getConstant } from '@/global/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import DatePicker from '../common/DatePicker';

const taskPriorities = getConstant('TASK_PRIORITIES') as string[];
const taskStatus = getConstant('TASK_STATUS') as string[];

const TaskFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(5, 'Description is required'),
  priority: z.enum(taskPriorities as [string, ...string[]]),
  status: z.enum(taskStatus as [string, ...string[]]),
  dueDate: z.date()
});

export type AddTaskFormValues = z.infer<typeof TaskFormSchema>;

interface AddTaskFormProps {
  handleAddTask: (values: AddTaskFormValues) => void;
  isLoading?: boolean;
}
const AddTaskForm: React.FC<AddTaskFormProps> = ({
  handleAddTask,
  isLoading
}) => {
  const { toast } = useToast();

  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      name: '',
      description: '',
      priority: constants.TASK_PRIORITIES[0],
      status: constants.TASK_STATUS[0],
      dueDate: new Date()
    }
  });

  const onSubmit = async (values: AddTaskFormValues) => {
    try {
      handleAddTask(values);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to add task',
        variant: 'destructive'
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit)();
        }}
        className='w-full'
      >
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Task name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder='Task description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='priority'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select priority' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {taskPriorities.map((priority) => (
                      <SelectItem value={priority} key={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {taskStatus.map((status) => (
                      <SelectItem value={status} key={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='dueDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <br />
                <DatePicker value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className='w-full mt-6'
          type='submit'
          isLoading={isLoading}
          disabled={isLoading}
        >
          Add Task
        </Button>
      </form>
    </Form>
  );
};

export default AddTaskForm;
