'use client';
import styled from 'styled-components';
import NextLink from 'next/link';

import Card from '../Card/Card';
import Column from '../Column/Column';

export const CardContainer = styled(Card)`
  display: flex;
  align-items: center;
  max-width: 540px;
  min-width: 200px;
  padding: 24px;
  height: 84px;
  overflow: hidden;
`;

export const DetailsContainer = styled(Column)`
  align-items: flex-start;
  margin-left: 24px;
  height: 100%;
  overflow-y: scroll;

  p {
    color: ${({ theme }) => theme.colors.saltboxBlue};
    margin-top: 4px;
  }
`;

export const LabelContainer = styled.div`
  color: ${({ theme }) => theme.colors.volcanicSand};
  display: flex;
  gap: 16px;
`;

export const Link = styled(NextLink)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
