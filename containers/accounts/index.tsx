'use client';
import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Container, Header } from './accounts.styled';

import Typography from '@/components/typography';
import { VOLCANIC_SAND } from '@/constants/colors';
import LearnMore from '@/components/learnMore';
import { AccountsTable } from '@/components/accountsTable';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getCloudAccounts, updateCloudAccounts } from '@/redux/thunks/cluster.thunk';
import { CloudAccount } from '@/types/cloudAccount';

const Accounts: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const { cloudAccounts, managementCluster } = useAppSelector(({ api, cluster }) => ({
    cloudAccounts: cluster.cloudAccounts,
    managementCluster: api.managementCluster,
  }));

  const handleRedirect = () => {
    push('accounts/add');
  };

  const handleEditAccount = (accountToUpdate: CloudAccount) => {
    const clonedCloudAccounts = cloudAccounts.map((account) => {
      if (account.id === accountToUpdate.id) {
        return accountToUpdate;
      }

      return account;
    });

    dispatch(
      updateCloudAccounts({
        cloudAccounts: clonedCloudAccounts,
        clusterName: managementCluster?.clusterName as string,
      }),
    ).then(() => dispatch(getCloudAccounts(managementCluster?.clusterName as string)));
  };

  useEffect(() => {
    if (managementCluster?.clusterName) {
      dispatch(getCloudAccounts(managementCluster?.clusterName));
    }
  }, [dispatch, managementCluster?.clusterName]);

  return (
    <Container>
      <Header>
        <Typography variant="h6" color={VOLCANIC_SAND} sx={{ mb: 1 }}>
          Cloud accounts
        </Typography>
        <LearnMore
          description={
            <Typography variant="body2" color={VOLCANIC_SAND}>
              Add and manage the cloud accounts that host your clusters.
            </Typography>
          }
          linkTitle="Learn more"
          href="https://docs.kubefirst.io/civo/quick-start/cluster-management"
        />
      </Header>

      <AccountsTable
        accounts={cloudAccounts}
        handleEnableAccount={() => {
          console.log('test');
        }}
        handleEditAccount={handleEditAccount}
        handleRedirect={handleRedirect}
      />
    </Container>
  );
};

export default Accounts;
