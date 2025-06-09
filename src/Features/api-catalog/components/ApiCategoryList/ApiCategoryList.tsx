import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { mockCategories } from '../../../../Shared/constants/mockData';

const ApiCategoryList = () => {
  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {mockCategories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category.id}>
          <Card
            component={Link}
            to={`/categories/${category.id}`}
            sx={{
              textDecoration: 'none',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {category.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ApiCategoryList; 