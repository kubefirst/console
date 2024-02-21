import { Meta, StoryObj } from '@storybook/react';

import { InstallationType } from '../../types/redux';

import CloudProviderCard from './CloudProviderCard';

const meta: Meta<typeof CloudProviderCard> = {
  component: CloudProviderCard,
  argTypes: {
    option: {
      control: 'select',
      options: InstallationType,
    },
    active: {
      control: 'boolean',
    },
    withHoverEffect: {
      control: 'boolean',
    },
  },
  args: {
    option: InstallationType.LOCAL,
    active: false,
    withHoverEffect: true,
  },
};

export default meta;

export const Default: StoryObj<typeof CloudProviderCard> = {};
