import { Box, Container, Typography, Stepper, Step, StepLabel, StepContent, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const steps = [
  {
    label: 'Browse APIs',
    description: 'Explore our comprehensive API catalog. Filter by category, popularity, or use case to find the perfect API for your needs.',
    icon: <SearchIcon />,
  },
  {
    label: 'Test in Studio',
    description: 'Use our interactive API Studio to test endpoints, view responses, and experiment with different parameters in real-time.',
    icon: <CodeIcon />,
  },
  {
    label: 'Integrate & Deploy',
    description: 'Follow our detailed documentation to integrate the API into your application. Get started with our SDKs and example code.',
    icon: <RocketLaunchIcon />,
  },
];

const HowToSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          How It Works
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.default',
          }}
        >
          <Stepper orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index} active={true}>
                <StepLabel
                  StepIconComponent={() => (
                    <Box
                      sx={{
                        color: 'primary.main',
                        bgcolor: 'primary.light',
                        borderRadius: '50%',
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {step.icon}
                    </Box>
                  )}
                >
                  <Typography variant="h6" component="h3">
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    {step.description}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Container>
    </Box>
  );
};

export default HowToSection; 