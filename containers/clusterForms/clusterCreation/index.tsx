import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';

import { usePhysicalClustersPermissions } from '../../../hooks/usePhysicalClustersPermission';

import { Container } from './clusterCreation.styled';
import { InputContainer } from './advancedOptions/advancedOptions.styled';

import ControlledAutocomplete from '@/components/controlledFields/AutoComplete';
import ControlledTextField from '@/components/controlledFields/TextField';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import Typography from '@/components/typography';
import {
  ClusterType,
  NewWorkloadClusterConfig,
  ClusterEnvironment,
  ManagementCluster,
} from '@/types/provision';
import { EXCLUSIVE_PLUM } from '@/constants/colors';
import ControlledNumberInput from '@/components/controlledFields/numberInput';
import ControlledRadioGroup from '@/components/controlledFields/radio';
import { LOWER_KEBAB_CASE_REGEX, MIN_NODE_COUNT, WORKLOAD_CLUSTER_OPTIONS } from '@/constants';
import { updateDraftCluster } from '@/redux/slices/api.slice';
import ControlledEnvironmentSelect from '@/components/controlledFields/environmentSelect';
import Modal from '@/components/modal';
import useModal from '@/hooks/useModal';
import { EnvironmentMenu } from '@/components/environmentMenu';
import LearnMore from '@/components/learnMore';
import { createEnvironment } from '@/redux/thunks/environments.thunk';
import { noop } from '@/utils/noop';
import { clearEnvironmentError } from '@/redux/slices/environments.slice';
import { InstallationType } from '@/types/redux';
import {
  getCloudDomains,
  getCloudRegions,
  getInstanceSizes,
  getRegionZones,
} from '@/redux/thunks/api.thunk';

const ClusterCreationForm: FunctionComponent<Omit<ComponentPropsWithoutRef<'div'>, 'key'>> = (
  props,
) => {
  const { isOpen, openModal, closeModal } = useModal(false);

  const {
    managementCluster,
    cloudRegions,
    cloudZones,
    clusterNameCache,
    clusterMap,
    environments,
    instanceSizes,
    error,
  } = useAppSelector(({ api, environments }) => ({ ...api, ...environments }));

  const dispatch = useAppDispatch();

  const {
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<NewWorkloadClusterConfig>();

  const { type, nodeCount, instanceSize, cloudRegion } = getValues();

  const handleAddEnvironment = useCallback(
    (environment: ClusterEnvironment) => {
      setValue('environment', environment);
      dispatch(createEnvironment(environment))
        .unwrap()
        .then(() => {
          closeModal();
        })
        .catch(noop);
    },
    [dispatch, setValue, closeModal],
  );

  const clearEnvError = useCallback(() => {
    dispatch(clearEnvironmentError());
  }, [dispatch]);

  const handleModalClose = useCallback(() => {
    clearEnvError();
    closeModal();
  }, [clearEnvError, closeModal]);

  const handleRegionOnSelect = useCallback(
    (region: string) => {
      // if using google hold off on grabbing instances
      // since it requires the zone as well
      if (managementCluster) {
        const { key, value } = getCloudProviderAuth(managementCluster);
        if (managementCluster?.cloudProvider === InstallationType.GOOGLE) {
          dispatch(
            getRegionZones({
              region,
              values: { [`${key}_auth`]: value },
            }),
          );
        } else {
          dispatch(
            getInstanceSizes({
              installType: managementCluster?.cloudProvider,
              region,
              values: { [`${key}_auth`]: value },
            }),
          );
          dispatch(
            getCloudDomains({
              installType: managementCluster?.cloudProvider,
              region,
            }),
          );
        }
      }
    },
    [dispatch, managementCluster],
  );

  const handleZoneSelect = (zone: string) => {
    const { cloudRegion } = getValues();
    if (managementCluster && cloudRegion) {
      const { key, value } = getCloudProviderAuth(managementCluster);
      dispatch(
        getInstanceSizes({
          installType: managementCluster?.cloudProvider,
          region: cloudRegion,
          zone,
          values: { [`${key}_auth`]: value },
        }),
      );
    }
  };

  const { hasPermissions } = usePhysicalClustersPermissions(managementCluster?.cloudProvider);

  const draftCluster = useMemo(() => clusterMap['draft'], [clusterMap]);

  const isVCluster = useMemo(() => type === ClusterType.WORKLOAD_V_CLUSTER, [type]);

  const clusterOptions = useMemo(() => {
    if (hasPermissions) {
      return WORKLOAD_CLUSTER_OPTIONS;
    }
    return WORKLOAD_CLUSTER_OPTIONS.filter((option) => option.value !== ClusterType.WORKLOAD);
  }, [hasPermissions]);

  useEffect(() => {
    const subscription = watch((values) => {
      if (draftCluster) {
        dispatch(updateDraftCluster({ ...draftCluster, ...values }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, dispatch, draftCluster]);

  useEffect(() => {
    if (managementCluster) {
      dispatch(
        getCloudRegions({
          values: managementCluster,
          installType: managementCluster.cloudProvider,
        }),
      );
    }
  }, [dispatch, managementCluster]);

  useEffect(() => {
    if (cloudRegion) {
      handleRegionOnSelect(cloudRegion);
    }
  }, [cloudRegion, handleRegionOnSelect]);

  function getCloudProviderAuth(managamentCluster: ManagementCluster): {
    key?: string;
    value?: unknown;
  } {
    const installType = managamentCluster.cloudProvider;
    const key = installType === InstallationType.DIGITAL_OCEAN ? 'do' : installType;
    return { key, value: key ? managamentCluster[`${key}_auth`] : undefined };
  }

  return (
    <Container {...props}>
      <InputContainer>
        <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
          Cluster type
        </Typography>
        <ControlledRadioGroup
          control={control}
          name="type"
          rules={{
            required: false,
          }}
          options={clusterOptions}
          defaultValue={type}
          onChange={(clusterType) =>
            setValue('type', clusterType as ClusterType, { shouldValidate: true })
          }
        />
        <LearnMore
          href="https://docs.kubefirst.io/civo/quick-start/cluster-management "
          description="A partitioned space in your management cluster."
          linkTitle="Learn More"
          withoutDivider
        />
      </InputContainer>
      <>
        <ControlledEnvironmentSelect
          control={control}
          name="environment"
          label="Environment cluster will host"
          onErrorText={errors.environment?.message}
          options={Object.values(environments)}
          onAddNewEnvironment={openModal}
        />
        <Modal
          padding={0}
          isOpen={isOpen}
          styleOverrides={{ width: '100%', maxWidth: '630px' }}
          onCloseModal={handleModalClose}
        >
          <EnvironmentMenu
            onSubmit={handleAddEnvironment}
            onClose={closeModal}
            previouslyCreatedEnvironments={environments}
            errorMessage={error}
            onErrorClose={clearEnvError}
          />
        </Modal>
      </>
      <ControlledTextField
        control={control}
        name="clusterName"
        defaultValue={draftCluster?.clusterName}
        label="Cluster name"
        rules={{
          maxLength: 25,
          required: 'Cluster name is required',
          pattern: {
            value: LOWER_KEBAB_CASE_REGEX,
            message:
              'Name must only contain lowercase alphanumeric characters and dashes, and begin and end with a lowercase alphanumeric character.',
          },
          validate: {
            previouslyUsedClusterNames: (value) =>
              (typeof value === 'string' && !clusterNameCache[value]) ||
              'Please use a unique name that has not been previously provisioned',
          },
        }}
        onErrorText={errors.clusterName?.message}
        required
      />
      {!isVCluster && (
        <>
          <ControlledAutocomplete
            control={control}
            name="cloudRegion"
            label="Cloud region"
            defaultValue={draftCluster?.cloudRegion}
            required
            rules={{ required: true }}
            options={
              cloudRegions && cloudRegions.map((region) => ({ label: region, value: region }))
            }
            onChange={handleRegionOnSelect}
          />
          {managementCluster?.cloudProvider === InstallationType.GOOGLE && (
            <ControlledAutocomplete
              control={control}
              name="cloudZone"
              label="Cloud zone"
              required
              rules={{ required: true }}
              options={cloudZones.map((zone) => ({
                label: zone,
                value: zone,
              }))}
              onChange={handleZoneSelect}
            />
          )}

          <ControlledAutocomplete
            control={control}
            name="instanceSize"
            label="Instance size"
            required
            rules={{ required: true }}
            options={instanceSizes.map((instanceSize) => ({
              label: instanceSize,
              value: instanceSize,
            }))}
            defaultValue={instanceSize}
          />
          <Box sx={{ width: 136 }}>
            <ControlledNumberInput
              label="Number of nodes"
              control={control}
              name="nodeCount"
              numberInputProps={{
                min: MIN_NODE_COUNT,
                defaultValue: nodeCount,
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default ClusterCreationForm;
