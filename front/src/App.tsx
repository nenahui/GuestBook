import { GuestBook } from '@/features/guestBook/GuestBook';
import React from 'react';
import { ThemeProvider } from '@/components/ui/theme-provider';

export const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme={'dark'}>
      <div className={'max-w-[400px] mx-auto p-3 relative'}>
        <GuestBook />
      </div>
    </ThemeProvider>
  );
};
