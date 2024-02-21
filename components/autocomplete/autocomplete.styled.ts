'use client';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { TextField as MUITextField, MenuItem as MUIMenuItem } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { LINK_WATER, SPUN_PEARL, WHITE_SMOKE } from '../../constants/colors';
import Typography from '../Typography/Typography';

export const AutoTextField = muiStyled(MUITextField)(({ theme, error, type, InputProps }) => ({
  '& .MuiOutlinedInput-root': {
    'fontSize': 14,
    'letterSpacing': 0.25,
    'paddingRight': type === 'password' || !!InputProps?.endAdornment ? '40px' : 'inherit',
    'width': '100%',

    'fieldset': {
      borderColor: `${error ? theme.palette.error.main : LINK_WATER}`,
    },

    '&:hover fieldset': {
      borderColor: LINK_WATER,
    },

    '&.Mui-focused fieldset': {
      border: `1px solid ${error ? theme.palette.error.main : theme.palette.primary.main}`,
    },
  },
}));

export const InputAdornmentContainer = styled(InputAdornment)`
  position: absolute;
  right: 8px;

  & svg {
    color: ${SPUN_PEARL};
  }
`;

export const Label = muiStyled(Typography)(
  () => `
  display: 'flex',
  gap: '4px',
  whiteSpace: 'pre-line',
`,
);

export const MenuItem = muiStyled(MUIMenuItem)(() => ({
  '&.MuiMenuItem-root.Mui-selected': {
    'backgroundColor': 'white',
    '&:hover': { backgroundColor: `${WHITE_SMOKE}` },
  },
}));
