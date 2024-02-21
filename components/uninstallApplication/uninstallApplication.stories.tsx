import { Meta, StoryObj } from '@storybook/react';

import UninstallApplication from './UninstallApplication';

const meta: Meta<typeof UninstallApplication> = {
  title: 'Components/UninstallApplication',
  component: UninstallApplication,
};

export default meta;

type Story = StoryObj<typeof UninstallApplication>;

export const Default: Story = {
  args: {
    application: 'flappy',
    cluster: 'development',
    isOpen: true,
  },
};
