import React, { FunctionComponent, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '../../../components/button';
import { FIRE_BRICK, SALTBOX_BLUE } from '../../../constants/colors';
import ClusterCreationForm from '../../../containers/clusterForms/clusterCreation';
import ClusterDetails from '../../../components/clusterDetails';
import {
  Cluster,
  ClusterCreationStep,
  ClusterStatus,
  DraftCluster,
  ManagementCluster,
  NewWorkloadClusterConfig,
} from '../../../types/provision';
import HeadsUpNotification from '../../../components/headsUpNotification';

import { CloseButton, Form, FormContent, Menu, MenuHeader } from './createClusterFlow.styled';

import Row from '@/components/row';
import Typography from '@/components/typography';
import useToggle from '@/hooks/useToggle';
import { EnvMap } from '@/redux/slices/environments.slice';

const actionButtonText: Record<ClusterCreationStep, string> = {
  [ClusterCreationStep.CONFIG]: 'Create cluster',
  [ClusterCreationStep.DETAILS]: 'Edit',
};

interface CreateClusterFlowProps {
  cluster?: Cluster | DraftCluster;
  managementCluster?: ManagementCluster;
  onClusterDelete: () => void;
  onClusterEdit: () => void;
  onMenuClose: () => void;
  onSubmit: () => void;
  clusterCreationStep: ClusterCreationStep;
  defaultValues?: NewWorkloadClusterConfig;
  loading: boolean;
  notifiedOfBetaPhysicalClusters: boolean;
  onNotificationClose: () => void;
  environments: EnvMap;
}

export const CreateClusterFlow: FunctionComponent<CreateClusterFlowProps> = ({
  cluster,
  onClusterDelete,
  onClusterEdit,
  onMenuClose,
  onSubmit,
  clusterCreationStep,
  defaultValues,
  managementCluster,
  loading,
  notifiedOfBetaPhysicalClusters,
  onNotificationClose,
  environments,
}) => {
  const { isOpen, close, toggle } = useToggle();

  const methods = useForm<NewWorkloadClusterConfig>({
    defaultValues,
    mode: 'onChange',
  });

  const {
    formState: { isValid },
  } = methods;

  const handleClick = useCallback(() => {
    if (clusterCreationStep === ClusterCreationStep.DETAILS) {
      onClusterEdit();
    }
  }, [onClusterEdit, clusterCreationStep]);

  const submitButtonDisabled =
    !isValid || loading || cluster?.status === ClusterStatus.PROVISIONING;

  const showingClusterDetails = clusterCreationStep === ClusterCreationStep.DETAILS;

  const showHeadsUpNotification =
    !notifiedOfBetaPhysicalClusters && clusterCreationStep === ClusterCreationStep.CONFIG;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <MenuHeader>
          <CloseButton onClick={onMenuClose} type="button">
            <CloseIcon htmlColor={SALTBOX_BLUE} />
          </CloseButton>
          <Row style={{ gap: '16px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              disabled={submitButtonDisabled}
              type="submit"
              data-test-id="workload-cluster-create-details"
            >
              {loading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
              {actionButtonText[clusterCreationStep]}
            </Button>
            {showingClusterDetails && (
              <Row>
                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  data-test-id="workload-cluster-edit"
                  onClick={toggle}
                >
                  <MoreHoriz />
                </Button>
                {isOpen && (
                  <ClickAwayListener onClickAway={close}>
                    <Menu>
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton onClick={onClusterDelete}>
                            <Typography variant="body2" style={{ color: `${FIRE_BRICK}` }}>
                              Delete cluster
                            </Typography>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Menu>
                  </ClickAwayListener>
                )}
              </Row>
            )}
          </Row>
        </MenuHeader>
        <FormContent>
          {showHeadsUpNotification && <HeadsUpNotification onClose={onNotificationClose} />}
          {clusterCreationStep === ClusterCreationStep.CONFIG && (
            <ClusterCreationForm style={{ flex: 1, margin: '32px 0' }} />
          )}
          {clusterCreationStep === ClusterCreationStep.DETAILS && cluster && (
            <ClusterDetails
              cluster={cluster}
              host={managementCluster?.gitHost as string}
              gitOwner={managementCluster?.gitAuth.gitOwner}
              environments={environments}
              style={{ marginTop: '24px' }}
            />
          )}
        </FormContent>
      </Form>
    </FormProvider>
  );
};
