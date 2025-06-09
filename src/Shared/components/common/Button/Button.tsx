import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 600,
  '&.MuiButton-contained': {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
}));

export const Button = ({ children, isLoading, disabled, ...props }: ButtonProps) => {
  return (
    <StyledButton disabled={isLoading || disabled} {...props}>
      {isLoading ? 'Loading...' : children}
    </StyledButton>
  );
};

export default Button; 