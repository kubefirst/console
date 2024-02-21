'use client';
import Link from 'next/link';
import styled from 'styled-components';

import Row from '@/components/Row/Row';
import ApplicationsFilterComp from '@/components/ApplicationsFilter/ApplicationsFilter';
import { media } from '@/utils/media';

export const Container = styled.div`
  height: calc(100vh - 64px);
  margin: 0 auto;
  overflow: auto;
  padding: 40px 0 0 40px;
  width: calc(100% - 40px);
`;

export const Content = styled.div``;

export const Header = styled.div`
  color: ${({ theme }) => theme.colors.volcanicSand};
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const LearnMoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

export const ApplicationsContainer = styled(Row)`
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const ApplicationsFilter = styled(ApplicationsFilterComp)`
  width: fit-content;
  min-width: 310px;
  margin-bottom: 16px;

  ${media.greaterThan('sm')`
    width: calc(100% - 70px);
  `}
`;
