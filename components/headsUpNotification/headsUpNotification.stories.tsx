import { Meta, StoryObj } from '@storybook/react';

import HeadsUpNotification from './HeadsUpNotification';

const meta: Meta<typeof HeadsUpNotification> = {
  title: 'Components/HeadsUpNotification',
  component: HeadsUpNotification,
};

export default meta;

export const Default: StoryObj<typeof HeadsUpNotification> = {
  args: {
    style: { margin: 50 },
  },
};
