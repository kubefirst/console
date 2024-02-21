import { noop } from 'lodash';
import { Meta, StoryObj } from '@storybook/react';

import ClusterReady from './ClusterReady';

const meta: Meta<typeof ClusterReady> = {
  component: ClusterReady,
};

export default meta;

export const Default: StoryObj<typeof ClusterReady> = {
  args: {
    onOpenConsole: noop,
    kbotPassword: 'feedkray',
  },
};
