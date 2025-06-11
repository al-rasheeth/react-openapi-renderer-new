import { Box, CircularProgress } from '@mui/material';

interface LoaderProps {
  fullScreen?: boolean;
}

const Loader = ({ fullScreen = false }: LoaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: fullScreen ? '100vh' : '200px',
        width: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader; 