import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { CivoClusterValues } from '../../../../types/redux';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import ControlledPassword from '../../../../components/controlledFields/Password';
import { AWS_REGIONS, EMAIL_REGEX } from '../../../../constants/index';
import ControlledTextField from '../../../../components/controlledFields/TextField';

import { Form } from './CivoGitlabSetupForm.styled';

export interface CivoGitlabSetupFormProps {
  onFormSubmit: (values: CivoClusterValues) => void;
}

export const CivoGitlabSetupForm = forwardRef<HTMLFormElement, CivoGitlabSetupFormProps>(
  function CivoGitlabSetupForm(props, ref) {
    const { control, handleSubmit } = useForm<CivoClusterValues>();

    const { onFormSubmit } = props;

    return (
      <Form component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref}>
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
      </Form>
    );
  },
);