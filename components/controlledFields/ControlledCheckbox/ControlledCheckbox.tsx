import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import Checkbox from '../../Checkbox/Checkbox';
import Typography from '../../Typography/Typography';
import { VOLCANIC_SAND } from '../../../constants/colors';

export interface ControlledCheckboxProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  required?: boolean;
  control: Control<T>;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
}

function ControlledCheckbox<T extends FieldValues>({
  label,
  control,
  ...rest
}: ControlledCheckboxProps<T>) {
  return (
    <FormControlLabel
      {...rest}
      control={
        <Controller
          {...rest}
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <Checkbox onChange={onChange} checked={value} {...field} />
          )}
        />
      }
      label={
        <Typography variant="body2" sx={{ ml: 2 }} color={VOLCANIC_SAND}>
          {label}
        </Typography>
      }
      sx={{ ml: '-2px' }}
    />
  );
}

export default ControlledCheckbox;
