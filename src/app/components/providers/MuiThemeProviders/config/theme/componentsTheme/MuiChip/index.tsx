import { Theme, Components } from '@mui/material/styles';
const MuiChip : Components<Theme>['MuiChip']  = {
  styleOverrides: {
    root: {
      paddingInline: 2,
    },
  },
  variants: [
    {
      props: { color: 'secondary' },
      style: {
        color: 'white',
        backgroundColor: '#142850',
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    {
      props: { color: 'primary' },
      style: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
  ],

}
export default MuiChip