import { Routes, Route } from 'react-router-dom';
import ApiCategoryList from '../Features/api-catalog/components/ApiCategoryList/ApiCategoryList';
import { Container, Typography } from '@mui/material';

const HomePage = () => (
  <Container>
    <Typography variant="h4" component="h1" gutterBottom>
      Welcome to API Documentation
    </Typography>
    <Typography variant="body1">
      Explore our comprehensive API documentation and tools.
    </Typography>
  </Container>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<ApiCategoryList />} />
      <Route path="/studio" element={<div>API Studio (Coming Soon)</div>} />
    </Routes>
  );
};

export default AppRoutes; 