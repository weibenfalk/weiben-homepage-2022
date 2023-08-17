import React from 'react';
// Components
import Winamp from './components/Winamp/Winamp';
// Context 
import { StateContextProvider } from './context';
// Global Styles
import { GlobalStyle } from './styles/globalStyles';

const WinApp = () => {
  return (
    <StateContextProvider>
      <GlobalStyle />
      <Winamp />
    </StateContextProvider>
  );
};

export default WinApp;
