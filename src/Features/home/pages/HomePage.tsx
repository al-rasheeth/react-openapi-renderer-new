import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowToSection from '../components/HowToSection';
import FAQSection from '../components/FAQSection';

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <HowToSection />
      <FAQSection />
    </Box>
  );
};

export default HomePage; 