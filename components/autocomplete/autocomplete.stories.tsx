'use client';
import React, { ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import awsLogo from '../../assets/aws_logo.svg';
import civoLogo from '../../assets/civo_logo.svg';

import AutoComplete from './index';

const meta: Meta<typeof AutoComplete> = {
  component: AutoComplete,
};

export default meta;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
`;

const OPTIONS_WITH_ICON = [
  {
    label: 'us-east-1',
    value: 'us-east-1',
    icon: civoLogo,
  },
  {
    label: 'us-west-1',
    value: 'us-west-1',
    icon: awsLogo,
  },
];

const OPTIONS = [
  {
    label: 'us-east-1',
    value: 'us-east-1',
  },
  {
    label: 'us-west-1',
    value: 'us-west-1',
  },
];

const AutoCompleteWithHooks = ({
  options,
}: {
  options: Array<{ label: string; value: string; icon?: string | ReactNode }>;
}) => {
  const { control } = useForm();
  return (
    <Wrapper>
      <Controller
        control={control}
        name="profile"
        rules={{ required: true }}
        render={({ field }) => (
          <AutoComplete
            {...field}
            placeholder="Search"
            loading
            label="Autocomplete"
            options={options}
          />
        )}
      />
    </Wrapper>
  );
};

export const Default: StoryObj<typeof AutoCompleteWithHooks> = {
  render: () => <AutoCompleteWithHooks options={OPTIONS} />,
};

export const DefaultWithIcon: StoryObj<typeof AutoCompleteWithHooks> = {
  render: () => <AutoCompleteWithHooks options={OPTIONS_WITH_ICON} />,
};
