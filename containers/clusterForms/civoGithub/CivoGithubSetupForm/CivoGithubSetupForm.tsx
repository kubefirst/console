import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import FormContainer from '../../../../components/FormContainer/FormContainer';
import { CivoGithubClusterValues } from '../../../../types/redux/index';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import ControlledPassword from '../../../../components/controlledFields/Password';
import { AWS_REGIONS, EMAIL_REGEX } from '../../../../constants/index';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import { GithubUserOrganization } from '../../../../types/github/index';

export interface CivoGithubSetupFormProps {
  hasTokenValue: boolean;
  githubTokenValid: boolean;
  githubUserOrginizations: GithubUserOrganization[];
  onGithubTokenBlur: (token: string) => void;
  onFormSubmit: (values: CivoGithubClusterValues) => void;
  loading: boolean;
}

const CivoGithubSetupForm = forwardRef<HTMLFormElement, CivoGithubSetupFormProps>(
  function CivoGithubSetupForm(props, ref) {
    const { control, handleSubmit } = useForm<CivoGithubClusterValues>();

    const {
      onGithubTokenBlur,
      hasTokenValue,
      githubTokenValid,
      loading,
      githubUserOrginizations,
      onFormSubmit,
      ...rest
    } = props;

    return (
      <FormContainer component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref} {...rest}>
        <ControlledTextField
          control={control}
          name="adminEmail"
          label="Admin Email"
          onErrorText="Invalid email address."
          required
          rules={{
            required: true,
            pattern: EMAIL_REGEX,
          }}
        />
        <ControlledPassword
          control={control}
          name="kbotPassword"
          rules={{ required: true }}
          required
          label="Create K-bot password"
        />
        <ControlledAutocomplete
          control={control}
          name="region"
          label="Region"
          required
          rules={{ required: true }}
          options={AWS_REGIONS}
        />
        <ControlledTextField
          control={control}
          name="civoToken"
          label="CIVO token"
          required
          rules={{
            required: true,
          }}
        />
        <ControlledTextField
          control={control}
          name="clusterName"
          label="Cluster name"
          required
          rules={{
            maxLength: 25,
            required: true,
          }}
          onErrorText="Maximum 25 characters."
        />
        <ControlledPassword
          control={control}
          name="githubToken"
          label="GitHub token"
          rules={{
            required: true,
          }}
          required
          onBlur={onGithubTokenBlur}
          helperText="Note: this token will expire in 8 hours"
          error={!githubTokenValid && hasTokenValue}
          onErrorText="Invalid token."
        />
        <ControlledAutocomplete
          control={control}
          required
          name="githubOrganization"
          rules={{ required: true }}
          loading={loading}
          disabled={false}
          options={githubUserOrginizations.map(({ login }) => ({ label: login, value: login }))}
          label="Github organization"
          placeholder="Select"
        />
      </FormContainer>
    );
  },
);

export default styled(CivoGithubSetupForm)`
  gap: 20px;
`;
