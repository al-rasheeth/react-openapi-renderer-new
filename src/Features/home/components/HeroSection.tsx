import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../App/routes/constants';

const HeroSection = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Discover & Integrate APIs with Ease
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 4, opacity: 0.9 }}
            >
              Your one-stop platform for exploring, testing, and integrating powerful APIs
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to={ROUTES.CATEGORIES}
                variant="contained"
                color="secondary"
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Browse APIs
              </Button>
              <Button
                component={Link}
                to={ROUTES.STUDIO}
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Try API Studio
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/hero-illustration.svg"
              alt="API Platform"
              sx={{
                width: '100%',
                maxWidth: 600,
                height: 'auto',
                display: { xs: 'none', md: 'block' },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection; 