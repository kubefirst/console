'use client';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';
import InputBase from '@mui/material/InputBase';

import { LINK_WATER } from '@/constants/colors';

export const Container = styled.div`
  width: 100%;
`;

export const Input = muiStyled(InputBase)(({ theme, error }) => ({
  '& .MuiInputBase-input': {
    'borderRadius': 4,
    'border': `1px solid ${error ? theme.palette.error.main : LINK_WATER}`,
    'fontSize': 14,
    'lineHeight': '20px',
    'letterSpacing': '0.25px',
    'padding': '8px 12px',
    'width': '100%',
    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));
