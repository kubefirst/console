'use client';
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import AutoComplete from './Autocomplete';

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

const AutoCompleteWithHooks = () => {
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
            options={OPTIONS}
          />
        )}
      />
    </Wrapper>
  );
};

export const Default: StoryObj<typeof AutoCompleteWithHooks> = {
  render: () => <AutoCompleteWithHooks />,
};
