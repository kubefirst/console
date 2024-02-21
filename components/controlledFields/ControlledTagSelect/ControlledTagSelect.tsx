import React from 'react';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import { TagSelectWithRef } from '../../Select/Select';

export interface ControlledTagSelectProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  options: readonly string[];
  helperText?: string;
  onErrorText?: string;
}

function ControlledTagSelect<T extends FieldValues>({
  label,
  name,
  required,
  rules,
  options,
  ...rest
}: ControlledTagSelectProps<T>) {
  return (
    <Controller
      name={name}
      rules={rules}
      {...rest}
      render={({ field, fieldState: { error } }) => (
        <TagSelectWithRef
          {...field}
          inputRef={field.ref}
          fullWidth
          label={label}
          error={!!error}
          required={required}
          options={options}
          helperText={error ? rest.onErrorText : rest.helperText}
        />
      )}
    />
  );
}

export default ControlledTagSelect;
