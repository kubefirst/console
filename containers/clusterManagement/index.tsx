'use client';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';

import Button from '../../components/button';
import Typography from '../../components/typography';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  createWorkloadCluster,
  deleteCluster,
  getCloudRegions,
  getClusters,
} from '../../redux/thunks/api.thunk';
import { Cluster, ClusterCreationStep, ClusterStatus, ClusterType } from '../../types/provision';
import useToggle from '../../hooks/useToggle';
import Drawer from '../../components/drawer';
import useModal from '../../hooks/useModal';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import DeleteCluster from '../../components/deleteCluster';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import { BISCAY, SALTBOX_BLUE } from '../../constants/colors';
import { Flow } from '../../components/flow';
import ClusterTable from '../../components/clusterTable/clusterTable';
import {
  createDraftCluster,
  removeDraftCluster,
  setClusterCreationStep,
} from '../../redux/slices/api.slice';
import { setPresentedClusterId } from '../../redux/slices/api.slice';
import { useQueue } from '../../hooks/useQueue';
import { setNotifiedOfBetaPhysicalClusters } from '../../redux/slices/notifications.slice';
import { getAllEnvironments } from '../../redux/thunks/environments.thunk';

import { CreateClusterFlow } from './createClusterFlow';
import { Container, Content, Header } from './clusterManagement.styled';

import { InstallationType } from '@/types/redux';
import useFeatureFlag from '@/hooks/useFeatureFlag';
import { removeClusterFromQueue } from '@/redux/slices/queue.slice';

enum MANAGEMENT_TABS {
  LIST_VIEW = 0,
  GRAPH_VIEW = 1,
}

const ClusterManagement: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(MANAGEMENT_TABS.LIST_VIEW);

  const {
    clusterQueue,
    managementCluster,
    clusterCreationStep,
    presentedClusterId,
    loading,
    notifiedOfBetaPhysicalClusters,
    clusterMap,
    environments,
  } = useAppSelector(({ api, queue, notifications, environments }) => ({
    clusterQueue: queue.clusterQueue,
    notifiedOfBetaPhysicalClusters: notifications.notifiedOfBetaPhysicalClusters,
    ...api,
    ...environments,
  }));

  const { addClusterToQueue } = useQueue();

  const { isEnabled: canProvisionAWSPhysicalClusters } = useFeatureFlag(
    'canProvisionAwsPhysicalClusters',
  );
  const { isEnabled: canProvisionGCPPhysicalClusters } = useFeatureFlag(
    'canProvisionGCPPhysicalClusters',
  );
  const { isEnabled: canProvisionDOPhysicalClusters } = useFeatureFlag(
    'canProvisionDOPhysicalClusters',
  );
  const { isEnabled: canProvisionVultrPhysicalClusters } = useFeatureFlag(
    'canProvisionVultrPhysicalClusters',
  );

  // check if user has permission to provision physical clusters based on cloud provider,
  // otherwise default to true if no feature flag check
  const physicalClustersPermission = useMemo(
    (): Record<InstallationType, boolean> => ({
      [InstallationType.AWS]: canProvisionAWSPhysicalClusters,
      [InstallationType.DIGITAL_OCEAN]: canProvisionDOPhysicalClusters,
      [InstallationType.GOOGLE]: canProvisionGCPPhysicalClusters,
      [InstallationType.VULTR]: canProvisionVultrPhysicalClusters,
      [InstallationType.CIVO]: true,
      [InstallationType.LOCAL]: true,
    }),
    [
      canProvisionAWSPhysicalClusters,
      canProvisionDOPhysicalClusters,
      canProvisionGCPPhysicalClusters,
      canProvisionVultrPhysicalClusters,
    ],
  );

  const defaultClusterType = useMemo(() => {
    if (
      managementCluster &&
      managementCluster.cloudProvider &&
      physicalClustersPermission[managementCluster.cloudProvider]
    ) {
      return ClusterType.WORKLOAD;
    }
    return ClusterType.WORKLOAD_V_CLUSTER;
  }, [managementCluster, physicalClustersPermission]);

  const {
    isOpen: createClusterFlowOpen,
    open: openCreateClusterFlow,
    close: closeCreateClusterFlow,
  } = useToggle();

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const dispatch = useAppDispatch();

  const handleGetClusters = useCallback(async (): Promise<void> => {
    await dispatch(getClusters());
  }, [dispatch]);

  const handleMenuClose = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.CONFIG) {
      dispatch(removeDraftCluster());
    } else {
      dispatch(setClusterCreationStep(ClusterCreationStep.CONFIG));
    }
    dispatch(setPresentedClusterId(undefined));
    closeCreateClusterFlow();
  }, [clusterCreationStep, dispatch, closeCreateClusterFlow]);

  const handleDeleteCluster = () => {
    if (presentedClusterId) {
      dispatch(deleteCluster(presentedClusterId))
        .unwrap()
        .then(() => {
          addClusterToQueue({
            id: presentedClusterId,
            clusterName: managementCluster?.clusterName as string,
            status: ClusterStatus.DELETING,
            clusterType: ClusterType.WORKLOAD,
            callback: handleGetClusters,
          });
          closeDeleteModal();
          handleMenuClose();
        });
    }
  };

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
      if (presentedClusterId) {
        dispatch(setPresentedClusterId(undefined));
      }
    },
    [dispatch, presentedClusterId],
  );

  const handleNodeClick = useCallback(
    (cluster: Cluster) => {
      dispatch(setPresentedClusterId(cluster.clusterId));
      dispatch(setClusterCreationStep(ClusterCreationStep.DETAILS));
      openCreateClusterFlow();
    },
    [dispatch, openCreateClusterFlow],
  );

  const handleMenuButtonClick = useCallback(
    (clusterId: Cluster['clusterId']) => {
      dispatch(setPresentedClusterId(presentedClusterId === clusterId ? undefined : clusterId));
    },
    [dispatch, presentedClusterId],
  );

  const handleAddWorkloadCluster = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.CONFIG && managementCluster) {
      dispatch(createDraftCluster());
    }
    openCreateClusterFlow();
  }, [managementCluster, dispatch, openCreateClusterFlow, clusterCreationStep]);

  const handleCreateCluster = () => {
    if (clusterCreationStep !== ClusterCreationStep.DETAILS) {
      dispatch(createWorkloadCluster())
        .unwrap()
        .then((response) => {
          addClusterToQueue({
            id: response.clusterId,
            clusterName: managementCluster?.clusterName as string,
            clusterType: ClusterType.WORKLOAD,
            status: ClusterStatus.PROVISIONING,
            callback: handleGetClusters,
          });
          dispatch(setClusterCreationStep(clusterCreationStep + 1));
        });
    }
  };

  const handleClusterEdit = useCallback(() => {
    // TODO: Implement edit for cluster environment
  }, []);

  const handleNotificationClose = useCallback(() => {
    dispatch(setNotifiedOfBetaPhysicalClusters(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllEnvironments());
  }, [dispatch]);

  useEffect(() => {
    if (managementCluster) {
      dispatch(getCloudRegions(managementCluster));
    }
  }, [dispatch, managementCluster]);

  useEffect(() => {
    const deletedClusters = Object.values(clusterQueue).filter(
      (cluster) => cluster.status === ClusterStatus.DELETED,
    );
    if (deletedClusters.length) {
      deletedClusters.forEach((cluster) => dispatch(removeClusterFromQueue(cluster.id)));
    }
  }, [clusterQueue, dispatch]);

  const tableRef = useRef<HTMLTableSectionElement>(null);

  const isListView = useMemo(() => activeTab === MANAGEMENT_TABS.LIST_VIEW, [activeTab]);

  const handleClickOutside = useCallback(() => {
    if (presentedClusterId && isListView && !createClusterFlowOpen && !isDeleteModalOpen) {
      dispatch(setPresentedClusterId(undefined));
    }
  }, [dispatch, presentedClusterId, isListView, isDeleteModalOpen, createClusterFlowOpen]);

  useOnClickOutside(tableRef, handleClickOutside);

  return (
    <Container>
      <Header>
        <Box sx={{ width: 'fit-content', marginLeft: '39px' }}>
          <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary">
            <Tab
              color={activeTab === MANAGEMENT_TABS.LIST_VIEW ? BISCAY : SALTBOX_BLUE}
              label={<Typography variant="buttonSmall">List view</Typography>}
              {...a11yProps(MANAGEMENT_TABS.LIST_VIEW)}
              sx={{ textTransform: 'initial', mr: 3 }}
            />

            <Tab
              color={activeTab === MANAGEMENT_TABS.GRAPH_VIEW ? BISCAY : SALTBOX_BLUE}
              label={<Typography variant="buttonSmall">Graph view</Typography>}
              {...a11yProps(MANAGEMENT_TABS.GRAPH_VIEW)}
              sx={{ textTransform: 'initial' }}
            />
          </Tabs>
        </Box>
        <Button
          color="primary"
          variant="contained"
          style={{ marginRight: '24px' }}
          onClick={handleAddWorkloadCluster}
          data-test-id="add-workload-cluster"
        >
          Add workload cluster
        </Button>
      </Header>
      <Content>
        <TabPanel value={activeTab} index={MANAGEMENT_TABS.LIST_VIEW}>
          {managementCluster && (
            <ClusterTable
              ref={tableRef}
              clusters={clusterMap}
              managementCluster={managementCluster}
              onDeleteCluster={openDeleteModal}
              onMenuButtonClick={handleMenuButtonClick}
              presentedClusterId={presentedClusterId}
            />
          )}
        </TabPanel>
        <TabPanel value={activeTab} index={MANAGEMENT_TABS.GRAPH_VIEW}>
          <Flow onNodeClick={handleNodeClick} />
        </TabPanel>
      </Content>
      <Drawer
        open={createClusterFlowOpen}
        onClose={handleMenuClose}
        anchor="right"
        PaperProps={{
          sx: {
            top: '65px',
            boxShadow: '0px 2px 4px rgba(100, 116, 139, 0.16)',
            width: '684px',
            height: 'calc(100% - 65px)',
          },
        }}
        sx={{
          '&.MuiDrawer-root': {
            '.MuiBackdrop-root': {
              backgroundColor: 'transparent',
            },
          },
        }}
      >
        <CreateClusterFlow
          cluster={clusterMap[presentedClusterId ?? '']}
          managementCluster={managementCluster}
          clusterCreationStep={clusterCreationStep}
          onMenuClose={handleMenuClose}
          onClusterDelete={openDeleteModal}
          onSubmit={handleCreateCluster}
          defaultValues={{ type: defaultClusterType }}
          loading={loading}
          notifiedOfBetaPhysicalClusters={notifiedOfBetaPhysicalClusters}
          onNotificationClose={handleNotificationClose}
          onClusterEdit={handleClusterEdit}
          environments={environments}
        />
      </Drawer>
      {presentedClusterId && (
        <DeleteCluster
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDeleteCluster}
          cluster={clusterMap[presentedClusterId]}
        />
      )}
    </Container>
  );
};

export default ClusterManagement;
