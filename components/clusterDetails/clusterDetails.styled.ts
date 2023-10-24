'use client';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { typographyClasses } from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import ColumnComponent from '../column';
import RowComponent from '../row';
import Typography from '../typography';
import {
  CHEFS_HAT,
  DR_WHITE,
  EXCLUSIVE_PLUM,
  PRIMARY,
  TRUE_BLUE,
  VOLCANIC_SAND,
} from '../../constants/colors';

export const Container = styled(ColumnComponent)`
  width: 100%;
  gap: 24px;
`;

export const Content = styled(ColumnComponent)`
  gap: 24px;
`;

export const ColumnInfo = styled(ColumnComponent)`
  gap: 8px;
  justify-content: space-between;
`;

export const EnvInfo = styled(ColumnComponent)`
  gap: 8px;
`;

export const Info = styled(RowComponent)`
  gap: 8px;
`;

export const InfoIcon = styled(InfoOutlinedIcon)`
  color: ${TRUE_BLUE};
  height: 20px;
  width: 20px;
`;

export const Link = styled.a`
  display: inline-flex;
  color: ${PRIMARY};
`;

export const RowInfo = styled(RowComponent)`
  gap: 156px;
`;

export const StatusContainer = styled(RowComponent)`
  padding: 16px;
  background-color: ${DR_WHITE};
  border: 1px solid ${CHEFS_HAT};
  border-radius: 4px;
`;

export const StyledLabel = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: EXCLUSIVE_PLUM,
    width: '196px',
  },
}));

export const StyledValue = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: VOLCANIC_SAND,
    width: '196px',
  },
}));
