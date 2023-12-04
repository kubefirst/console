import React, { useState } from 'react';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import TextFieldWithRef from '../textField/index';

export interface ControlledTextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  disabled?: boolean;
  label: string;
  required?: boolean;
  control: Control<T>;
  helperText?: string;
  onErrorText?: string;
  readOnly?: boolean;
}

function ControlledTextField<T extends FieldValues>({
  disabled,
  label,
  required,
  ...props
}: ControlledTextFieldProps<T>) {
  const [isBlur, setIsBlur] = useState(false);

  return (
    <Controller
      {...props}
      render={({ field, fieldState: { error } }) => (
        <TextFieldWithRef
          {...field}
          onBlur={() => {
            field.onBlur();
            setIsBlur(true);
          }}
          disabled={disabled}
          inputRef={field.ref}
          fullWidth
          required={required}
          label={label}
          error={isBlur && error !== undefined}
          helperText={error && isBlur ? props.onErrorText : props.helperText}
          readOnly={props.readOnly}
        />
      )}
    />
  );
}

export default ControlledTextField;
