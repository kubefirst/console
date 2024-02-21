import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useForm } from 'react-hook-form';

import ControlledNumberInput from './ControlledNumberInput';

const meta: Meta<typeof ControlledNumberInput> = {
  component: ControlledNumberInput,
};

export default meta;

const ControlledNumberInputWithHooks = () => {
  const { control } = useForm({
    defaultValues: {
      numberOfNodes: 3,
    },
  });
  return (
    <form onSubmit={() => action('onSubmit')}>
      <ControlledNumberInput
        numberInputProps={{ defaultValue: 3 }}
        label="Number of nodes"
        name="numberOfNodes"
        control={control}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export const Default: StoryObj<typeof ControlledNumberInput> = {
  render: () => <ControlledNumberInputWithHooks />,
};
