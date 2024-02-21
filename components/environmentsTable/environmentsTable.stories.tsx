import { Meta, StoryObj } from '@storybook/react';

import { mockEnvironmentsResponse } from '../../tests/mocks/mockEnvironmentsResponse';
import { noop } from '../../utils/noop';
import { createEnvMap } from '../../utils/createEnvMap';

import EnvironmentsTable from './EnvironmentsTable';

const mockEnvironments = createEnvMap(mockEnvironmentsResponse);

const meta: Meta<typeof EnvironmentsTable> = {
  component: EnvironmentsTable,
};

export default meta;

export const Default: StoryObj<typeof EnvironmentsTable> = {
  args: {
    onDeleteEnvironment: noop,
    environments: mockEnvironments,
  },
};
