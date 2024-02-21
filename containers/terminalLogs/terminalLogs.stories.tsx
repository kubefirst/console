import { Meta, StoryObj } from '@storybook/react';

import TerminalLogs from './NoSSRTerminal';

const meta: Meta<typeof TerminalLogs> = {
  component: TerminalLogs,
};

export default meta;

export const Default: StoryObj<typeof TerminalLogs> = {};
