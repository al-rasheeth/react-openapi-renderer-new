import { Card as MuiCard, CardContent, CardHeader, CardActions } from '@mui/material';
import type { CardProps as MuiCardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface CardProps extends MuiCardProps {
  title?: string;
  actions?: React.ReactNode;
}

const StyledCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
  transition: 'box-shadow 0.3s ease-in-out',
}));

export const Card = ({ title, children, actions, ...props }: CardProps) => {
  return (
    <StyledCard {...props}>
      {title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </StyledCard>
  );
};

export default Card; 