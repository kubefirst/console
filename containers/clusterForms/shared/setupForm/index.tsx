'use client';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { capitalize } from 'lodash';

import { setInstallationStep } from '@/redux/slices/installation.slice';
import { clearDomains } from '@/redux/slices/api.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import ControlledPassword from '@/components/controlledFields/ControlledPassword';
import {
  getCloudDomains,
  getCloudRegions,
  getInstanceSizes,
  getRegionZones,
} from '@/redux/thunks/api.thunk';
import ControlledTextField from '@/components/controlledFields/ControlledTextField/ControlledTextField';
import ControlledAutocomplete from '@/components/controlledFields/ControlledAutocomplete/ControlledAutocomplete';
import Column from '@/components/Column/Column';
import Typography from '@/components/Typography/Typography';
import ControlledCheckbox from '@/components/controlledFields/ControlledCheckbox/ControlledCheckbox';
import {
  EMAIL_REGEX,
  LOWER_KEBAB_CASE_REGEX,
  MIN_NODE_COUNT,
  FIRST_CHAR_ALPHABETICAL,
} from '@/constants';
import { InstallValues, InstallationType } from '@/types/redux';
import { EXCLUSIVE_PLUM } from '@/constants/colors';
import { BISCAY } from '@/constants/colors';
import ControlledNumberInput from '@/components/controlledFields/ControlledNumberInput/ControlledNumberInput';

const CLOUD_REGION_LABELS: Record<InstallationType, string | null> = {
  [InstallationType.AWS]: 'Cloud region',
  [InstallationType.CIVO]: 'Cloud region',
  [InstallationType.DIGITAL_OCEAN]: 'Datacenter region',
  [InstallationType.VULTR]: 'Cloud location',
  [InstallationType.LOCAL]: null,
  [InstallationType.GOOGLE]: 'Cloud region',
};

const SetupForm: FunctionComponent = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const dispatch = useAppDispatch();

  const {
    cloudDomains,
    cloudRegions,
    cloudZones,
    instanceSizes,
    installationStep,
    installType,
    values,
    clusterMap,
    showCloudflareCaIssuerField,
  } = useAppSelector(({ api, installation, featureFlags }) => ({
    ...api,
    ...installation,
    showCloudflareCaIssuerField: featureFlags.flags.showCloudflareCaIssuerField,
  }));

  const {
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors },
    watch,
  } = useFormContext<InstallValues>();

  const [domainName, subDomain, dnsProvider, cloudRegion, cloudflareToken, cloudZone] = watch([
    'domainName',
    'subDomain',
    'dnsProvider',
    'cloudRegion',
    'cloudflareToken',
    'cloudZone',
  ]);

  const { instanceSize, nodeCount } = getValues();

  const subDomainHelperText = !subDomain ? '' : `${subDomain}.${domainName}`;
  const isCloudflareSelected = useMemo(() => dnsProvider === 'cloudflare', [dnsProvider]);

  const cloudRegionLabel = useMemo(
    () =>
      CLOUD_REGION_LABELS[installType as InstallationType] ||
      (CLOUD_REGION_LABELS[InstallationType.AWS] as string),
    [installType],
  );

  const checkAuth = useCallback(() => {
    if (!values?.gitToken) {
      dispatch(setInstallationStep(installationStep - 1));
    }
  }, [dispatch, installationStep, values?.gitToken]);

  const handleRegionChange = useCallback(
    (region: string) => {
      setSelectedRegion(region);
      // if using google hold off on grabbing instances
      // since it requires the zone as well

      if (installType === InstallationType.GOOGLE) {
        dispatch(
          getRegionZones({
            region,
            values,
          }),
        );
      } else {
        dispatch(getInstanceSizes({ installType, region, values }));
      }
    },
    [dispatch, installType, values],
  );

  const handleZoneSelect = useCallback(
    (zone: string) => {
      if (cloudRegion) {
        dispatch(getInstanceSizes({ installType, region: cloudRegion, zone, values }));
      }
    },
    [dispatch, installType, cloudRegion, values],
  );

  const formatDomains = (domains: Array<string>) => {
    return domains.map((domain) => {
      const formattedDomain =
        installType === InstallationType.AWS && domain[domain.length - 1].includes('.')
          ? domain.substring(0, domain.length - 1)
          : domain;
      return { label: formattedDomain, value: formattedDomain };
    });
  };

  const handleCloudfareToken = useCallback(
    (cloudflareToken: string) => {
      dispatch(getCloudDomains({ region: selectedRegion, cloudflareToken, values }));
    },
    [dispatch, selectedRegion, values],
  );

  const handleDnsProviderChange = useCallback(
    (dnsProvider: string) => {
      if (dnsProvider === 'cloudflare') {
        if (cloudflareToken) {
          handleCloudfareToken(cloudflareToken);
        } else {
          dispatch(clearDomains());
          setValue('domainName', '');
        }
      } else if (cloudRegion) {
        dispatch(getCloudDomains({ region: cloudRegion, installType, values }));
        setValue('cloudflareToken', '');
        setValue('domainName', '');
      }
    },
    [dispatch, installType, values, cloudflareToken, handleCloudfareToken, cloudRegion, setValue],
  );

  useEffect(() => {
    if (cloudRegion) {
      handleRegionChange(cloudRegion);
    }
  }, [cloudRegion, handleRegionChange]);

  useEffect(() => {
    if (cloudZone) {
      handleZoneSelect(cloudZone);
    }
  }, [cloudZone, handleZoneSelect]);

  useEffect(() => {
    checkAuth();
    if (installType && values) {
      dispatch(getCloudRegions({ installType, values }));
    }
  }, [checkAuth, dispatch, installType, values, trigger]);

  return (
    <>
      <Typography variant="subtitle2" color={BISCAY}>
        General Settings
      </Typography>
      <ControlledTextField
        control={control}
        name="alertsEmail"
        label="Alerts email"
        onErrorText="Invalid email address."
        defaultValue={values?.alertsEmail}
        required
        rules={{
          required: true,
          pattern: EMAIL_REGEX,
        }}
        helperText="This email address will receive important system notifications such cert expiry notices."
      />
      <ControlledAutocomplete
        control={control}
        name="cloudRegion"
        label={cloudRegionLabel}
        defaultValue={values?.cloudRegion}
        required
        rules={{ required: true }}
        options={cloudRegions && cloudRegions.map((region) => ({ label: region, value: region }))}
      />
      {installType === InstallationType.GOOGLE && (
        <ControlledAutocomplete
          control={control}
          name="cloudZone"
          label="Cloud zone"
          defaultValue={values?.cloudZone}
          required
          rules={{ required: true }}
          options={cloudZones.map((zone) => ({
            label: zone,
            value: zone,
          }))}
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
          numberInputProps={{ min: MIN_NODE_COUNT, defaultValue: nodeCount }}
        />
      </Box>
      <ControlledAutocomplete
        control={control}
        name="dnsProvider"
        label="Dns provider"
        defaultValue={values?.dnsProvider}
        required
        rules={{ required: true }}
        options={[
          { label: capitalize(installType as string), value: installType as string },
          { label: 'Cloudflare', value: 'cloudflare' },
        ]}
        onChange={handleDnsProviderChange}
      />
      {isCloudflareSelected && (
        <>
          <ControlledPassword
            control={control}
            name="cloudflareToken"
            label="Cloudflare token"
            required
            rules={{
              required: true,
            }}
            onErrorText="Invalid token."
            onChange={handleCloudfareToken}
          />
          {showCloudflareCaIssuerField && (
            <ControlledPassword
              control={control}
              name="cloudflareOriginCaIssuerKey"
              label="Cloudflare origin ca issuer key"
              rules={{
                required: false,
              }}
              onErrorText="Invalid issuer key"
            />
          )}
        </>
      )}
      <ControlledAutocomplete
        control={control}
        name="domainName"
        label="Cluster domain name"
        defaultValue={values?.domainName}
        required
        rules={{ required: true }}
        options={cloudDomains && formatDomains(cloudDomains)}
      />
      {isCloudflareSelected && (
        <ControlledTextField
          control={control}
          name="subDomain"
          label="Subdomain name"
          defaultValue={values?.subDomain}
          rules={{
            maxLength: 25,
          }}
          onErrorText={errors.subDomain?.message}
          helperText={subDomainHelperText}
        />
      )}
      <ControlledTextField
        control={control}
        name="clusterName"
        label="Cluster name"
        defaultValue={values?.clusterName}
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
            civoClusterName: (value) => {
              if (installType === InstallationType.CIVO) {
                return (
                  (typeof value === 'string' && FIRST_CHAR_ALPHABETICAL.test(value)) ||
                  'Name must not begin with a numerical character'
                );
              }
              return true;
            },
          },
        }}
        onErrorText={errors.clusterName?.message}
      />
      {installType === InstallationType.GOOGLE && (
        <CheckBoxContainer>
          <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
            Automatically remove cloud provider resources such as buckets or kms keys when a worker
            cluster is deleted
          </Typography>
          <ControlledCheckbox
            control={control}
            name="forceDestroyTerraform"
            label="Enable Force Destroy on Terraform resources"
            rules={{ required: false }}
            defaultValue={true}
            data-test-id="forceDestroyTerraform"
          />
        </CheckBoxContainer>
      )}
    </>
  );
};

export default SetupForm;

const CheckBoxContainer = styled(Column)`
  gap: 9px;

  label {
    margin-left: 8px;
  }
`;
