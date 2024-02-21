import { Meta, StoryObj } from '@storybook/react';

import { mockEnvironmentsResponse } from '../../tests/mocks/mockEnvironmentsResponse';
import { createEnvMap } from '../../utils/createEnvMap';

import { CreateEnvironmentMenu } from './CreateEnvironmentMenu';

const mockEnvironments = createEnvMap(mockEnvironmentsResponse);

const meta: Meta<typeof CreateEnvironmentMenu> = {
  component: CreateEnvironmentMenu,
};

export default meta;

export const Default: StoryObj<typeof CreateEnvironmentMenu> = {
  args: {
    previouslyCreatedEnvironments: mockEnvironments,
    errorMessage: '',
  },
};
