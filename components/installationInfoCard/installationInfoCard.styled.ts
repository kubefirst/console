import NextImage from 'next/image';

import styled, { css } from '@/app/lib/styled-components';
import Row from '@/components/Row/Row';
import NextLink from '@/components/NextLink/NextLink';
import { PASTEL_LIGHT_BLUE, ROCK_BLUE } from '@/constants/colors';

export const Card = styled.div`
  border: 1px solid ${PASTEL_LIGHT_BLUE};
  border-radius: 12px;
  box-sizing: border-box;
  height: fit-content;
  min-height: fit-content;
  padding: 24px;
  width: 360px;
`;

export const CardInfoHeader = styled(Row)`
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

export const CardDescription = styled.div<{ isActive?: boolean }>`
  color: ${({ theme }) => theme.colors.volcanicSand};
  letter-spacing: 0.25 !important;
  max-width: 394px;
  padding-left: 4px;

  ${({ isActive, theme }) =>
    isActive &&
    css`
      color: ${theme.colors.volcanicSand};
    `}

  & a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

export const Link = styled(NextLink)`
  margin-top: 20px;
  width: fit-content;
`;

export const LinkContent = styled(Row)`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 400;
  gap: 8px;
`;

export const Code = styled(Row)`
  justify-content: space-between;
  align-items: center;
  background: #f1f5f9;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.volcanicSand};
  cursor: pointer;
  font-family: Roboto Mono;
  height: 20px;
  padding: 10px 16px;
  margin-top: 16px;
  width: 280px;

  & svg {
    color: ${ROCK_BLUE};
  }
`;

export const DescriptionItem = styled.div`
  display: flex;
  gap: 4px;
`;

export const Image = styled(NextImage)`
  margin-bottom: 16px;
`;
