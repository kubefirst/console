import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import Radio from './ControlledRadioGroup';

import Tag from '@/components/Tag/Tag';
import { ASMANI_SKY } from '@/constants/colors';

const meta: Meta<typeof Radio> = {
  component: Radio,
};

export default meta;

const RadioWithHooks = () => {
  const { control } = useForm({
    defaultValues: {
      gender: 'male',
    },
  });

  return (
    <Radio
      control={control}
      rules={{ required: false }}
      name="gender"
      options={[
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ]}
    />
  );
};

const RadioWithDisabledOption = () => {
  const { control } = useForm({
    defaultValues: {
      gender: 'male',
    },
  });

  return (
    <Radio
      control={control}
      rules={{ required: false }}
      name="gender"
      options={[
        {
          label: 'Male',
          value: 'male',
          isDisabled: true,
          tag: (
            <Tag
              text="Upgrade to use this feature"
              bgColor="mistery"
              iconComponent={<StarBorderOutlinedIcon htmlColor={ASMANI_SKY} fontSize="small" />}
            />
          ),
        },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ]}
    />
  );
};

export const Default: StoryObj<typeof Radio> = {
  render: () => <RadioWithHooks />,
};

export const DisabledItem: StoryObj<typeof Radio> = {
  render: () => <RadioWithDisabledOption />,
};
