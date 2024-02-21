import { Meta, StoryObj } from '@storybook/react';

import Application from './Application';

import { mockClusterApplication } from '@/tests/mocks/mockClusterApplication';

const meta: Meta<typeof Application> = {
  component: Application,
};

export default meta;

export const Default: StoryObj<typeof Application> = {
  args: {
    ...mockClusterApplication,
    links: mockClusterApplication.links.reduce(
      (previous, current) => ({ ...previous, [current]: true }),
      {},
    ),
  },
};
