import React, { FunctionComponent, useMemo } from 'react';
import { InputProps } from '@mui/material/Input';
import ErrorIcon from '@mui/icons-material/Error';
import InputLabel from '@mui/material/InputLabel';

import Typography from '../typography';

import {
  Container,
  FormHelperText,
  Input,
  InputAdornmentError,
  Required,
} from './textField.styled';

export interface TextFieldProps extends InputProps {
  label?: string;
  helperText?: string;
}

const TextField: FunctionComponent<TextFieldProps> = ({
  label,
  required,
  error,
  disabled,
  helperText,
  endAdornment,
  ...props
}) => {
  const errorIcon = useMemo(
    () =>
      error && (
        <InputAdornmentError position="end">
          <ErrorIcon color="error" fontSize="small" />
        </InputAdornmentError>
      ),
    [error],
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
      />
      {helperText && (
        <FormHelperText disabled={disabled} error={error}>
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
