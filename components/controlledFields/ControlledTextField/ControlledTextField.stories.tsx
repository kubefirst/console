import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import ControlledTextField from './ControlledTextField';

const meta: Meta<typeof ControlledTextField> = {
  component: ControlledTextField,
};

export default meta;

const ControlledTextFieldWithHooks = () => {
  const { control, watch } = useForm({ defaultValues: { text: 'test' } });

  const watchValue = watch('text');

  return (
    <ControlledTextField
      control={control}
      rules={{ required: false }}
      label="Test"
      name="text"
      helperText={watchValue}
    />
  );
};

export const Default: StoryObj<typeof ControlledTextField> = {
  render: () => <ControlledTextFieldWithHooks />,
};
