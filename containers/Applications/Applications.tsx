'use client';
import React, { FunctionComponent, useEffect, useCallback, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import sortBy from 'lodash/sortBy';
import { useSession } from 'next-auth/react';

import Application from '../Application/Application';
import GitOpsCatalog from '../GitOpsCatalog/GitOpsCatalog';

import {
  Container,
  Content,
  Header,
  LearnMoreLink,
  ApplicationsContainer,
  ApplicationsFilter,
} from './Applications.styled';

import TabPanel, { Tab, a11yProps } from '@/components/Tab/Tab';
import Typography from '@/components/Typography/Typography';
import {
  getClusterApplications,
  getGitOpsCatalogApps,
  uninstallGitOpsApp,
  validateGitOpsApplication,
} from '@/redux/thunks/applications.thunk';
import { sendTelemetryEvent } from '@/redux/thunks/api.thunk';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { DOCS_LINK } from '@/constants';
import { BISCAY, SALTBOX_BLUE, VOLCANIC_SAND } from '@/constants/colors';
import {
  addAppToQueue,
  removeAppFromQueue,
  setFilterState,
  setSelectedClusterApplication,
} from '@/redux/slices/applications.slice';
import { ClusterStatus, WORKLOAD_CLUSTER_TYPES } from '@/types/provision';
import { ClusterApplication, GitOpsCatalogApp } from '@/types/applications';
import useModal from '@/hooks/useModal';
import UninstallApplication from '@/components/UninstallApplication/UninstallApplication';

enum APPLICATION_TAB {
  PROVISIONED,
  GITOPS_CATALOG,
}

enum Target {
  TEMPLATE = 'Template',
  CLUSTER = 'Cluster',
}

const TARGET_OPTIONS = Object.values(Target);

const Applications: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(0);
  const { isOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
  const { data: session } = useSession();

  const {
    clusterApplications,
    isTelemetryDisabled,
    clusterMap,
    filter,
    selectedCategories,
    gitOpsCatalogApps,
    installedClusterAppNames,
    isLoading,
    managementCluster,
    selectedClusterApplication,
    canDeleteSelectedApp,
    appsQueue,
  } = useAppSelector(({ config, applications, api }) => ({
    isTelemetryDisabled: config.isTelemetryDisabled,
    clusterMap: api.clusterMap,
    managementCluster: api.managementCluster,
    ...applications,
  }));

  const dispatch = useAppDispatch();

  const handleLinkClick = useCallback(
    (url: string, name: string) => {
      if (!isTelemetryDisabled) {
        const event = `console.${name.toLowerCase()}.link`.replace(/ /g, '');
        dispatch(sendTelemetryEvent({ event }));
      }
    },
    [dispatch, isTelemetryDisabled],
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const catalogApps = useMemo(
    () =>
      filter.target === Target.TEMPLATE
        ? gitOpsCatalogApps.filter((app) => !app.secret_keys?.length)
        : gitOpsCatalogApps,
    [filter.target, gitOpsCatalogApps],
  );

  const clusterSelectOptions = useMemo((): { label: string; value: string }[] => {
    if (!filter.target) {
      return [];
    }

    if (filter.target === Target.TEMPLATE) {
      return WORKLOAD_CLUSTER_TYPES.map((type) => ({ label: type, value: type }));
    }

    return Object.keys(clusterMap)
      .filter((key) => {
        const cluster = clusterMap[key];
        return cluster.status === ClusterStatus.PROVISIONED;
      })
      .map((clusterName) => ({
        label: clusterName,
        value: clusterName,
      }));
  }, [filter.target, clusterMap]);

  const filteredApps = useMemo(() => {
    return clusterApplications.filter((app) =>
      app.name.toLowerCase().includes(searchTerm?.toLowerCase() as string),
    );
  }, [clusterApplications, searchTerm]);

  const uninstalledCatalogApps = useMemo(
    () => catalogApps.filter((app) => !clusterApplications.map((s) => s.name).includes(app.name)),
    [clusterApplications, catalogApps],
  );

  const targetOptions = useMemo(() => {
    const options = TARGET_OPTIONS.map((target) => ({ label: target, value: target }));
    if (managementCluster?.cloudProvider === 'k3d') {
      return options.filter(({ value }) => value !== Target.TEMPLATE);
    }

    return options;
  }, [managementCluster?.cloudProvider]);

  const filteredCatalogApps = useMemo(() => {
    let apps: GitOpsCatalogApp[] = [];
    if (!selectedCategories.length) {
      apps = uninstalledCatalogApps;
    } else {
      apps = uninstalledCatalogApps.filter(
        ({ category, name }) =>
          category &&
          selectedCategories.includes(category) &&
          !installedClusterAppNames.includes(name),
      );
    }

    return sortBy(apps, (app) => app.display_name).filter((app) =>
      app.name.toLowerCase().includes(searchTerm?.toLowerCase() as string),
    );
  }, [selectedCategories, uninstalledCatalogApps, installedClusterAppNames, searchTerm]);

  const handleOpenUninstallModalConfirmation = useCallback(() => {
    openDeleteModal();
  }, [openDeleteModal]);

  const handleCloseUninstallModalConfirmation = useCallback(() => {
    if (!isLoading) {
      dispatch(removeAppFromQueue(selectedClusterApplication?.name as string));
    }
    closeDeleteModal();
  }, [closeDeleteModal, dispatch, isLoading, selectedClusterApplication?.name]);

  const validateUninstallApplication = useCallback(
    (application: ClusterApplication) => {
      dispatch(addAppToQueue(application?.name as string));
      dispatch(setSelectedClusterApplication(application));

      dispatch(
        validateGitOpsApplication({
          application,
        }),
      ).then(() => {
        dispatch(removeAppFromQueue(selectedClusterApplication?.name as string));
        handleOpenUninstallModalConfirmation();
      });
    },
    [dispatch, handleOpenUninstallModalConfirmation, selectedClusterApplication?.name],
  );

  const handleUninstallApplication = useCallback(() => {
    dispatch(addAppToQueue(selectedClusterApplication?.name as string));
    closeDeleteModal();
    dispatch(
      uninstallGitOpsApp({
        application: selectedClusterApplication as ClusterApplication,
        user: (session?.user?.email as string) || 'kbot',
      }),
    );
  }, [closeDeleteModal, dispatch, selectedClusterApplication, session?.user?.email]);

  useEffect(() => {
    if (managementCluster?.cloudProvider) {
      dispatch(getGitOpsCatalogApps(managementCluster?.cloudProvider));
    }
  }, [dispatch, managementCluster?.cloudProvider]);

  useEffect(() => {
    const { cluster } = filter;
    if (cluster) {
      dispatch(getClusterApplications({ clusterName: cluster }));
    }
  }, [dispatch, filter]);

  const Apps = useMemo(
    () => (
      <>
        <ApplicationsContainer>
          {filteredApps.map((application: ClusterApplication) => (
            <Application
              key={application.name}
              isUninstalling={appsQueue.includes(application?.name as string)}
              {...application}
              onLinkClick={handleLinkClick}
              onUninstall={() => validateUninstallApplication(application)}
            />
          ))}
        </ApplicationsContainer>
      </>
    ),
    [appsQueue, filteredApps, handleLinkClick, validateUninstallApplication],
  );

  return (
    <Container>
      <Header>
        <Typography variant="h6">Applications Overview</Typography>
      </Header>
      <>
        <Box sx={{ width: 'fit-content', mb: 4 }}>
          <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary">
            <Tab
              color={activeTab === APPLICATION_TAB.PROVISIONED ? BISCAY : SALTBOX_BLUE}
              label={<Typography variant="buttonSmall">Installed applications</Typography>}
              {...a11yProps(APPLICATION_TAB.PROVISIONED)}
              sx={{ textTransform: 'initial', mr: 3 }}
            />

            <Tab
              color={activeTab === APPLICATION_TAB.GITOPS_CATALOG ? BISCAY : SALTBOX_BLUE}
              label={<Typography variant="buttonSmall">GitOps catalog</Typography>}
              {...a11yProps(APPLICATION_TAB.GITOPS_CATALOG)}
              sx={{ textTransform: 'initial' }}
            />
          </Tabs>
        </Box>
        <Content>
          {activeTab === APPLICATION_TAB.PROVISIONED ? (
            <Typography variant="body2" sx={{ mb: 3 }} color={VOLCANIC_SAND}>
              Click on a link to access the service Kubefirst has provisioned for you.{' '}
              <LearnMoreLink
                href={DOCS_LINK}
                target="_blank"
                onClick={() => handleLinkClick(DOCS_LINK, 'docs')}
              >
                Learn more
              </LearnMoreLink>
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ mb: 3 }} color={VOLCANIC_SAND}>
              Add the latest version of your favourite application to your cluster.{' '}
              <LearnMoreLink
                href={DOCS_LINK}
                target="_blank"
                onClick={() => handleLinkClick(DOCS_LINK, 'docs')}
              >
                Learn more
              </LearnMoreLink>
            </Typography>
          )}

          {managementCluster?.clusterName && (
            <ApplicationsFilter
              targetOptions={targetOptions}
              clusterSelectOptions={clusterSelectOptions}
              searchOptions={filteredApps.map((app) => ({ label: app.name, value: app.name }))}
              onFilterChange={(filter) => dispatch(setFilterState(filter))}
              onSearchChange={setSearchTerm}
              defaultCluster={managementCluster?.clusterName as string}
            />
          )}
          <TabPanel value={activeTab} index={APPLICATION_TAB.PROVISIONED}>
            {Apps}
          </TabPanel>
          <TabPanel value={activeTab} index={APPLICATION_TAB.GITOPS_CATALOG}>
            <GitOpsCatalog catalogApplications={filteredCatalogApps} />
          </TabPanel>
        </Content>
      </>
      {isOpen && (
        <UninstallApplication
          isOpen
          canDeleteSelectedApp={canDeleteSelectedApp}
          application={selectedClusterApplication?.name as string}
          cluster={filter.cluster as string}
          onDelete={handleUninstallApplication}
          onCloseModal={handleCloseUninstallModalConfirmation}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
};

export default Applications;
