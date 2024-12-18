import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import React from 'react';

interface ModalProps extends React.ComponentProps<typeof Dialog> {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
  trigger,
  title,
  description,
  ...props
}) => {
  return (
    <>
      <Dialog {...props}>
        {!!trigger && <DialogTrigger>{trigger}</DialogTrigger>}
        <DialogContent>
          <DialogHeader>
            {!!title && <DialogTitle>{title}</DialogTitle>}
            {!!description && (
              <DialogDescription>{<p>{description}</p>}</DialogDescription>
            )}
          </DialogHeader>
          {props.children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
