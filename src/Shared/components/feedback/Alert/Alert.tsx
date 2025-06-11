import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';

interface AlertProps extends Omit<MuiAlertProps, 'severity'> {
  type?: 'success' | 'error' | 'warning' | 'info';
}

const Alert = ({ type = 'info', ...props }: AlertProps) => {
  return <MuiAlert severity={type} {...props} />;
};

export default Alert; 