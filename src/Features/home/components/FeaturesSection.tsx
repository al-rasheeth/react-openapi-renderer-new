import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import ApiIcon from '@mui/icons-material/Api';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';

const features = [
  {
    icon: <ApiIcon sx={{ fontSize: 40 }} />,
    title: 'Comprehensive API Catalog',
    description: 'Browse through our extensive collection of APIs, organized by categories and services.',
  },
  {
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    title: 'Interactive API Studio',
    description: 'Test and experiment with APIs in real-time using our powerful API Studio.',
  },
  {
    icon: <StorageIcon sx={{ fontSize: 40 }} />,
    title: 'Detailed Documentation',
    description: 'Access comprehensive documentation, examples, and integration guides.',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security and reliability for all your API integrations.',
  },
];

const FeaturesSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Platform Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: 'primary.light',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection; 