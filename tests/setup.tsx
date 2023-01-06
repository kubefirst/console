import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from '../theme';
import { makeStore } from '../redux/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setupComponent<T>(Component: any, defaultProps?: T) {
  return async function (testProps?: Partial<T>) {
    const store = makeStore();
    return await render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...defaultProps} {...testProps} />
        </Provider>
      </ThemeProvider>,
    );
  };
}

export default setupComponent;
