'use client';
import Box, { BoxProps } from '@mui/material/Box';
import styled from 'styled-components';

import FormContainer from '../../components/FormContainer/FormContainer';
import { media } from '../../utils/media';
import { GitFieldsContainer } from '../ClusterForms/shared/AuthForm/AuthForm.styled';

import { FormContent as Content } from '@/components/FormContainer/FormContainer.styled';
import { LIGHT_GREY } from '@/constants/colors';
import Row from '@/components/Row/Row';

export const AdvancedOptionsContainer = styled(FormContainer)`
  margin: 16px 0;
  width: calc(100% - 80px);

  ${Content} {
    gap: 32px;
  }
`;

export const Form = styled(Box)<BoxProps>`
  height: 100%;
  overflow: auto;
`;

export const FormFooter = styled(Row)`
  border-top: 1px solid ${LIGHT_GREY};
  padding: 20px;
`;

export const ErrorContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;
`;

export const FormContent = styled(FormContainer)<{
  hasInfo: boolean;
  isLastStep: boolean;
  isProvisionStep: boolean;
}>`
  background-color: ${({ isLastStep, theme }) => (isLastStep ? 'transparent' : theme.colors.white)};
  box-shadow: ${({ isProvisionStep, isLastStep }) => (isLastStep || isProvisionStep) && 'none'};
  width: calc(100% - 80px);

  ${Content} {
    gap: 32px;
  }

  ${({ hasInfo }) => {
    return (
      hasInfo &&
      media.greaterThan('lg')`
      width: 680px;
    `
    );
  }}

  ${({ isProvisionStep }) =>
    isProvisionStep &&
    `
      background-color: transparent;
  `}

  ${media.greaterThan('xs')`
    ${GitFieldsContainer}{
      flex-direction: row;
    }
  `};
`;
