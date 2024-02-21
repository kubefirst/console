'use client';
import styled, { css } from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { typographyClasses } from '@mui/material/Typography';
import { Divider } from '@mui/material';

import ColumnComponent from '@/components/Column/Column';
import RowComponent from '@/components/Row/Row';
import Typography from '@/components/Typography/Typography';
import {
  EXCLUSIVE_PLUM,
  PASTEL_LIGHT_BLUE,
  PRIMARY,
  SPUN_PEARL,
  VOLCANIC_SAND,
} from '@/constants/colors';

export const Container = styled(ColumnComponent)`
  width: 100%;
`;

export const Content = styled(ColumnComponent)`
  gap: 24px;
`;

export const ColumnInfo = styled(ColumnComponent)`
  gap: 8px;
  justify-content: space-between;
`;

export const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noreferrer',
})<{ available?: boolean }>`
  font-size: 14px;
  text-decoration: none;
  color: ${({ available }) => (available ? PRIMARY : SPUN_PEARL)};
  cursor: pointer;

  ${({ available }) =>
    !available &&
    css`
      pointer-events: none;
    `}

  &:hover {
    text-decoration: underline;
  }
`;

export const Link = styled.a`
  display: inline-flex;
  color: ${PRIMARY};
`;

export const RowInfo = styled(RowComponent)`
  gap: 24px;
`;

export const StatusContainer = styled(ColumnComponent)`
  gap: 4px;
  padding: 16px 0;
`;

export const StyledDivider = muiStyled(Divider)(
  () => `
  border-color: ${PASTEL_LIGHT_BLUE}
`,
);

export const StyledLabel = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: EXCLUSIVE_PLUM,
    width: '150px',
  },
}));

export const StyledValue = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: VOLCANIC_SAND,
  },
}));
