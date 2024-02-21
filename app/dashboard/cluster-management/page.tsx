import React from 'react';

import ClusterManagement from '@/containers/ClusterManagement/ClusterManagement';

const ClusterManagementPage = () => {
  const isClusterZero = process.env.IS_CLUSTER_ZERO === 'true';

  return !isClusterZero && <ClusterManagement />;
};

export default ClusterManagementPage;
