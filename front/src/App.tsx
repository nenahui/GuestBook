import React from 'react';
import { ThemeProvider } from '@/components/ui/theme-provider';

export const App: React.FC = () => {
  return <ThemeProvider defaultTheme={'dark'}>App</ThemeProvider>;
};
