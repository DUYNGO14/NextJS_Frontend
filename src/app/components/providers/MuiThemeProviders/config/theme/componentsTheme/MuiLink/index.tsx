import { Theme, Components } from '@mui/material/styles';
const MuiLink : Components<Theme>['MuiLink'] = {
  defaultProps: {
    underline: 'hover',
  },
  styleOverrides: {
    root: {
      color: 'black',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'color 0.3s',

      '&:hover, &.active': {
        color: '#FF6464',
      },
    },
  },
}
export default MuiLink