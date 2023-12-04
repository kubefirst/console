import { Meta, StoryObj } from '@storybook/react';

import { mockEnvironmentsResponse } from '../../tests/mocks/mockEnvironmentsResponse';
import { createEnvMap } from '../../utils/createEnvMap';

import { EnvironmentMenu } from '.';

const mockEnvironments = createEnvMap(mockEnvironmentsResponse);

const meta: Meta<typeof EnvironmentMenu> = {
  component: EnvironmentMenu,
};

export default meta;

export const Default: StoryObj<typeof EnvironmentMenu> = {
  args: {
    previouslyCreatedEnvironments: mockEnvironments,
    errorMessage: '',
    envToEdit: Object.values(mockEnvironments)[0],
  },
};
