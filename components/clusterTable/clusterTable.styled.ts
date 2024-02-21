import { styled as muiStyled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody, { tableBodyClasses } from '@mui/material/TableBody';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { typographyClasses } from '@mui/material/Typography';

import Typography from '../Typography/Typography';
import Tag from '../Tag/Tag';
import {
  CHEFS_HAT,
  PASTEL_LIGHT_BLUE,
  ROCK_BLUE,
  SALTBOX_BLUE,
  VOLCANIC_SAND,
} from '../../constants/colors';

import styled, { css } from '@/app/lib/styled-components';

export const Menu = styled(Box)`
  position: absolute;
  bottom: -40px;
  left: -110px;
  width: 160px;
  background-color: white;
  border: 1px solid ${CHEFS_HAT};
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(100, 116, 139, 0.25);
  z-index: 1;
`;

export const StyledIconButton = styled(IconButton)<{ expanded?: boolean }>`
  svg {
    color: ${ROCK_BLUE};
    transition: transform 0.3s ease;
  }

  ${({ expanded }) =>
    expanded &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `}
`;

export const StyledTableBody = muiStyled(TableBody)(() => ({
  [`&.${tableBodyClasses.root}`]: {
    borderRadius: '4px',
    boxShadow: `0 0 0 2px ${PASTEL_LIGHT_BLUE}`,
  },
}));

export const StyledTableCell = muiStyled(TableCell)<{ selected?: boolean }>(({ selected }) => ({
  [`&.${tableCellClasses.root}`]: {
    border: 0,
    backgroundColor: selected ? '#FAF5FF' : 'white',
  },
}));

export const StyledHeaderCell = muiStyled(StyledTableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    backgroundColor: 'transparent',
  },
}));

export const StyledTag = styled(Tag)`
  width: fit-content;
`;

export const StyledTableRow = muiStyled(TableRow)<{ selected?: boolean }>(() => ({
  [`&.${tableRowClasses.root}`]: {
    border: 0,
    height: 'fit-content',
  },
  [`&.${tableRowClasses.root}.Mui-selected`]: {
    backgroundColor: 'transparent',
  },
  ['&:first-child td:first-child']: {
    borderTopLeftRadius: '4px',
  },
  ['&:first-child td:last-child']: {
    borderTopRightRadius: '4px',
  },
  ['&:last-child td:first-child']: {
    borderBottomLeftRadius: '4px',
  },
  ['&:last-child td:last-child']: {
    borderBottomRightRadius: '4px',
  },
}));

export const StyledTableHeading = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: SALTBOX_BLUE,
  },
}));

export const StyledCellText = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    color: VOLCANIC_SAND,
    fontWeight: 400,
  },
}));

export const StyledTable = styled(Table)`
  border-collapse: collapse;
  margin: 5px;
  height: fit-content;
  margin: 0 28px;
`;

export const StyledTableContainer = styled(TableContainer)`
  display: flex;
  height: 100%;
`;
