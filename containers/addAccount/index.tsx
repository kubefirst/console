'use client';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormControlLabel } from '@mui/material';
import { useRouter } from 'next/navigation';

import {
  ButtonsContainer,
  Container,
  FormContainer,
  FormFooter,
  Header,
  InfoCard,
} from './addAccount.styled';

import Typography from '@/components/typography';
import { VOLCANIC_SAND } from '@/constants/colors';
import LearnMore from '@/components/learnMore';
import { CloudAccount } from '@/types/cloudAccount';
import ControlledAutocomplete from '@/components/controlledFields/autoComplete/AutoComplete';
import { PROVIDER_OPTIONS } from '@/components/cloudProviderCard';
import { InstallationType } from '@/types/redux';
import {
  FormStep,
  INFO_INSTALLATION_TYPES,
  INSTALLATION_TYPE_API_KEYS,
} from '@/constants/installation';
import InstallationInfoCard from '@/components/installationInfoCard';
import ControlledPassword from '@/components/controlledFields/Password';
import ControlledTextArea from '@/components/controlledFields/textArea';
import Column from '@/components/column';
import CheckBoxWithRef from '@/components/checkbox';
import ControlledTextField from '@/components/controlledFields/TextField';
import Button from '@/components/button';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  createCloudAccounts,
  createSecret,
  getCloudAccounts,
  updateCloudAccounts,
  updateSecret,
} from '@/redux/thunks/cluster.thunk';

const AddAccount: FunctionComponent = () => {
  const [selectedCloud, setSelectedCloud] = useState<InstallationType>();
  const [showGoogleKeyFile, setShowGoogleKeyFile] = useState(false);

  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const { cloudAccounts, managementCluster } = useAppSelector(({ api, cluster }) => ({
    cloudAccounts: cluster.cloudAccounts,
    managementCluster: api.managementCluster,
  }));

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    ...rest
  } = useForm<CloudAccount>({ mode: 'onBlur' });

  const info = useMemo(
    () => selectedCloud && INFO_INSTALLATION_TYPES[selectedCloud][FormStep.AUTHENTICATION],
    [selectedCloud],
  );

  const authKeys = useMemo(
    () => selectedCloud && INSTALLATION_TYPE_API_KEYS[selectedCloud],
    [selectedCloud],
  );

  const handleOnSubmit = async (account: CloudAccount) => {
    const clonedCloudAccounts = Object.assign([], cloudAccounts);
    const cloudAccountToSave = {
      id: new Date().getTime(),
      name: account.name,
      isEnabled: !!account.isEnabled,
      type: account.type,
    };

    const updateOrCreateCloudsThunk =
      clonedCloudAccounts.length > 0 ? updateCloudAccounts : createCloudAccounts;

    //ToDo: Validate against existing id and existing account
    const updateOrCreateSecretThunk = createSecret;

    // Find existing cloud account
    const existingAccountIndex = clonedCloudAccounts.findIndex(({ name }) => name === account.name);

    if (existingAccountIndex !== -1) {
      clonedCloudAccounts[existingAccountIndex] = cloudAccountToSave as never;
    } else {
      clonedCloudAccounts.push(cloudAccountToSave);
    }

    await dispatch(
      updateOrCreateCloudsThunk({
        clusterName: managementCluster?.clusterName as string,
        cloudAccounts: clonedCloudAccounts,
      }),
    );

    await dispatch(
      updateOrCreateSecretThunk({
        clusterName: managementCluster?.clusterName as string,
        cloudAccount: account,
      }),
    ).then(() => {
      dispatch(getCloudAccounts(managementCluster?.clusterName as string));
      push('/settings/accounts');
    });
  };

  const handleCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShowGoogleKeyFile(e.target.checked);
  }, []);

  const cloudProviders = useMemo(() => {
    return Object.keys(PROVIDER_OPTIONS)
      .filter((cloudKey) => cloudKey !== InstallationType.LOCAL)
      .map((cloudKey) => {
        const cloud = PROVIDER_OPTIONS[cloudKey as InstallationType];
        return {
          label: cloud?.label as string,
          value: cloudKey,
          icon: cloud?.logoSrc as string,
        };
      });
  }, []);

  useEffect(() => {
    const subscription = watch(({ type }) => {
      setSelectedCloud(type);
    });

    if (managementCluster?.clusterName) {
      dispatch(getCloudAccounts(managementCluster?.clusterName));
    }

    return () => subscription.unsubscribe();
  }, [dispatch, managementCluster?.clusterName, watch]);

  return (
    <Container {...rest} onSubmit={handleSubmit(handleOnSubmit)}>
      <Header>
        <Typography variant="h6" color={VOLCANIC_SAND} sx={{ mb: 1 }}>
          Cloud accounts
        </Typography>
        <LearnMore
          description={
            <Typography variant="body2" color={VOLCANIC_SAND}>
              Add and manage the cloud accounts that host your clusters.
            </Typography>
          }
          linkTitle="Learn more"
          href="https://docs.kubefirst.io/civo/quick-start/cluster-management"
        />
      </Header>
      <FormContainer>
        <ControlledAutocomplete
          control={control}
          label="Select cloud provider"
          name="type"
          required
          rules={{
            required: true,
          }}
          options={cloudProviders}
        />

        {selectedCloud && info && (
          <InfoCard>
            <InstallationInfoCard
              info={info}
              isMarketplace={false}
              installationType={selectedCloud}
              hideCta
            />
          </InfoCard>
        )}

        <ControlledTextField
          control={control}
          name="name"
          label="Name"
          rules={{ required: 'Name is required' }}
          required
          helperText="A short descriptive identifier for this account"
          onErrorText={errors?.name?.message}
        />

        {selectedCloud === InstallationType.GOOGLE && (
          <>
            <Column style={{ gap: '10px' }}>
              <ControlledTextArea
                control={control}
                name="auth.google.key_file"
                label="Google Cloud key file"
                rules={{ required: 'key file is required' }}
                required
                minRows={14}
                onErrorText={errors.auth?.google?.key_file?.message}
                textAreaStyleOverrides={{ maxHeight: '266px' }}
                hideValue={!showGoogleKeyFile}
              />

              <FormControlLabel
                data-test-id="showGoogleKeyFile"
                control={<CheckBoxWithRef checked={showGoogleKeyFile} onChange={handleCheckbox} />}
                label={
                  <Typography variant="body2" sx={{ ml: '8px' }} color={VOLCANIC_SAND}>
                    Show key file
                  </Typography>
                }
                sx={{ ml: '16px' }}
              />
            </Column>

            <ControlledTextField
              control={control}
              name="auth.google.project_id"
              label="Project ID"
              rules={{ required: 'project id is required' }}
              required
              helperText="Retrieve the Project ID from the project Dashboard “Project info” card"
              onErrorText={errors?.auth?.google?.project_id?.message}
            />
          </>
        )}
        {authKeys?.fieldKeys &&
          authKeys?.fieldKeys.map(({ label, name, helperText }) => (
            <ControlledPassword
              key={name}
              control={control}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              name={`auth.${selectedCloud}.${name}`}
              label={label}
              helperText={helperText}
              required
              rules={{
                required: true,
              }}
            />
          ))}
      </FormContainer>
      <FormFooter>
        <LearnMore
          description="Learn more about "
          linkTitle="cloud accounts"
          href="https://docs.kubefirst.io/civo/quick-start/cluster-management"
        />
        <ButtonsContainer>
          <Button variant="text" color="text">
            Cancel
          </Button>

          <Button variant="contained" color="primary" type="submit" disabled={!isValid}>
            Add cloud account
          </Button>
        </ButtonsContainer>
      </FormFooter>
    </Container>
  );
};

export default AddAccount;
