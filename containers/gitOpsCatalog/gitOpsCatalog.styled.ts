'use client';
import styled from 'styled-components';

import Row from '@/components/Row/Row';
import Column from '@/components/Column/Column';

export const CardsContainer = styled(Row)`
  flex-wrap: wrap;
  gap: 16px;
`;

export const Container = styled(Row)`
  height: calc(100% - 80px);
`;

export const Content = styled.div`
  height: calc(100% - 30px);
  padding: 0 24px;
  width: 100%;
`;

export const Filter = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.pastelLightBlue};
  border-radius: 8px;
  height: 100vh;
  overflow: auto;
  padding: 24px 24px 0 24px;
  width: 266px;
`;

export const CardsByCategory = styled(Column)`
  gap: 24px;
`;
