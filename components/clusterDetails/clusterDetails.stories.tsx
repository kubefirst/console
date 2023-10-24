import { Meta, StoryObj } from '@storybook/react';

import { mockClusterConfig } from '../../tests/mocks/mockClusterConfig';
import { ClusterStatus, ClusterType } from '../../types/provision';

import ClusterDetails from '.';

const meta: Meta<typeof ClusterDetails> = {
  component: ClusterDetails,
};

export default meta;

export const Default: StoryObj<typeof ClusterDetails> = {
  args: {
    cluster: {
      ...mockClusterConfig,
      clusterId: '1',
      adminEmail: 'derrick@kubeshop.io',
      domainName: 'kubefirst.io',
      dnsProvider: 'civo',
      gitProvider: 'Github',
      gitAuth: {
        gitOwner: 'D-B-Hawk',
        gitToken: 'kray',
        gitUser: 'D-B-Hawk',
      },
      type: mockClusterConfig.type as ClusterType,
      environment: {
        id: '1',
        name: 'Demo',
        color: 'dark-sky-blue',
        description: 'Demo environment',
      },
      status: ClusterStatus.PROVISIONING,
    },
  },
};
