import React from 'react';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { AutocompleteTags } from '../../Autocomplete/Autocomplete';

import { ClusterEnvironment } from '@/types/provision';

export interface ControlledTagsAutoCompleteProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  required?: boolean;
  control: Control<T>;
  onChange: (value?: ClusterEnvironment) => void;
  onTagDelete: () => void;
  onAddNewEnvironment?: () => void;
  options: ClusterEnvironment[];
  createEnvironment?: boolean;
}

function ControlledTagsAutocomplete<T extends FieldValues>({
  label,
  onChange,
  onTagDelete,
  options,
  createEnvironment,
  onAddNewEnvironment,
  ...rest
}: ControlledTagsAutoCompleteProps<T>) {
  return (
    <Controller
      {...rest}
      render={({ field }) => (
        <AutocompleteTags
          {...field}
          label={label}
          options={options}
          onChange={onChange}
          onTagDelete={onTagDelete}
          createEnvironment={createEnvironment}
          onAddNewEnvironment={onAddNewEnvironment}
        />
      )}
    />
  );
}

export default ControlledTagsAutocomplete;
