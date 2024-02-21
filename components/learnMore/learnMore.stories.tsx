import { Meta, StoryObj } from '@storybook/react';

import { InstallationType } from '../../types/redux';

import LearnMore from './LearnMore';

const meta: Meta<typeof LearnMore> = {
  title: 'Components/LearnMore',
  component: LearnMore,
};

export default meta;

export const Default: StoryObj<typeof LearnMore> = {
  args: {
    description: 'Learn more about',
    href: '#',
    linkTitle: 'configuring your cluster',
    installType: InstallationType.AWS,
  },
};
