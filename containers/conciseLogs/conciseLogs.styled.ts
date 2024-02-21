'use client';
import styled from 'styled-components';

import Typography from '../../components/Typography/Typography';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.libertyBlue};
  border-radius: 4px;
  font-family: 'Roboto Mono';
  height: 448px;
  max-height: 450px;
  padding: 24px;
  overflow: scroll;
`;

export const EstimatedTime = styled.div`
  margin-bottom: 16px;
`;

export const Step = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const StepNumber = styled(Typography)`
  font-style: normal !important;
  font-weight: 700 !important;
  font-size: 14px !important;
  line-height: 18px !important;
  color: #94a3b8 !important;
`;

export const StepLabel = styled(Typography)`
  font-family: 'Roboto Mono' !important;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: 18px !important;
`;

export const Success = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  margin-top: 24px;
`;

export const SuccessText = styled(StepLabel)`
  align-items: center;
  display: flex;
  gap: 8px;
`;
