import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material';
import styled, { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';

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

export const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  height: 40px;
  width: calc(100% - 50px);
  border-radius: 0px;
  padding: 12px 24px 12px 24px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();

  const shouldShowMenu = !router.asPath.includes('/login');

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
              {shouldShowMenu && <Navigation />}
              <Content>
                {shouldShowMenu && <Header />}
                <Component {...props.pageProps} />
              </Content>
            </Layout>
          </ThemeProvider>
        </ThemeProviderMUI>
      </Provider>
    </main>
  );
}
