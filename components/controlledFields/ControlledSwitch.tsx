import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import Switch from '../Switch/Switch';

export interface ControlledSwitchProps<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  required?: boolean;
  onChange: (checked: boolean) => void;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
}

function ControlledSwitch<T extends FieldValues>({
  name,
  onChange,
  required,
  ...props
}: ControlledSwitchProps<T>) {
  return (
    <Controller
      {...props}
      name={name}
      render={({ field }) => (
        <FormGroup>
          <Switch
            {...field}
            required={required}
            inputRef={field.ref}
            onChange={(e) => {
              field.onChange(e);
              onChange(e);
            }}
          />
        </FormGroup>
      )}
    />
  );
}

export default ControlledSwitch;
