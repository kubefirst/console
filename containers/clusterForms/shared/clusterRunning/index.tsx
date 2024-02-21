import React, { FunctionComponent, useCallback } from 'react';

import ClusterReady from '../../../../components/ClusterReady/ClusterReady';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import { setSelectedCluster } from '../../../../redux/slices/applications.slice';

const ClusterRunning: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { managementCluster } = useAppSelector(({ api }) => api);

  const { clusterName, domainName, subDomainName, vaultAuth } = managementCluster ?? {};

  const fullDomainName = `${subDomainName ? `${subDomainName}.${domainName}` : domainName}`;

  const onOpenConsole = useCallback(() => {
    dispatch(setSelectedCluster(managementCluster));
  }, [dispatch, managementCluster]);

  return (
    <ClusterReady
      onOpenConsole={onOpenConsole}
      clusterName={clusterName}
      domainName={fullDomainName}
      kbotPassword={vaultAuth?.kbotPassword}
    />
  );
};

export default ClusterRunning;
