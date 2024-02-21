import Column from '@/components/Column/Column';
import { PASTEL_LIGHT_BLUE } from '@/constants/colors';
import styled, { css } from '@/app/lib/styled-components';

export const Card = styled(Column)<{ isActive: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  cursor: pointer;

  align-items: flex-start;
  padding: 20px;
  gap: 10px;

  width: 500px;
  height: 116px;

  border: 1px solid ${PASTEL_LIGHT_BLUE};
  border-radius: 12px;

  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 2px solid ${theme.colors.primary};
    `}
`;

export const CardDescription = styled.div<{ isActive?: boolean }>`
  color: ${({ theme }) => theme.colors.saltboxBlue};
  max-width: 394px;
  letter-spacing: 0 !important;

  ${({ isActive, theme }) =>
    isActive &&
    css`
      color: ${theme.colors.volcanicSand};
    `}
`;

export const CardTitle = styled.div``;
