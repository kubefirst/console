'use client';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { typographyClasses } from '@mui/material/Typography';

import Row from '../Row/Row';
import Column from '../Column/Column';
import Typography from '../Typography/Typography';
import { ECHO_BLUE, MOONLESS_MYTERY } from '../../constants/colors';

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 8px;
  align-self: start;
  cursor: pointer;
  margin-left: 4px;

  & svg {
    height: 16px;
    width: 16px;
    color: ${ECHO_BLUE};
  }
`;

export const HeadsUp = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: 'white',
  },
}));

export const Info = styled(Column)`
  width: 100%;
  gap: 4px;
`;

export const LogoContainer = styled(Row)`
  justify-content: center;
  align-items: center;
  height: 56px;
  width: 56px;
  border-radius: 16px;
  background: linear-gradient(90deg, #6f37ae 40.63%, #7aa5e2 100%, #7aa5e2 100%);
  flex-shrink: 0;
  align-self: center;
`;

export const Message = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: ECHO_BLUE,
  },
}));

export const Root = styled(Row)`
  padding: 16px;
  border-radius: 12px;
  background-color: ${MOONLESS_MYTERY};
  gap: 16px;
`;
