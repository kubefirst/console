import React from 'react';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { SxProps } from '@mui/material';

import TextAreaWithRef from '../../TextArea/TextArea';

export interface ControlledTextAreaProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  helperText?: string;
  onErrorText?: string;
  minRows?: string | number;
  textAreaStyleOverrides?: React.CSSProperties;
  hideValue?: boolean;
  placeholder?: string;
  sx?: SxProps;
}

function ControlledTextArea<T extends FieldValues>({
  label,
  ...props
}: ControlledTextAreaProps<T>) {
  return (
    <Controller
      {...props}
      render={({ field, fieldState: { error } }) => (
        <TextAreaWithRef
          {...field}
          sx={props.sx}
          required={props.required}
          label={label}
          error={!!error}
          helperText={error ? props.onErrorText : props.helperText}
          minRows={props.minRows}
          textAreaStyleOverrides={props.textAreaStyleOverrides}
          hideValue={props.hideValue}
          placeholder={props.placeholder}
        />
      )}
    />
  );
}

export default ControlledTextArea;
