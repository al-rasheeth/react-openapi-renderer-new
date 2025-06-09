import { Grid, Typography, Chip } from '@mui/material';
import { Card } from '../../../../Shared/components/common/Card/Card';
import { mockServices } from '../../../../Shared/constants/mockData';

const ApiServiceList = () => {
  return (
    <Grid container spacing={3}>
      {mockServices.map((service) => (
        <Grid item xs={12} sm={6} md={4} key={service.id}>
          <Card
            title={service.name}
            actions={
              <Chip
                label={service.status}
                color={service.status === 'active' ? 'success' : 'warning'}
                size="small"
              />
            }
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {service.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Version: {service.version}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ApiServiceList; 