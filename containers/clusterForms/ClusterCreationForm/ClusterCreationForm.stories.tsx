import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { FormProvider, useForm } from 'react-hook-form';

import { NewWorkloadClusterConfig } from '../../../types/provision';

import ClusterCreationForm from './ClusterCreationForm';

const meta: Meta<typeof ClusterCreationForm> = {
  title: 'Forms/ClusterCreationForm',
  component: ClusterCreationForm,
};

export default meta;

const ClusterCreationFormWithHooks = () => {
  const methods = useForm<NewWorkloadClusterConfig>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={() => action('onSubmit')}>
        <ClusterCreationForm />
        <button type="submit">Submit me</button>
      </form>
    </FormProvider>
  );
};

export const Default: StoryObj<typeof ClusterCreationForm> = {
  render: () => <ClusterCreationFormWithHooks />,
};
