import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import { usePhysicalClustersPermissions } from '../../../hooks/usePhysicalClustersPermission';

import { Container } from './ClusterCreationForm.styled';
import { InputContainer } from './advancedOptions/advancedOptions.styled';

import ControlledAutocomplete from '@/components/controlledFields/ControlledAutocomplete/ControlledAutocomplete';
import ControlledTextField from '@/components/controlledFields/ControlledTextField/ControlledTextField';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import Typography from '@/components/Typography/Typography';
import { ClusterType, NewWorkloadClusterConfig, ClusterEnvironment } from '@/types/provision';
import { ASMANI_SKY, BISCAY, EXCLUSIVE_PLUM } from '@/constants/colors';
import ControlledNumberInput from '@/components/controlledFields/ControlledNumberInput/ControlledNumberInput';
import ControlledRadioGroup from '@/components/controlledFields/ControlledRadioGroup/ControlledRadioGroup';
import {
  LOWER_KEBAB_CASE_REGEX,
  MIN_NODE_COUNT,
  RESERVED_DRAFT_CLUSTER_NAME,
  WORKLOAD_CLUSTER_OPTIONS,
} from '@/constants';
import { updateDraftCluster } from '@/redux/slices/api.slice';
import Modal from '@/components/Modal/Modal';
import useModal from '@/hooks/useModal';
import { CreateEnvironmentMenu } from '@/components/CreateEnvironmentMenu/CreateEnvironmentMenu';
import { createEnvironment, getAllEnvironments } from '@/redux/thunks/environments.thunk';
import { noop } from '@/utils/noop';
import { clearEnvironmentError } from '@/redux/slices/environments.slice';
import { InstallationType } from '@/types/redux';
import {
  getCloudDomains,
  getCloudRegions,
  getInstanceSizes,
  getRegionZones,
} from '@/redux/thunks/api.thunk';
import ControlledTagsAutocomplete from '@/components/controlledFields/ControlledAutocomplete/ControlledTagsAutoComplete';
import {
  selectHasLicenseKey,
  selectIsLicenseActive,
} from '@/redux/selectors/subscription.selector';
import Tag from '@/components/Tag/Tag';
import { getCloudProviderAuth } from '@/utils/getCloudProviderAuth';
import { FeatureFlag } from '@/types/config';
import useFeatureFlag from '@/hooks/useFeatureFlag';

const ClusterCreationForm: FunctionComponent<Omit<ComponentPropsWithoutRef<'div'>, 'key'>> = (
  props,
) => {
  const { isOpen, openModal, closeModal } = useModal(false);

  const {
    managementCluster,
    cloudRegions,
    cloudZones,
    clusterMap,
    environments,
    instanceSizes,
    error,
  } = useAppSelector(({ api, environments }) => ({ ...api, ...environments }));
  const hasLicenseKey = useAppSelector(selectHasLicenseKey());
  const isLicenseActive = useAppSelector(selectIsLicenseActive());
  const { isEnabled: isSubscriptionEnabled } = useFeatureFlag(FeatureFlag.SAAS_SUBSCRIPTION);

  const dispatch = useAppDispatch();

  const {
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<NewWorkloadClusterConfig>();

  const { type, nodeCount, instanceSize, cloudRegion, clusterName } = getValues();

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

  const handleEnvChange = useCallback(
    (env?: ClusterEnvironment) => {
      setValue('environment', env);
    },
    [setValue],
  );

  const handleTagDelete = useCallback(() => {
    setValue('environment', undefined);
  }, [setValue]);

  const { hasPermissions } = usePhysicalClustersPermissions(managementCluster?.cloudProvider);

  const draftCluster = useMemo(() => clusterMap[RESERVED_DRAFT_CLUSTER_NAME], [clusterMap]);

  const isVCluster = useMemo(() => type === ClusterType.WORKLOAD_V_CLUSTER, [type]);

  const handleRedirect = () => {
    return window.open(`${location.origin}/settings/subscription/plans`, '_blank');
  };

  const clusterOptions = useMemo(() => {
    let clusterTypes;
    if (hasPermissions) {
      clusterTypes = WORKLOAD_CLUSTER_OPTIONS;
    } else {
      clusterTypes = WORKLOAD_CLUSTER_OPTIONS.filter(
        (option) => option.value !== ClusterType.WORKLOAD,
      );
    }

    if (!isSubscriptionEnabled) {
      return clusterTypes;
    }

    return hasLicenseKey && isLicenseActive
      ? clusterTypes
      : clusterTypes.map((option) => {
          if (option.value === ClusterType.WORKLOAD) {
            return {
              ...option,
              isDisabled: true,
              tag: (
                <Tag
                  onClick={handleRedirect}
                  text="Upgrade to use this feature"
                  bgColor="mistery"
                  iconComponent={<StarBorderOutlinedIcon htmlColor={ASMANI_SKY} fontSize="small" />}
                />
              ),
            };
          }

          return option;
        });
  }, [hasLicenseKey, hasPermissions, isLicenseActive, isSubscriptionEnabled]);

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
      dispatch(getAllEnvironments());
    }
    // i do not want to get cloud regions every time management cluster updates
    // initial load and hard refresh is sufficient.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (cloudRegion && managementCluster) {
      const { key, value } = getCloudProviderAuth(managementCluster);
      dispatch(
        getInstanceSizes({
          installType: managementCluster?.cloudProvider,
          region: cloudRegion,
          values: { [`${key}_auth`]: value },
        }),
      );
    }
    // i do not want to get instance sizes every time management cluster updates
    // initial load/hard refresh/cloudRegion update is sufficient.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloudRegion]);

  return (
    <Container {...props}>
      <Typography variant="subtitle1" color={BISCAY}>
        Create workload cluster
      </Typography>
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
          onChange={(clusterType) => setValue('type', clusterType as ClusterType)}
        />
      </InputContainer>
      <>
        <ControlledTagsAutocomplete
          createEnvironment
          control={control}
          name="environment"
          label="Environment cluster will host"
          options={Object.values(environments)}
          onChange={handleEnvChange}
          onTagDelete={handleTagDelete}
          onAddNewEnvironment={openModal}
        />
        <Modal
          padding={0}
          isOpen={isOpen}
          styleOverrides={{ width: '100%', maxWidth: '630px' }}
          onCloseModal={handleModalClose}
        >
          <CreateEnvironmentMenu
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
        defaultValue={clusterName}
        label="Cluster name"
        required
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
              (typeof value === 'string' && !clusterMap[value]) ||
              'Please use a unique name that has not been previously provisioned',
            reservedClusterName: (value) =>
              (typeof value === 'string' && value !== RESERVED_DRAFT_CLUSTER_NAME) ||
              'Please use a cluster name that is not reserved',
          },
        }}
        onErrorText={errors.clusterName?.message}
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
