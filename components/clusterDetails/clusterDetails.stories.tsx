import { Meta, StoryObj } from '@storybook/react';

import ClusterDetails from './ClusterDetails';

import { mockClusterConfig } from '@/tests/mocks/mockClusterConfig';
import { ClusterStatus, ClusterType } from '@/types/provision';
import { GitProvider } from '@/types';
import { InstallationType } from '@/types/redux';

const meta: Meta<typeof ClusterDetails> = {
  component: ClusterDetails,
};

export default meta;

export const Default: StoryObj<typeof ClusterDetails> = {
  args: {
    cluster: {
      ...mockClusterConfig,
      clusterId: '1',
      status: ClusterStatus.PROVISIONED,
      clusterName: 'man-cluster-1',
      cloudProvider: InstallationType.CIVO,
      adminEmail: 'derrick@kubeshop.io',
      domainName: 'kubefirst.io',
      dnsProvider: 'civo',
      gitProvider: GitProvider.GITHUB,
      gitAuth: {
        gitOwner: 'D-B-Hawk',
        gitToken: 'kray',
        gitUser: 'D-B-Hawk',
      },
      type: mockClusterConfig.type as ClusterType,
      environment: {
        name: 'Demo',
        color: 'dark-sky-blue',
        description: 'Environment for demoing to prospective customers.',
      },
    },
  },
};
