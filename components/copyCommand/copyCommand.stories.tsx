import { Meta, StoryObj } from '@storybook/react';

import CopyCommand from './CopyCommand';

const meta: Meta<typeof CopyCommand> = {
  component: CopyCommand,
};

export default meta;

export const Default: StoryObj<typeof CopyCommand> = {
  args: {
    command:
      'gcloud container clusters get-credentials NAME [--internal-ip] [--location=LOCATION     | --region=REGION     | --zone=ZONE, -z ZONE] [GCLOUD_WIDE_FLAG …]',
  },
};
