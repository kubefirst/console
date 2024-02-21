'use client';
import styled from 'styled-components';

import Row from '../Row/Row';

export const Container = styled(Row)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  bottom: 0;
  gap: 16px;
  height: 64px;
  justify-content: flex-end;
  position: absolute;
  width: 100%;

  & button {
    text-transform: capitalize;
  }

  #next {
    margin-right: 80px;
  }
`;
