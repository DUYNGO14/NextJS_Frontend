'use client';

import { ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';
import theme from './config/theme';
import { CssBaseline } from '@mui/material';

interface MuiThemeProvidersProps {
  children: ReactNode;
}

const MuiThemeProviders = ({ children }: MuiThemeProvidersProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProviders;