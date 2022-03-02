import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/playfair-display';
import '@fontsource/zen-kaku-gothic-antique';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router/Router';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
