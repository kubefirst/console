import { Meta, StoryObj } from '@storybook/react';

import { mockGitopsCatalogApp } from '../../tests/mocks/mockGitopsCatalogApp';

import GitOpsCatalogCard from './GitOpsCatalogCard';

const meta: Meta<typeof GitOpsCatalogCard> = {
  component: GitOpsCatalogCard,
};

export default meta;

export const Default: StoryObj<typeof GitOpsCatalogCard> = {
  args: {
    ...mockGitopsCatalogApp,
    isDeletable: false,
  },
};
