'use client';
import styled from 'styled-components';

import Row from '../row';
import Column from '../column';
import { LIGHT_GREY } from '../../constants/colors';

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const Content = styled(Column)`
  padding: 32px 24px;
  gap: 24px;
  max-height: 304px;
  overflow-y: auto;
`;

export const Footer = styled(Row)`
  padding: 16px 24px;
  border-top: 1px solid ${LIGHT_GREY};
  justify-content: flex-end;
  gap: 16px;
`;

export const Header = styled(Row)`
  padding: 24px;
  border-bottom: 1px solid ${LIGHT_GREY};
  justify-content: space-between;
`;

export const Root = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
`;
