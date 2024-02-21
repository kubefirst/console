'use client';
import Box from '@mui/material/Box';
import styled from 'styled-components';

import Typography from '../../components/Typography/Typography';

export const Body = styled.div`
  display: flex;
  gap: 40px;
  height: 500px;
  overflow: auto;
  padding: 32px 24px;
`;

export const Container = styled(Box)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  height: 668px;
  width: 1024px;
`;

export const Filter = styled.div`
  width: 268px;
`;

export const HitsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  height: fit-content;
  width: 662px;
`;

export const Header = styled.div`
  padding: 24px;
`;

export const RefinementContainer = styled.div`
  margin-top: 24px;
`;

export const SliderContainer = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

export const SliderTitle = styled(Typography)`
  position: absolute;
  right: 0;
  top: -16px;
`;
