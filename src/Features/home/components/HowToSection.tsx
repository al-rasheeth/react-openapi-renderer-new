import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import {
  Search as SearchIcon,
  Code as CodeIcon,
  IntegrationInstructions as IntegrationIcon,
  RocketLaunch as RocketIcon,
} from '@mui/icons-material';

const steps = [
  {
    icon: <SearchIcon sx={{ fontSize: 40 }} />,
    title: 'Discover APIs',
    description: 'Browse our extensive catalog of APIs and find the perfect one for your project.',
  },
  {
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    title: 'Test in Studio',
    description: 'Use our API Studio to test endpoints, view responses, and experiment with parameters.',
  },
  {
    icon: <IntegrationIcon sx={{ fontSize: 40 }} />,
    title: 'Get Integration Code',
    description: 'Generate ready-to-use code snippets in your preferred programming language.',
  },
  {
    icon: <RocketIcon sx={{ fontSize: 40 }} />,
    title: 'Deploy & Monitor',
    description: 'Integrate the API into your application and monitor its performance.',
  },
];

const HowToSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {steps.map((step, index) => (
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
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    right: '-50%',
                    width: '100%',
                    height: 2,
                    bgcolor: 'primary.main',
                    opacity: 0.2,
                    display: { xs: 'none', md: index < steps.length - 1 ? 'block' : 'none' },
                  },
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    opacity: 0.1,
                  }}
                >
                  {step.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                >
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowToSection; 