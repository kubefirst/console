'use client';
import styled from 'styled-components';

import Typography from '../Typography/Typography';

export const Text = styled(Typography)`
  color: ${({ theme }) => theme.colors.spunPearl};
  display: flex;
  gap: 4px;
  margin-top: 12px;
`;
