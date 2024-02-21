import React, { FunctionComponent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import LearnMore from '../../../../components/LearnMore/LearnMore';
import Typography from '../../../../components/Typography/Typography';
import Checkbox from '../../../../components/controlledFields/ControlledCheckbox/ControlledCheckbox';
import ControlledTextField from '../../../../components/controlledFields/ControlledTextField/ControlledTextField';
import ControlledAutocomplete from '../../../../components/controlledFields/ControlledAutocomplete/ControlledAutocomplete';
import ControlledRadioGroup from '../../../../components/controlledFields/ControlledRadioGroup/ControlledRadioGroup';
import { useAppSelector } from '../../../../redux/store';
import { ImageRepository, NewWorkloadClusterConfig } from '../../../../types/provision';
import { EXCLUSIVE_PLUM } from '../../../../constants/colors';

import { InputContainer } from './advancedOptions.styled';

const AdvancedOptions: FunctionComponent = () => {
  const [isCloudFlareSelected, setIsCloudFlareSelected] = useState<boolean>(false);

  const { installType } = useAppSelector(({ installation }) => installation);

  const { control, getValues } = useFormContext<NewWorkloadClusterConfig>();

  const { gitopsTemplateUrl, gitopsTemplateBranch, imageRepository } = getValues();

  return (
    <>
      <LearnMore
        installType={installType}
        description="Learn more about"
        href=""
        linkTitle="customizing the GitOps template"
      />
      <ControlledTextField
        control={control}
        name="gitopsTemplateUrl"
        label="GitOps template override"
        defaultValue={gitopsTemplateUrl}
        rules={{
          required: false,
        }}
      />
      <ControlledTextField
        control={control}
        name="gitopsTemplateBranch"
        label="GitOps template branch"
        defaultValue={gitopsTemplateBranch}
        rules={{
          required: false,
        }}
      />
      <InputContainer>
        <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
          By default kubefirst uses ssh to create your cluster check the below to use https instead{' '}
        </Typography>
        <Checkbox
          control={control}
          name="useHttps"
          label="Use https"
          rules={{
            required: false,
          }}
        />
      </InputContainer>
      <ControlledAutocomplete
        control={control}
        name="dnsProvider"
        label="DNS provider"
        defaultValue="default"
        options={[
          { label: 'Default', value: 'default' },
          { label: 'Cloudflare', value: 'cloudflare' },
        ]}
        onChange={(value) => setIsCloudFlareSelected(value === 'cloudflare')}
        rules={{
          required: false,
        }}
      />
      {isCloudFlareSelected && (
        <ControlledTextField
          control={control}
          name="cloudflareToken"
          label="Cloudflare API key"
          required
          defaultValue={gitopsTemplateBranch}
          rules={{
            required: true,
          }}
        />
      )}
      <InputContainer>
        <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
          Manage image repositories with
        </Typography>
        <ControlledRadioGroup
          control={control}
          name="imageRepository"
          rules={{
            required: false,
          }}
          options={[
            { label: 'Github Container Registry', value: ImageRepository.GIT },
            { label: 'AWS Elastic Container Registry (ECR)', value: ImageRepository.ECR },
          ]}
          defaultValue={imageRepository}
        />
      </InputContainer>
    </>
  );
};

export default AdvancedOptions;
