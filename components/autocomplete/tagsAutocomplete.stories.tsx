'use client';
import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import ControlledTagsAutocomplete from '../controlledFields/ControlledAutocomplete/ControlledTagsAutoComplete';

import { createEnvMap } from '@/utils/createEnvMap';
import { mockEnvironmentsResponse } from '@/tests/mocks/mockEnvironmentsResponse';
import { ClusterEnvironment } from '@/types/provision';

const mockEnvironments = Object.values(createEnvMap(mockEnvironmentsResponse));

const meta: Meta<typeof ControlledTagsAutocomplete> = {
  component: ControlledTagsAutocomplete,
};

export default meta;

const AutoCompleteTagsWithHooks: FunctionComponent<{ createEnvironment?: boolean }> = ({
  createEnvironment,
}) => {
  const { control, setValue, watch } = useForm<{ environment?: ClusterEnvironment }>();

  const handleChange = useCallback(
    (env?: ClusterEnvironment) => {
      setValue('environment', env);
    },
    [setValue],
  );

  const handleTagDelete = useCallback(() => {
    setValue('environment', undefined);
  }, [setValue]);

  // eslint-disable-next-line no-console
  const handleAddNewEnvironment = useCallback(() => console.log('add new environment'), []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    const subscription = watch(({ environment }) => console.log(environment));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <ControlledTagsAutocomplete
      control={control}
      name="environment"
      label="Environments cluster will host"
      options={mockEnvironments}
      rules={{ required: false }}
      onChange={handleChange}
      onTagDelete={handleTagDelete}
      createEnvironment={createEnvironment}
      onAddNewEnvironment={handleAddNewEnvironment}
    />
  );
};

export const Default: StoryObj<typeof ControlledTagsAutocomplete> = {
  render: (props) => <AutoCompleteTagsWithHooks {...props} />,
  args: {
    createEnvironment: false,
  },
};
