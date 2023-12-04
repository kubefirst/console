import InputAdornment from '@mui/material/InputAdornment';
import FormHelperTextMui from '@mui/material/FormHelperText';
import { styled as muiStyled, InputBase } from '@mui/material';

import { SPUN_PEARL, LINK_WATER, SNOW } from '../../constants/colors';

import styled, { css } from '@/app/lib/styled-components';

export const Container = styled.div<{ isDisabled?: boolean }>`
  width: 100%;

  & > label {
    margin-bottom: 8px;
  }

  ${({ isDisabled, theme }) =>
    isDisabled &&
    css`
      & > label {
        color: ${SPUN_PEARL} !important;
      }

      & > div > input {
        border-color: ${theme.colors.lightGrey} !important;
        cursor: not-allowed;
      }
    `}
`;

export const Input = muiStyled(InputBase)(({ theme, error, type, endAdornment, readOnly }) => ({
  '& .MuiInputBase-input': {
    'borderRadius': 4,
    'border': `1px solid ${error ? theme.palette.error.main : `${LINK_WATER}`}`,
    'fontSize': 14,
    'height': 18,
    'lineHeight': 20,
    'letterSpacing': 0.25,
    'padding': type === 'password' || !!endAdornment ? '8px 40px 8px 12px' : '8px 12px',
    'width': '100%',
    'backgroundColor': readOnly ? `${SNOW}` : 'transparent',
    'pointerEvents': readOnly ? 'none' : 'auto',
    '&:focus': {
      border: `1px solid ${
        error ? theme.palette.error.main : readOnly ? 'none' : theme.palette.primary.main
      }`,
    },
  },
}));

export const Required = styled.div`
  color: ${({ theme }) => theme.colors.danger};
`;

export const InputAdornmentError = styled(InputAdornment)`
  position: absolute;
  right: 15px;
`;

export const FormHelperText = styled(FormHelperTextMui)`
  & a {
    color: ${({ theme }) => theme.colors.exclusivePlum};
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }
`;
