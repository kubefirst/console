import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { TAG_COLOR_OPTIONS, TagColor } from '../../Tag/Tag';

import ControlledTagSelect from './ControlledTagSelect';

const meta: Meta<typeof ControlledTagSelect> = {
  component: ControlledTagSelect,
};

export default meta;

const ControlledTagSelectWithHooks = () => {
  const {
    control,
    formState: { errors },
  } = useForm<{ labelColor: TagColor }>({ defaultValues: { labelColor: 'gray' }, mode: 'onBlur' });

  return (
    <ControlledTagSelect
      control={control}
      rules={{
        required: 'label color is required',
      }}
      name="labelColor"
      label="Label color"
      required
      onErrorText={errors.labelColor?.message}
      options={TAG_COLOR_OPTIONS}
    />
  );
};

export const Default: StoryObj<typeof ControlledTagSelect> = {
  render: () => <ControlledTagSelectWithHooks />,
};
