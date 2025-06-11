import { Box, Container as MuiContainer } from '@mui/material';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disableGutters?: boolean;
}

const Container = ({ children, maxWidth = 'lg', disableGutters = false }: ContainerProps) => {
  return (
    <MuiContainer maxWidth={maxWidth} disableGutters={disableGutters}>
      {children}
    </MuiContainer>
  );
};

export default Container; 