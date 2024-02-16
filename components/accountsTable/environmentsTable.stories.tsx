import { Meta, StoryObj } from '@storybook/react';

import { noop } from '../../utils/noop';

import EnvironmentsTable from '.';

const meta: Meta<typeof EnvironmentsTable> = {
  component: EnvironmentsTable,
};

export default meta;

export const Default: StoryObj<typeof EnvironmentsTable> = {
  args: {
    handleEnableAccount: noop,
    accounts: [],
  },
};
