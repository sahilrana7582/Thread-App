import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

const styles = {
  global: (props) => ({
    body: {
      color: mode('grey.900', 'whiteAlpha.900')(props),
      bg: mode('grey.100', '#101010')(props),
    },
  }),
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: '#616161',
    dark: '#1e1e1e',
  },
};

const theme = extendTheme({ colors, config, styles });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
