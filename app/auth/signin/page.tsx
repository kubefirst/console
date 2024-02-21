'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import {
  Background,
  Container,
  Content,
  ExternalLink,
  Form,
  Header,
  Panel,
  Title,
} from './signin.styled';

import Ray from '@/assets/ray.svg';
import TitleDark from '@/assets/titleDark.svg';
import Vault from '@/assets/vault.svg';
import Button from '@/components/Button/Button';
import Typography from '@/components/Typography/Typography';
import { VOLCANIC_SAND } from '@/constants/colors';
import NextLink from '@/components/NextLink/NextLink';

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrlParam = searchParams?.get('callbackUrl');

  const callbackUrl = useMemo(
    () =>
      callbackUrlParam && callbackUrlParam.includes('error') ? location.origin : callbackUrlParam,
    [callbackUrlParam],
  );

  return (
    <Container>
      <Background>
        <Header>
          <Title variant="h3">Get started with your instant Kubernetes Platforms!</Title>
          <Image alt="k1-ray-image" src={Ray} height={280} width={320} />
        </Header>
        <Typography color="white" variant="labelLarge" sx={{ width: '445px', textAlign: 'center' }}>
          By using the Kubefirst platform, you agree to our{' '}
          <ExternalLink href="https://kubeshop.io/terms-of-service" target="_blank">
            Terms of Service
          </ExternalLink>
          ,<br />
          <ExternalLink href="https://kubeshop.io/end-user-license-agreement" target="_blank">
            End User Licence Agreement
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href="https://kubeshop.io/privacy" target="_blank">
            Privacy Policy.
          </ExternalLink>
        </Typography>
      </Background>
      <Panel>
        <Form
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Content>
            <Image alt="k1-image" src={TitleDark} height={40} width={160} id="ray" />
            <Typography variant="subtitle1" color={VOLCANIC_SAND} sx={{ mt: 10, mb: 4 }}>
              Welcome
            </Typography>
            <Typography variant="body2" color={VOLCANIC_SAND} sx={{ textAlign: 'center', mb: 4 }}>
              To log in to your kubefirst platform please use your Vault credentials.
            </Typography>
            <Button
              data-test-id="vault-login-button"
              color="secondaryDark"
              sx={{ mb: 6, width: '100%', minWidth: '100%' }}
              fullWidth
              onClick={() => {
                signIn(
                  'vault',
                  {
                    callbackUrl: callbackUrl || location.origin,
                  },
                  {
                    with: 'userpass',
                  },
                );
              }}
            >
              <Image src={Vault} alt="vault-icon" width={20} height={20} />
              <Typography color={VOLCANIC_SAND} sx={{ ml: 1 }}>
                Log in with Vault
              </Typography>
            </Button>
          </Content>
          <NextLink href="https://kubefirst.io/slack" target="_blank">
            <Typography variant="body2">Help and Support</Typography>
          </NextLink>
        </Form>
      </Panel>
    </Container>
  );
}
