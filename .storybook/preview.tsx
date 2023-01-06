import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import * as NextImage from 'next/image';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import { makeStore } from '../redux/store';
import themeMUI from '../theme/muiTheme';
import theme from '../theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/',
    asPath: '/',
    query: {},
    push() {},
  },
};

const store = makeStore();

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ThemeProviderMUI theme={themeMUI}>
          <Story />
        </ThemeProviderMUI>
      </ThemeProvider>
    </Provider>
  ),
];

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
