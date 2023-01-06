import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material';
import styled, { ThemeProvider } from 'styled-components';

import themeMUI from '../theme/muiTheme';
import theme from '../theme';
import { wrapper } from '../redux/store';
import '../styles/globals.css';
import Navigation from '../components/navigation';

const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.washMe};
  display: flex;
  height: 100%;
`;

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <main id="app">
      <Head>
        <title>Kubefirst Console</title>
        <link rel="shortcut icon" href="/static/k-ray.svg" />
      </Head>
      <Provider store={store}>
        <ThemeProviderMUI theme={themeMUI}>
          <ThemeProvider theme={theme}>
            <Layout {...props.pageProps}>
              <Navigation />
              <Component {...props.pageProps} />
            </Layout>
            {/* <Footer /> */}
          </ThemeProvider>
        </ThemeProviderMUI>
      </Provider>
    </main>
  );
}
