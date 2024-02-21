import React, { FunctionComponent, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { CheckboxContainer, Switch } from './AdvancedOptions.styled';

import { Required } from '@/components/TextField/TextField.styled';
import Typography from '@/components/Typography/Typography';
import SwitchComponent from '@/components/Switch/Switch';
import Checkbox from '@/components/controlledFields/ControlledCheckbox/ControlledCheckbox';
import ControlledTextField from '@/components/controlledFields/ControlledTextField/ControlledTextField';
import ControlledRadio from '@/components/controlledFields/ControlledRadioGroup/ControlledRadioGroup';
import { useAppSelector } from '@/redux/store';
import { InstallValues, InstallationType } from '@/types/redux';
import { GitProvider } from '@/types';
import { EXCLUSIVE_PLUM } from '@/constants/colors';

interface AdvancedOptionsProps {
  advancedOptionsChecked: boolean;
  onAdvancedOptionsChange: (checked: boolean) => void;
}

const AdvancedOptions: FunctionComponent<AdvancedOptionsProps> = ({
  advancedOptionsChecked,
  onAdvancedOptionsChange,
}) => {
  const { values, installType, gitProvider } = useAppSelector(({ installation }) => installation);

  const isGitHub = useMemo(() => gitProvider === GitProvider.GITHUB, [gitProvider]);
  const gitLabel = useMemo(() => (isGitHub ? 'GitHub' : 'GitLab'), [isGitHub]);

  const { control } = useFormContext<InstallValues>();
  const isAwsInstallation = useMemo(() => installType === InstallationType.AWS, [installType]);

  return (
    <>
      <Switch>
        <Typography variant="subtitle2">Advanced Options</Typography>
        <SwitchComponent
          name="advancedOptions"
          value={advancedOptionsChecked}
          onChange={onAdvancedOptionsChange}
        />
      </Switch>
      {advancedOptionsChecked && (
        <>
          <ControlledTextField
            control={control}
            name="gitopsTemplateUrl"
            label="gitops-template repository override"
            defaultValue={values?.gitopsTemplateUrl}
            rules={{
              required: false,
            }}
            helperText={`Example format: https://${gitProvider}.com/kubefirst/gitops-template`}
          />
          <ControlledTextField
            control={control}
            name="gitopsTemplateBranch"
            label="GitOps template branch"
            defaultValue={values?.gitopsTemplateBranch}
            rules={{
              required: false,
            }}
            helperText="Example: main"
          />
          <CheckboxContainer>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              By default kubefirst uses SSH to create your cluster check below to use HTTPS instead{' '}
            </Typography>
            <Checkbox
              control={control}
              name="useHttps"
              label="Use HTTPS"
              rules={{
                required: false,
              }}
            />
          </CheckboxContainer>
          {isAwsInstallation && (
            <CheckboxContainer>
              <Typography
                variant="body2"
                color={EXCLUSIVE_PLUM}
                sx={{ display: 'flex', gap: '4px' }}
              >
                Manage image repositories with <Required>*</Required>
              </Typography>
              <ControlledRadio
                control={control}
                rules={{
                  required: true,
                }}
                name="imageRepository"
                options={[
                  { label: `${gitLabel} Container Registry`, value: 'git' },
                  { label: 'AWS Elastic Container Registry (ECR)', value: 'ecr' },
                ]}
              />
            </CheckboxContainer>
          )}
        </>
      )}
    </>
  );
};

export default AdvancedOptions;
