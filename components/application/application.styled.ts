import NextImage from 'next/image';
import NextLink from 'next/link';

import { textTruncate } from '@/utils/theme';
import { PASTEL_LIGHT_BLUE } from '@/constants/colors';
import Typography from '@/components/Typography/Typography';
import styled, { css } from '@/app/lib/styled-components';

export const AppConnector = styled.div`
  height: 16px;
  background-color: ${({ theme }) => theme.colors.pastelLightBlue};
  top: 8px;
  left: 3px;
  position: absolute;
  width: 2px;
`;

export const LiveAppIcon = styled.div`
  border-radius: 50%;
  background-color: ${({ color }) => color};
  height: 8px;
  position: relative;
  width: 8px;
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${PASTEL_LIGHT_BLUE};
  border-radius: 12px;
  min-height: 194px;
  padding: 24px;
  width: 310px;
`;

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.colors.saltboxBlue};
  height: 60px;

  ${textTruncate(3)};
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 16px;
  height: 35px;
  margin-bottom: 10px;
`;

export const Image = styled(NextImage)`
  object-fit: contain;
  width: 24px;
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.colors.volcanicSand};
  font-weight: 600;
  text-transform: capitalize;
`;

export const Link = styled(NextLink)<{ disabled?: boolean }>`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  text-decoration: none;
  gap: 8px;

  & > span {
    overflow: hidden;
    max-width: 400px;
    text-overflow: ellipsis;

    ${textTruncate(1)};
  }

  &:hover {
    text-decoration: underline;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: #a1a1aa;
      cursor: not-allowed;

      &:hover {
        text-decoration: none;
      }
    `}
`;

export const Links = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  & > span:last-child > a > div > div,
  & > a:last-child > div > div {
    display: none;
  }
`;
