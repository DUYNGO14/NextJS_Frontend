import { Theme, Components } from '@mui/material/styles';
const MuiContainer : Components<Theme>['MuiContainer'] = {
  defaultProps: {
    maxWidth: 'lg'
  },
  styleOverrides: {
    maxWidthSm: {
      maxWidth: '680px',

      '@media (min-width: 600px)': {
        maxWidth: '680px',
      },
    },
    maxWidthMd: {
      maxWidth: '860px',

      '@media (min-width: 900px)': {
        maxWidth: '860px',
      },
    },
    maxWidthLg: {
      maxWidth: '1080px',

      '@media (min-width: 1200px)': {
        maxWidth: '1080px',
      }
    },
    maxWidthXl: {
      maxWidth: '1180px',

      '@media (min-width: 1536px)': {
        maxWidth: '1180px',
      }
    },
  }
}

export default MuiContainer