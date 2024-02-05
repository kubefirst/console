'use client';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Joyride, { ACTIONS, CallBackProps } from 'react-joyride';

import { CreateClusterFlow } from './createClusterFlow';
import {
  Container,
  Content,
  Header,
  LeftContainer,
  StyledDrawer,
} from './clusterManagement.styled';

import Button from '@/components/button';
import Typography from '@/components/typography';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createWorkloadCluster, deleteCluster } from '@/redux/thunks/api.thunk';
import {
  ClusterCreationStep,
  ClusterStatus,
  ClusterType,
  WorkloadCluster,
} from '@/types/provision';
import useToggle from '@/hooks/useToggle';
import useModal from '@/hooks/useModal';
import DeleteCluster from '@/components/deleteCluster';
import TabPanel, { Tab, a11yProps } from '@/components/tab';
import { BISCAY, MIDNIGHT_EXPRESS, SALTBOX_BLUE } from '@/constants/colors';
import { Flow } from '@/components/flow';
import ClusterTable from '@/components/clusterTable/clusterTable';
import {
  createDraftCluster,
  removeDraftCluster,
  setClusterCreationStep,
} from '@/redux/slices/api.slice';
import { setPresentedClusterName } from '@/redux/slices/api.slice';
import { usePhysicalClustersPermissions } from '@/hooks/usePhysicalClustersPermission';
import { InstallationType } from '@/types/redux';
import { setClusterManagamentTab } from '@/redux/slices/config.slice';
import { ClusterManagementTab } from '@/types/config';
import {
  DEFAULT_CLOUD_INSTANCE_SIZES,
  KUBECONFIG_CLI_DETAILS,
  RESERVED_DRAFT_CLUSTER_NAME,
  SUGGESTED_WORKLOAD_NODE_COUNT,
} from '@/constants';
import TourModal from '@/components/tourModal';
import JoyrideTooltip from '@/components/joyrideTooltip';
import { JOYRIDE_STEPS } from '@/constants/joyride';
import { getClusterTourStatus, updateClusterTourStatus } from '@/redux/thunks/settings.thunk';
import usePaywall from '@/hooks/usePaywall';
import UpgradeModal from '@/components/upgradeModal';
import { selectUpgradeLicenseDefinition } from '@/redux/selectors/subscription.selector';
import { getCloudProviderAuth } from '@/utils/getCloudProviderAuth';
import KubeConfigModal from '@/components/kubeConfigModal';

const ClusterManagement: FunctionComponent = () => {
  const {
    clusterCreationStep,
    clusterManagementTab,
    clusterMap,
    isBannerOpen,
    managementCluster,
    presentedClusterName,
    loading,
    takenConsoleTour,
  } = useAppSelector(({ api, queue, config, featureFlags, settings }) => ({
    clusterQueue: queue.clusterQueue,
    clusterManagementTab: config.clusterManagementTab,
    ...api,
    ...featureFlags.flags,
    ...settings,
  }));

  const { isOpen, closeModal } = useModal(!takenConsoleTour);
  const [startTour, setStartTour] = useState(false);

  const dispatch = useAppDispatch();
  const upgradeLicenseDefinition = useAppSelector(selectUpgradeLicenseDefinition());

  const {
    isOpen: isUpgradeModalOpen,
    openModal: openUpgradeModal,
    closeModal: closeUpgradeModal,
  } = useModal();
  const { hasPermissions } = usePhysicalClustersPermissions(managementCluster?.cloudProvider);
  const { canUseFeature } = usePaywall();

  const defaultClusterType = useMemo(() => {
    if (
      managementCluster &&
      managementCluster.cloudProvider &&
      hasPermissions &&
      canUseFeature('physicalClusters')
    ) {
      return ClusterType.WORKLOAD;
    }
    return ClusterType.WORKLOAD_V_CLUSTER;
  }, [managementCluster, hasPermissions, canUseFeature]);

  const tabColor = useMemo(
    () => (clusterManagementTab === ClusterManagementTab.LIST_VIEW ? BISCAY : SALTBOX_BLUE),
    [clusterManagementTab],
  );

  const { instanceSize } =
    DEFAULT_CLOUD_INSTANCE_SIZES[managementCluster?.cloudProvider ?? InstallationType.LOCAL];

  const presentedCluster = useMemo(
    () => clusterMap[presentedClusterName ?? ''],
    [clusterMap, presentedClusterName],
  );

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

  const {
    isOpen: isKubeconfigModalOpen,
    openModal: openKubeconfigModal,
    closeModal: closeKubeconfigModal,
  } = useModal();

  const handleMenuClose = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.CONFIG) {
      dispatch(removeDraftCluster());
    } else {
      dispatch(setClusterCreationStep(ClusterCreationStep.CONFIG));
    }
    dispatch(setPresentedClusterName(undefined));
    closeCreateClusterFlow();
  }, [clusterCreationStep, dispatch, closeCreateClusterFlow]);

  const handleDeleteCluster = useCallback(() => {
    if (presentedClusterName) {
      dispatch(deleteCluster(presentedClusterName))
        .unwrap()
        .then(() => {
          closeDeleteModal();
          handleMenuClose();
        });
    }
  }, [dispatch, presentedClusterName, closeDeleteModal, handleMenuClose]);

  const handleChange = useCallback(
    (_: React.SyntheticEvent, tabIndex: number) => {
      dispatch(setClusterManagamentTab(tabIndex));
      if (presentedClusterName) {
        dispatch(setPresentedClusterName(undefined));
      }
    },
    [dispatch, presentedClusterName],
  );

  const handleClusterSelect = useCallback(
    (clusterName: string) => {
      dispatch(setPresentedClusterName(clusterName));
      dispatch(setClusterCreationStep(ClusterCreationStep.DETAILS));
      openCreateClusterFlow();
    },
    [dispatch, openCreateClusterFlow],
  );

  const handleAddWorkloadCluster = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.CONFIG && managementCluster) {
      const {
        gitProvider,
        cloudProvider,
        domainName,
        adminEmail,
        gitAuth,
        dnsProvider,
        cloudRegion,
      } = managementCluster;

      const draftCluster: WorkloadCluster = {
        clusterId: RESERVED_DRAFT_CLUSTER_NAME,
        clusterName: RESERVED_DRAFT_CLUSTER_NAME,
        status: ClusterStatus.PROVISIONING,
        type: defaultClusterType,
        nodeCount: SUGGESTED_WORKLOAD_NODE_COUNT,
        cloudProvider,
        cloudRegion,
        gitProvider,
        domainName,
        gitAuth,
        adminEmail,
        dnsProvider,
      };

      dispatch(createDraftCluster(draftCluster));
    }
    openCreateClusterFlow();
  }, [managementCluster, dispatch, openCreateClusterFlow, clusterCreationStep, defaultClusterType]);

  const handleCreateCluster = () => {
    const draftCluster = clusterMap[RESERVED_DRAFT_CLUSTER_NAME];

    if (
      draftCluster?.type === ClusterType.WORKLOAD &&
      clusterCreationStep !== ClusterCreationStep.DETAILS
    ) {
      const canCreatePhysicalClusters = canUseFeature('physicalClusters');

      if (!canCreatePhysicalClusters) {
        return openUpgradeModal();
      }
    }

    if (clusterCreationStep !== ClusterCreationStep.DETAILS) {
      dispatch(createWorkloadCluster());
    }
  };

  const handleDeleteMenuClick = useCallback(
    (clusterName: string) => {
      dispatch(setPresentedClusterName(clusterName));
      openDeleteModal();
    },
    [dispatch, openDeleteModal],
  );

  const handleDownloadKubeconfig = useCallback(async () => {
    if ([InstallationType.AWS, InstallationType.GOOGLE].includes(presentedCluster.cloudProvider)) {
      openKubeconfigModal();
    } else if (managementCluster && presentedCluster) {
      const { clusterName, cloudProvider, cloudRegion, type } = presentedCluster;
      const { key, value } = getCloudProviderAuth(managementCluster);
      try {
        const {
          data: { config },
        } = await axios.post<{ config: string }>(`/api/proxy`, {
          url: `/kubeconfig/${cloudProvider}`,
          body: {
            cluster_name: clusterName,
            man_clust_name: managementCluster.clusterName,
            vcluster: type !== ClusterType.MANAGEMENT,
            cloud_region: cloudRegion,
            [`${key}_auth`]: value,
          },
        });

        const encoded = `data:text/yaml;chatset=utf-8,${encodeURIComponent(config)}`;

        const downloadLink = document.createElement('a');
        downloadLink.href = encoded;
        downloadLink.download = `${clusterName}-kubeconfig`;

        document.body.appendChild(downloadLink);

        downloadLink.click();

        document.body.removeChild(downloadLink);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  }, [managementCluster, presentedCluster, openKubeconfigModal]);

  const handleTakeTour = useCallback(() => {
    closeModal();
    setStartTour(true);
  }, [closeModal]);

  const handleTourSkip = useCallback(() => {
    closeModal();
    if (managementCluster) {
      dispatch(
        updateClusterTourStatus({ clusterName: managementCluster.clusterName, takenTour: true }),
      );
    }
  }, [closeModal, dispatch, managementCluster]);

  const handleJoyrideCallback = useCallback(
    ({ action }: CallBackProps) => {
      if (action === ACTIONS.RESET && managementCluster) {
        dispatch(
          updateClusterTourStatus({ clusterName: managementCluster.clusterName, takenTour: true }),
        );
      }
    },
    [dispatch, managementCluster],
  );

  const { command, commandDocLink } =
    KUBECONFIG_CLI_DETAILS[managementCluster?.cloudProvider ?? InstallationType.AWS];

  useEffect(() => {
    if (managementCluster) {
      dispatch(getClusterTourStatus(managementCluster.clusterName));
    }
  }, [dispatch, managementCluster]);

  return (
    <Container>
      <Header>
        <LeftContainer>
          <Typography variant="subtitle1">Clusters</Typography>
          <Box>
            <Tabs value={clusterManagementTab} onChange={handleChange} indicatorColor="primary">
              <Tab
                color={tabColor}
                label={<Typography variant="buttonSmall">Graph view</Typography>}
                {...a11yProps(ClusterManagementTab.GRAPH_VIEW)}
                sx={{ textTransform: 'initial', marginRight: '24px' }}
              />
              <Tab
                color={tabColor}
                label={<Typography variant="buttonSmall">List view</Typography>}
                {...a11yProps(ClusterManagementTab.LIST_VIEW)}
                sx={{ textTransform: 'initial', marginRight: 0 }}
              />
            </Tabs>
          </Box>
        </LeftContainer>

        <Button
          color="primary"
          variant="contained"
          onClick={handleAddWorkloadCluster}
          data-test-id="add-workload-cluster"
          sx={{ marginRight: '24px' }}
        >
          Add workload cluster
        </Button>
      </Header>
      <Content>
        <TabPanel value={clusterManagementTab} index={ClusterManagementTab.LIST_VIEW}>
          {managementCluster && (
            <ClusterTable
              clusters={clusterMap}
              managementCluster={managementCluster}
              onDeleteCluster={handleDeleteMenuClick}
              selectedClusterName={presentedCluster?.clusterName}
              onClusterRowSelected={handleClusterSelect}
            />
          )}
        </TabPanel>
        <TabPanel value={clusterManagementTab} index={ClusterManagementTab.GRAPH_VIEW}>
          <Joyride
            steps={JOYRIDE_STEPS}
            run={startTour}
            tooltipComponent={JoyrideTooltip}
            callback={handleJoyrideCallback}
            continuous
            styles={{
              options: {
                arrowColor: MIDNIGHT_EXPRESS,
              },
            }}
          />
          <TourModal
            isOpen={isOpen}
            onCloseModal={handleTourSkip}
            onSkip={handleTourSkip}
            onTakeTour={handleTakeTour}
            styleOverrides={{ width: '500px', padding: 0 }}
          />
          <Flow onNodeClick={handleClusterSelect} />
        </TabPanel>
      </Content>
      <StyledDrawer
        open={createClusterFlowOpen}
        onClose={handleMenuClose}
        anchor="right"
        isBannerOpen={isBannerOpen}
      >
        <CreateClusterFlow
          cluster={presentedCluster}
          managementCluster={managementCluster}
          clusterCreationStep={clusterCreationStep}
          onMenuClose={handleMenuClose}
          onClusterDelete={openDeleteModal}
          onDownloadKubeconfig={handleDownloadKubeconfig}
          onSubmit={handleCreateCluster}
          defaultValues={{
            type: defaultClusterType,
            nodeCount: SUGGESTED_WORKLOAD_NODE_COUNT,
            instanceSize,
          }}
          loading={loading}
        />
      </StyledDrawer>
      {!!presentedCluster && (
        <DeleteCluster
          isOpen={isDeleteModalOpen}
          onCloseModal={closeDeleteModal}
          onDelete={handleDeleteCluster}
          cluster={presentedCluster}
        />
      )}
      {isUpgradeModalOpen && (
        <UpgradeModal
          isOpen={isUpgradeModalOpen}
          clusterLimitText={upgradeLicenseDefinition?.text as string}
          clusterLimitDescription={upgradeLicenseDefinition?.description as string}
          ctaText={upgradeLicenseDefinition?.ctaText as string}
          closeModal={closeUpgradeModal}
        />
      )}
      {isKubeconfigModalOpen && (
        <KubeConfigModal
          isOpen={isKubeconfigModalOpen}
          onAcceptance={closeKubeconfigModal}
          onCloseModal={closeKubeconfigModal}
          command={command}
          commandDocLink={commandDocLink}
        />
      )}
    </Container>
  );
};

export default ClusterManagement;
