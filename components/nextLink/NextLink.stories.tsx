import { Meta, StoryObj } from '@storybook/react';

import NextLink from './NextLink';

const meta: Meta<typeof NextLink> = {
  component: NextLink,
};

export default meta;

export const Default: StoryObj<typeof NextLink> = {
  args: {
    href: '#',
    children: 'Next Link',
  },
};
