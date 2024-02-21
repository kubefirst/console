'use client';
import { styled as muiStyled } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormHelperText from '@mui/material/FormHelperText';
import ErrorIcon from '@mui/icons-material/Error';
import styled from 'styled-components';

import { LIGHT_GREY, VOLCANIC_SAND } from '../../constants/colors';
import Typography from '../Typography/Typography';
import Column from '../Column/Column';

export const Container = styled(Column)``;

export const StyledErrorIcon = muiStyled(ErrorIcon)(
  () => `
  position: absolute; 
  top: 0;
  bottom: 0;
  margin: auto 0; 
  right: 10px;
`,
);

export const StyledFormHelperText = muiStyled(FormHelperText)<{ error?: boolean }>(
  ({ theme, error }) =>
    error &&
    `
  color: ${theme.palette.error.main};
`,
);

export const StyledLabel = muiStyled(Typography)(
  () => `
  display: flex;
  gap: 4px;
  white-space: pre-line;
  margin-bottom: 8px;
`,
);

export const StyledTextArea = muiStyled(TextareaAutosize)<{ error?: boolean; hideValue?: boolean }>(
  ({ theme, error, hideValue }) => `
  width: calc(100% - ${error ? '47px' : '24px'});
  border-radius: 4px;
  padding: ${error ? '8px 35px 8px 12px' : '8px 12px'};
  border: 1px solid ${error ? theme.palette.error.main : LIGHT_GREY};
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  color: ${VOLCANIC_SAND};
  &:focus {
    border-color: ${error ? theme.palette.error.main : theme.palette.primary.main};
  }
  text-security: ${hideValue ? 'disc' : 'none'};
  -webkit-text-security: ${hideValue ? 'disc' : 'none'};
  -moz-text-security: ${hideValue ? 'disc' : 'none'};
`,
);

export const TextAreaContainer = styled.div`
  position: relative;
`;
