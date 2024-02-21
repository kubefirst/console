import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import ControlledTextArea from './ControlledTextArea';

const meta: Meta<typeof ControlledTextArea> = {
  component: ControlledTextArea,
};

export default meta;

const ControlledTextAreaWithHooks = () => {
  const {
    control,
    formState: { errors },
  } = useForm({ defaultValues: { description: 'test' }, mode: 'onBlur' });

  return (
    <ControlledTextArea
      control={control}
      rules={{
        required: 'Description is required',
        maxLength: {
          value: 280,
          message: 'Max 280 characters are permitted',
        },
      }}
      label="Description"
      name="description"
      required
      onErrorText={errors.description?.message}
    />
  );
};

export const Default: StoryObj<typeof ControlledTextArea> = {
  render: () => <ControlledTextAreaWithHooks />,
};
