import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import ControlledCheckbox from './ControlledCheckbox';

const meta: Meta<typeof ControlledCheckbox> = {
  component: ControlledCheckbox,
};

export default meta;

const ControlledCheckboxWithHooks = () => {
  const { control } = useForm<{ checked: boolean }>({
    defaultValues: { checked: false },
  });

  return (
    <ControlledCheckbox
      control={control}
      rules={{
        required: true,
      }}
      name="checked"
      label="Enable Force Destroy on Terraform resources"
      required
    />
  );
};

export const Default: StoryObj<typeof ControlledCheckbox> = {
  render: () => <ControlledCheckboxWithHooks />,
};
