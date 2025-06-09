import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
      }}
    >
      <CircularProgress />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading; 