'use client';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

import KubefirstContent from '../KubefirstContent/KubefirstContent';

import { Link } from './Layout.styled';

import Header from '@/containers/Header/Header';
import Navigation from '@/containers/Navigation/Navigation';
import Row from '@/components/Row/Row';
import Column from '@/components/Column/Column';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getClusters } from '@/redux/thunks/api.thunk';
import { License } from '@/types/subscription';
import { setLicense } from '@/redux/slices/subscription.slice';
import { EnvironmentVariables, FeatureFlag } from '@/types/config';
import { setFlags } from '@/redux/slices/featureFlags.slice';
import { setConfigValues } from '@/redux/slices/config.slice';
import FlappyKray from '@/components/FlappyKray/FlappyKray';
import useModal from '@/hooks/useModal';
import {
  selectHasLicenseKey,
  selectIsLicenseActive,
  selectPendingInvoice,
} from '@/redux/selectors/subscription.selector';
import Banner from '@/components/Banner/Banner';
import { WHITE } from '@/constants/colors';
import { setIsBannerOpen } from '@/redux/slices/settings.slice';

const Container = styled(Row)`
  background-color: ${({ theme }) => theme.colors.washMe};
  height: 100vh;
  width: 100vw;
`;

export const Content = styled(Column)`
  overflow: auto;
  width: 100%;
`;

export interface LayoutProps extends PropsWithChildren {
  license: License;
  envVariables: EnvironmentVariables;
  featureFlags: Record<FeatureFlag, boolean>;
}

export function Layout({ children, envVariables, featureFlags, license }: LayoutProps) {
  const [loadFlags, setLoadFlags] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isModalContentOpen,
    openModal: openModalContent,
    closeModal: closeModalContent,
  } = useModal();

  const dispatch = useAppDispatch();
  const isBannerOpen = useAppSelector(({ settings }) => settings.isBannerOpen);
  const hasLicenseKey = useAppSelector(selectHasLicenseKey());
  const isLicenseActive = useAppSelector(selectIsLicenseActive());
  const pendingInvoice = useAppSelector(selectPendingInvoice());

  const handleOpenFlappy = () => {
    openModal();
  };

  const handleOpenKubefirstModal = () => {
    openModalContent();
  };

  const handleCloseBanner = () => {
    dispatch(setIsBannerOpen(false));
  };

  useEffect(() => {
    setLoadFlags(true);
    dispatch(setFlags(featureFlags));
    dispatch(setConfigValues(envVariables));
    dispatch(setLicense(license));
    dispatch(getClusters());
  }, [dispatch, envVariables, featureFlags, license, loadFlags]);

  useEffect(() => {
    dispatch(setIsBannerOpen(hasLicenseKey && !isLicenseActive));
  }, [dispatch, hasLicenseKey, isLicenseActive]);

  return (
    <Container>
      <Navigation
        handleOpenFlappy={handleOpenFlappy}
        handleOpenKubefirstModal={handleOpenKubefirstModal}
      />
      <Content>
        {isBannerOpen && (
          <Banner close={handleCloseBanner} type="error">
            <Typography variant="subtitle2" color={WHITE} sx={{ fontWeight: 400 }}>
              <strong style={{ fontWeight: 500 }}>Your payment was declined.</strong> Please{' '}
              <Link href={pendingInvoice?.hosted_invoice_url} target="_blank">
                update your billing information
              </Link>{' '}
              to continue to use the kubefirst UI to manage your physical clusters. Alternatively,
              manage your physical clusters directly in your GitOps repository on a Free Plan.
            </Typography>
          </Banner>
        )}
        <Header
          handleOpenFlappy={handleOpenFlappy}
          handleOpenKubefirstModal={handleOpenKubefirstModal}
        />
        {children}
      </Content>

      {isOpen && <FlappyKray isOpen closeModal={closeModal} />}
      {isModalContentOpen && (
        <KubefirstContent isOpen={isModalContentOpen} closeModal={closeModalContent} />
      )}
    </Container>
  );
}
