import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Header from './Header/Header';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
      {/* Add Footer here */}
    </Box>
  );
};

export default AppLayout; 