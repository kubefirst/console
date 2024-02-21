'use client';
import styled from 'styled-components';

import Typography from '../Typography/Typography';
import { textTruncate } from '../../utils/theme';

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.pastelLightBlue};
  border-radius: 8px 8px 4px 4px;
  cursor: pointer;
  height: 210px;
`;

export const CardImage = styled.div`
  position: relative;
  & img {
    border-radius: 8px 8px 0px 0px;
  }
`;

export const CardDetails = styled.div`
  padding: 16px;
  height: 62px;
  width: 176px;
`;

export const CardStats = styled.div`
  color: ${({ theme }) => theme.colors.metro};
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const Duration = styled.div`
  background: rgba(63, 63, 70, 0.6);
  border-radius: 4px;
  bottom: 8px;
  padding: 0 4px;
  position: absolute;
  right: 6px;
`;

export const Title = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;

  ${textTruncate(3)};
`;
