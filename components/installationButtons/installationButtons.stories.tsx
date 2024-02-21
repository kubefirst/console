import { Meta, StoryObj } from '@storybook/react';

import { noop } from '../../utils/noop';

import InstallationButtons from './InstallationButtons';

const meta: Meta<typeof InstallationButtons> = {
  component: InstallationButtons,
  argTypes: {
    showNextButton: {
      control: { type: 'boolean' },
    },
    showBackButton: {
      control: { type: 'boolean' },
    },
  },
  args: {
    showNextButton: true,
    showBackButton: true,
  },
};

export default meta;

export const Default: StoryObj<typeof InstallationButtons> = {
  args: {
    onBackButtonClick: noop,
  },
};
