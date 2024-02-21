import { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    style: { margin: 50 },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Primary',
  },
};
export const Secondary: Story = {
  args: {
    variant: 'outlined',
    color: 'secondary',
    children: 'Secondary',
  },
};
export const Danger: Story = {
  args: {
    variant: 'contained',
    color: 'error',
    children: 'Danger',
  },
};
export const Disabled: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    disabled: true,
    children: 'Disabled',
  },
};
export const DisabledSecondary: Story = {
  args: {
    variant: 'outlined',
    color: 'secondary',
    disabled: true,
    children: 'Disabled',
  },
};
