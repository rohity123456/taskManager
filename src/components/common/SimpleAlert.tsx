import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SimpleAlertProps extends React.ComponentProps<typeof Alert> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function SimpleAlert({
  title,
  description,
  icon,
  ...props
}: SimpleAlertProps) {
  return (
    <Alert {...props}>
      {!!icon && icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
