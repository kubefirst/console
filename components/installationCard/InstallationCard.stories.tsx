import { Meta, StoryObj } from '@storybook/react';

import InstallationCard from './InstallationCard';

const meta: Meta<typeof InstallationCard> = {
  title: 'Components/InstallationCard',
  component: InstallationCard,
  argTypes: {
    active: {
      control: { type: 'boolean' },
    },
  },
  args: {
    active: true,
  },
};

export default meta;

export const Default: StoryObj<typeof InstallationCard> = {
  args: {
    info: {
      description: 'test',
      title: 'aws',
    },
    style: { margin: '50px auto' },
  },
};
