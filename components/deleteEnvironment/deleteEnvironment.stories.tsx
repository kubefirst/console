import { Meta, StoryObj } from '@storybook/react';

import { mockEnvironmentsResponse } from '../../tests/mocks/mockEnvironmentsResponse';
import { mapEnvironmentFromRaw } from '../../utils/mapEnvironmentFromRaw';

import DeleteEnvironment from './DeleteEnvironment';

const mockEnvironments = mockEnvironmentsResponse.map(mapEnvironmentFromRaw);

const meta: Meta<typeof DeleteEnvironment> = {
  title: 'Components/DeleteEnvironment',
  component: DeleteEnvironment,
};

export default meta;

type Story = StoryObj<typeof DeleteEnvironment>;

export const Default: Story = {
  args: {
    environment: mockEnvironments[0],
    boundToCluster: false,
    isOpen: true,
  },
};

export const BoundEnvironment: Story = {
  args: {
    environment: mockEnvironments[0],
    boundToCluster: true,
    isOpen: true,
  },
};
