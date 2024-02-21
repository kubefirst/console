import { Meta, StoryObj } from '@storybook/react';

import Card from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  argTypes: {
    active: {
      control: 'boolean',
    },
    withHoverEffect: {
      control: 'boolean',
    },
  },
  args: {
    active: false,
    withHoverEffect: false,
  },
};

export default meta;

export const Default: StoryObj<typeof Card> = {
  args: {
    style: { height: 100, width: 150 },
  },
};
