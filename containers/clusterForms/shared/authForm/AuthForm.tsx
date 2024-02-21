import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormControlLabel from '@mui/material/FormControlLabel';

import {
  FormContainer,
  GitContainer,
  GitFieldsContainer,
  GitUserField,
  GitUserFieldInput,
} from './AuthForm.styled';

import { Required } from '@/components/TextField/TextField.styled';
import GitProviderButton from '@/components/GitProviderButton/GitProviderButton';
import Typography from '@/components/Typography/Typography';
import { useInstallation } from '@/hooks/useInstallation';
import ControlledPassword from '@/components/controlledFields/ControlledPassword';
import ControlledAutocomplete from '@/components/controlledFields/ControlledAutocomplete/ControlledAutocomplete';
import ControlledTextArea from '@/components/controlledFields/ControlledTextArea/ControlledTextArea';
import ControlledTextField from '@/components/controlledFields/ControlledTextField/ControlledTextField';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { GIT_PROVIDERS, GitProvider } from '@/types';
import { InstallValues, InstallationType } from '@/types/redux/index';
import { FormStep } from '@/constants/installation';
import { EXCLUSIVE_PLUM, VOLCANIC_SAND } from '@/constants/colors';
import {
  getGitHubOrgRepositories,
  getGitHubOrgTeams,
  getGitLabProjects,
  getGitLabSubgroups,
  getGithubUser,
  getGithubUserOrganizations,
  getGitlabGroups,
  getGitlabUser,
} from '@/redux/thunks/git.thunk';
import { clearUserError, clearGitState, setIsGitSelected } from '@/redux/slices/git.slice';
import { setGitProvider } from '@/redux/slices/installation.slice';
import Tooltip from '@/components/Tooltip/Tooltip';
import Row from '@/components/Row/Row';
import CheckBoxWithRef from '@/components/Checkbox/Checkbox';
import Column from '@/components/Column/Column';
import { hasProjectId } from '@/utils/hasProjectId';
import { getDigitalOceanUser } from '@/redux/thunks/digitalOcean.thunk';
import { GIT_PROVIDER_DISPLAY_NAME } from '@/constants';
import { useDebouncedPromise } from '@/hooks/useDebouncedPromise';

const AuthForm: FunctionComponent = () => {
  const [showGoogleKeyFile, setShowGoogleKeyFile] = useState(false);

  const dispatch = useAppDispatch();

  const {
    gitProvider,
    githubUser,
    githubUserOrganizations,
    gitlabUser,
    gitlabGroups,
    gitStateLoading,
    installationType,
    isGitSelected,
    installMethod,
    token = '',
  } = useAppSelector(({ config, installation, git, digitalOcean }) => ({
    currentStep: installation.installationStep,
    installationType: installation.installType,
    gitProvider: installation.gitProvider,
    isGitSelected: git.isGitSelected,
    gitStateLoading: git.isLoading,
    installMethod: config.installMethod,
    ...git,
    ...digitalOcean,
  }));

  const { apiKeyInfo } = useInstallation(
    installationType as InstallationType,
    gitProvider as GitProvider,
    FormStep.AUTHENTICATION,
  );

  const {
    control,
    reset,
    resetField,
    watch,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
  } = useFormContext<InstallValues>();

  const [googleKeyFile] = watch(['google_auth.key_file']);

  const isGitHub = useMemo(() => gitProvider === GitProvider.GITHUB, [gitProvider]);

  const validateGitOwner = useCallback(
    async (gitOwner: string) => {
      if (gitOwner) {
        if (isGitHub) {
          await dispatch(getGitHubOrgRepositories({ token, organization: gitOwner })).unwrap();
          await dispatch(getGitHubOrgTeams({ token, organization: gitOwner }));
        } else {
          await dispatch(getGitLabProjects({ token, group: gitOwner })).unwrap();
          await dispatch(getGitLabSubgroups({ token, group: gitOwner }));
        }
      }
    },
    [isGitHub, dispatch, token],
  );

  const handleGitToken = useCallback(
    async (token: string) => {
      if (token) {
        try {
          if (isGitHub) {
            // only care about return of getGithubUser as if it fails will exit and not run getGithubUserOrganizations
            await dispatch(getGithubUser(token)).unwrap();
            await dispatch(getGithubUserOrganizations(token));
          } else {
            // only care about return of getGitlabUser as if it fails will exit and not run getGitlabGroups
            await dispatch(getGitlabUser(token)).unwrap();
            await dispatch(getGitlabGroups(token));
          }
          clearErrors('gitToken');
          resetField('gitOwner');
        } catch (error) {
          setError('gitToken', { type: 'validate', message: 'Please enter a valid token.' });
        }
      }
    },
    [isGitHub, dispatch, setError, clearErrors, resetField],
  );

  const handleGitProviderChange = (provider: GitProvider) => {
    reset({ gitToken: '', gitOwner: '' });
    dispatch(clearGitState());
    dispatch(setIsGitSelected(true));
    dispatch(setGitProvider(provider));
  };

  const handleCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShowGoogleKeyFile(e.target.checked);
  }, []);

  const validateDOToken = useCallback(
    (token: string) => {
      if (token) {
        return dispatch(getDigitalOceanUser(token))
          .unwrap()
          .then(() => true)
          .catch(() => false);
      }
      return new Promise<boolean>((resolve) => resolve(true));
    },
    [dispatch],
  );

  const debouncedDOTokenValidate = useDebouncedPromise(validateDOToken, 1000);

  const handleDoTokenBlur = useCallback(
    (value: string) => {
      if (!value) {
        resetField('do_auth.token', { keepError: false, keepDirty: false, keepTouched: false });
      }
    },
    [resetField],
  );

  const gitLabel = useMemo(
    () => GIT_PROVIDER_DISPLAY_NAME[gitProvider as GitProvider],
    [gitProvider],
  );

  const isMarketplace = useMemo(() => installMethod?.includes('marketplace'), [installMethod]);

  const isDigitalOcean = useMemo(
    () => installationType === InstallationType.DIGITAL_OCEAN,
    [installationType],
  );

  const gitUserName = useMemo(
    () => githubUser?.login || gitlabUser?.name,
    [githubUser, gitlabUser],
  );

  useEffect(() => {
    return () => {
      dispatch(clearUserError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (googleKeyFile) {
      try {
        const keyFile = JSON.parse(googleKeyFile);
        if (hasProjectId(keyFile)) {
          setValue('google_auth.project_id', keyFile.project_id);
        } else {
          setValue('google_auth.project_id', '');
        }
      } catch (error) {
        setValue('google_auth.project_id', '');
      }
    }
  }, [googleKeyFile, setValue]);

  const showTooltip = useMemo(() => (gitUserName?.length ?? 0) > 22, [gitUserName]);

  return (
    <>
      {isMarketplace && (
        <div>
          <Typography
            variant="labelLarge"
            color={EXCLUSIVE_PLUM}
            sx={{ display: 'flex', gap: '6px' }}
          >
            Select your preferred GIT provider <Required>*</Required>
          </Typography>
          <GitContainer>
            {GIT_PROVIDERS.map((provider) => (
              <GitProviderButton
                key={provider}
                option={provider}
                active={provider === gitProvider && isGitSelected}
                onClick={() => handleGitProviderChange(provider)}
              />
            ))}
          </GitContainer>
        </div>
      )}
      <FormContainer isVisible={!isMarketplace || (isMarketplace && isGitSelected)}>
        <GitFieldsContainer>
          <Row style={{ width: '100%' }}>
            <ControlledPassword
              control={control}
              name="gitToken"
              label={`${gitLabel} personal access token`}
              required
              rules={{
                required: 'Required.',
              }}
              onBlur={handleGitToken}
              onErrorText={errors.gitToken?.message}
            />
          </Row>
          <GitUserField data-test-id="gitUser">
            <Typography
              variant="labelLarge"
              sx={{ display: 'flex', gap: '4px' }}
              color={EXCLUSIVE_PLUM}
            >{`${gitLabel} username`}</Typography>
            {showTooltip ? (
              <Tooltip title={gitUserName}>
                <GitUserFieldInput>{gitUserName}</GitUserFieldInput>
              </Tooltip>
            ) : (
              <GitUserFieldInput>{gitUserName}</GitUserFieldInput>
            )}
          </GitUserField>
        </GitFieldsContainer>

        {isGitHub ? (
          <ControlledAutocomplete
            control={control}
            required
            name="gitOwner"
            rules={{ required: true }}
            onChange={validateGitOwner}
            options={
              githubUserOrganizations &&
              githubUserOrganizations.map(({ login }) => ({ label: login, value: login }))
            }
            loading={gitStateLoading}
            label={`${gitLabel} organization name`}
            onClick={() => trigger('gitToken', { shouldFocus: true })}
          />
        ) : (
          <ControlledAutocomplete
            control={control}
            required
            name="gitOwner"
            rules={{ required: true }}
            onChange={validateGitOwner}
            options={
              gitlabGroups && gitlabGroups.map(({ name, path }) => ({ label: name, value: path }))
            }
            loading={gitStateLoading}
            label={`${gitLabel} group name`}
            onClick={() => trigger('gitToken', { shouldFocus: true })}
          />
        )}
        {installationType === InstallationType.GOOGLE && (
          <>
            <Column style={{ gap: '10px' }}>
              <ControlledTextArea
                control={control}
                name="google_auth.key_file"
                label="Google Cloud key file"
                rules={{ required: 'key file is required' }}
                required
                minRows={14}
                onErrorText={errors.google_auth?.key_file?.message}
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
              name="google_auth.project_id"
              label="Project ID"
              rules={{ required: 'project id is required' }}
              required
              helperText="Retrieve the Project ID from the project Dashboard “Project info” card"
              onErrorText={errors.google_auth?.project_id?.message}
            />
          </>
        )}
        {apiKeyInfo?.fieldKeys.map(({ label, name, helperText }) =>
          isDigitalOcean && name === 'token' ? (
            <ControlledPassword
              key={name}
              control={control}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              name={`${apiKeyInfo.authKey}.${name}`}
              label={label}
              helperText={helperText}
              required
              rules={{
                required: 'Required.',
                validate: {
                  validDOToken: async (token) =>
                    (await debouncedDOTokenValidate(token as string)) || 'Invalid token.',
                },
              }}
              onBlur={handleDoTokenBlur}
              onErrorText={errors.do_auth?.token?.message}
            />
          ) : (
            <ControlledPassword
              key={name}
              control={control}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              name={`${apiKeyInfo.authKey}.${name}`}
              label={label}
              helperText={helperText}
              required
              rules={{
                required: 'Required.',
              }}
            />
          ),
        )}
      </FormContainer>
    </>
  );
};

export default AuthForm;
