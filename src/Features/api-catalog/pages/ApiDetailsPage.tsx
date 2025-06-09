import { Container, Typography, Paper, Box, Chip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { mockApiDetails } from '../../../Shared/constants/mockData';

const ApiDetailsPage = () => {
  const { id } = useParams();
  const apiDetails = mockApiDetails.find((api) => api.id === id);

  if (!apiDetails) {
    return (
      <Container>
        <Typography variant="h5">API not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {apiDetails.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {apiDetails.description}
        </Typography>
        <Chip
          label={apiDetails.method}
          color={apiDetails.method === 'GET' ? 'success' : 'primary'}
          sx={{ mr: 1 }}
        />
        <Typography variant="body2" component="span" sx={{ ml: 2 }}>
          {apiDetails.endpoint}
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Parameters
        </Typography>
        {apiDetails.parameters.map((param) => (
          <Box key={param.name} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              {param.name}
              {param.required && (
                <Chip
                  label="Required"
                  size="small"
                  color="error"
                  sx={{ ml: 1 }}
                />
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type: {param.type}
            </Typography>
            <Typography variant="body2">{param.description}</Typography>
          </Box>
        ))}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Responses
        </Typography>
        {apiDetails.responses.map((response) => (
          <Box key={response.status} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Status: {response.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {response.description}
            </Typography>
            <Typography variant="body2" component="pre" sx={{ mt: 1 }}>
              {JSON.stringify(response.schema, null, 2)}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default ApiDetailsPage; 