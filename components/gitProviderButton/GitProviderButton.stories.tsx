import { Meta, StoryObj } from '@storybook/react';

import { GitProvider } from '../../types';

import GitProviderButton from './GitProviderButton';

const meta: Meta<typeof GitProviderButton> = {
  component: GitProviderButton,
  argTypes: {
    option: {
      control: 'select',
      options: GitProvider,
    },
    active: {
      control: 'boolean',
    },
  },
  args: {
    option: GitProvider.GITHUB,
    active: false,
  },
};

export default meta;

export const Default: StoryObj<typeof GitProviderButton> = {
  args: {
    style: { margin: '50px auto' },
  },
};
