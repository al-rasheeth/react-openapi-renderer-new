import { Container, Typography, Grid, Box } from '@mui/material';
import { Card } from '../../../Shared/components/common/Card/Card';
import { Button } from '../../../Shared/components/common/Button/Button';
import { ROUTES } from '../../../App/routes/constants';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to API Documentation
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Explore our comprehensive API documentation and tools
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card
            title="API Catalog"
            actions={
              <Button
                component={Link}
                to={ROUTES.CATEGORIES}
                variant="contained"
                color="primary"
              >
                Browse APIs
              </Button>
            }
          >
            <Typography variant="body1" paragraph>
              Explore our extensive collection of APIs, organized by categories and services.
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            title="API Studio"
            actions={
              <Button
                component={Link}
                to={ROUTES.STUDIO}
                variant="contained"
                color="primary"
              >
                Open Studio
              </Button>
            }
          >
            <Typography variant="body1" paragraph>
              Test and experiment with our APIs in our interactive API Studio.
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            title="Documentation"
            actions={
              <Button
                component={Link}
                to={ROUTES.SERVICES}
                variant="contained"
                color="primary"
              >
                View Docs
              </Button>
            }
          >
            <Typography variant="body1" paragraph>
              Access detailed documentation, examples, and integration guides.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage; 