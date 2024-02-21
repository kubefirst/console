'use client';
import React, { FunctionComponent, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import Applications from '@/containers/Applications/Applications';
import { useAppSelector } from '@/redux/store';
import { Route } from '@/constants';

export interface ApplicationsPageProps {
  isClusterZero: boolean;
}

const ApplicationsPage: FunctionComponent<ApplicationsPageProps> = ({ isClusterZero }) => {
  const { push } = useRouter();

  const { managementCluster } = useAppSelector(({ api }) => api);

  const hasExistingCluster = useMemo(
    () => !isClusterZero || managementCluster,
    [isClusterZero, managementCluster],
  );

  if (!hasExistingCluster) {
    push(Route.HOME);
  }

  return hasExistingCluster ? <Applications /> : null;
};
export default ApplicationsPage;
