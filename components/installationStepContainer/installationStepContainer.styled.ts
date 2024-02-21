'use client';
import styled from 'styled-components';

import Column from '../Column/Column';
import InstallationButtonsComp from '../InstallationButtons/InstallationButtons';
import Typography from '../Typography/Typography';
import { media } from '../../utils/media';

export const Container = styled(Column)`
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const InstallationButtons = styled(InstallationButtonsComp)``;

export const Content = styled(Column)<{ hasInfo?: boolean; isProvisionStep: boolean }>`
  align-items: center;
  background-color: ${({ isProvisionStep, theme }) => isProvisionStep && theme.colors.white};
  gap: 24px;
  margin: 0 auto;
  width: 100%;

  ${({ hasInfo }) =>
    hasInfo &&
    `
      flex-direction: column;
      justify-content: center;
    `}

  ${({ isProvisionStep }) =>
    isProvisionStep &&
    `
      background-color: transparent;
      height: 100%;
  `}

  ${media.greaterThan('lg')`
    flex-direction: ${({ hasInfo }: { hasInfo: boolean }) => hasInfo && 'row'};
    height: calc(100% - 285px);


    ${({ hasInfo }: { hasInfo: boolean }) =>
      hasInfo &&
      `
        align-items: flex-start;
        flex-direction: row;
        justify-content: center;
    `}
  `};
`;

export const InstallTitle = styled(Typography)`
  color: ${({ theme }) => theme.colors.volcanicSand};
  margin: 40px 0 24px 0 !important;
  text-align: center;
`;

export const Title = styled.div`
  margin: 40px auto;
`;

export const FormContent = styled.div<{ isProvisionStep: boolean }>`
  height: calc(100% - 200px);
  overflow-y: auto;
  width: 100%;

  ${({ isProvisionStep }) =>
    isProvisionStep &&
    `
      margin-bottom: 0;
  `}

  ${media.greaterThan('lg')`
    height: calc(100% - 200px);
  `};
`;
