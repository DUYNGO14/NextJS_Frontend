import { Theme, Components } from '@mui/material/styles';

const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: {
    disableRipple: true,
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      borderRadius: '8px',
      textTransform: 'none' as const,
      fontWeight: 600,
    },
  },
  variants: [
    {
      props: { variant: 'contained', color: 'primary' },
      style: {
        color: '#fff',
      },
    },
    {
      props: { variant: 'outlined', color: 'primary' },
      style: {
        borderWidth: '2px',
        '&:hover': {
          borderWidth: '2px',
        },
      },
    },
  ],
};

export default MuiButton;