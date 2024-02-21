import React, { FunctionComponent, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { InputProps } from '@mui/material/Input';
import ErrorIcon from '@mui/icons-material/Error';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';

import Typography from '../Typography/Typography';

import {
  Container,
  FormHelperText,
  InputAdornmentContainer,
  Required,
  StartAdornmentContainer,
} from './TextField.styled';

export interface TextFieldProps extends InputProps {
  label?: string;
  helperText?: string;
}

const getInputPadding = (type: string, startAdornment: boolean, endAdornment: boolean) => {
  if (!!startAdornment && !!endAdornment) {
    return '8px 40px 8px 50px';
  }

  if (type === 'password' || !!endAdornment) {
    return '8px 40px 8px 12px';
  }

  if (startAdornment) {
    return '8px 12px 8px 45px';
  }

  return '8px 12px';
};

export const Input = styled(InputBase)(({ theme, error, type, endAdornment, startAdornment }) => ({
  '& .MuiInputBase-input': {
    'borderRadius': 4,
    'border': `1px solid ${error ? theme.palette.error.main : '#ced4da'}`,
    'fontSize': 14,
    'height': 18,
    'lineHeight': 20,
    'letterSpacing': 0.25,
    'padding': getInputPadding(type as string, !!startAdornment, !!endAdornment),
    'width': '100%',
    '&:focus': {
      border: `1px solid ${error ? theme.palette.error.main : theme.palette.primary.main}`,
    },
  },
}));

const TextField: FunctionComponent<TextFieldProps> = ({
  label,
  required,
  error,
  disabled,
  helperText,
  endAdornment,
  startAdornment,
  ...props
}) => {
  const errorIcon = useMemo(
    () =>
      error && (
        <InputAdornmentContainer position="end">
          <ErrorIcon color="error" fontSize="small" />
        </InputAdornmentContainer>
      ),
    [error],
  );

  const startAdormentIcon = useMemo(
    () =>
      startAdornment && (
        <StartAdornmentContainer position="start">{startAdornment}</StartAdornmentContainer>
      ),
    [startAdornment],
  );

  return (
    <Container isDisabled={disabled}>
      {label && (
        <InputLabel disabled={disabled}>
          <Typography
            variant="labelLarge"
            sx={{
              display: 'flex',
              gap: '4px',
              whiteSpace: 'pre-line',
              ...props.sx,
            }}
          >
            {label} {required && <Required>*</Required>}
          </Typography>
        </InputLabel>
      )}
      <Input
        {...props}
        autoComplete="off"
        required={required}
        error={error}
        disabled={disabled}
        size="small"
        endAdornment={error ? errorIcon : endAdornment}
        startAdornment={startAdormentIcon}
      />
      {helperText && (
        <FormHelperText disabled={disabled} error={error} sx={props.sx}>
          <div dangerouslySetInnerHTML={{ __html: helperText }}></div>
        </FormHelperText>
      )}
    </Container>
  );
};

const TextFieldWithRef = React.forwardRef<unknown, TextFieldProps>((props, ref) => {
  return <TextField inputRef={ref} {...props} />;
});

export default TextFieldWithRef;
