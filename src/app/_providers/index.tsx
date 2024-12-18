'use client';
import React from 'react';
import StoreProvider from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';

interface ProviderProps {
  children: React.ReactNode;
}
const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <StoreProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </StoreProvider>
    </>
  );
};

export default Providers;
