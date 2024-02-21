import React, { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import ControlledTextField from '../../../../components/controlledFields/ControlledTextField/ControlledTextField';
import ControlledPassword from '../../../../components/controlledFields/ControlledPassword';
import { InstallValues } from '../../../../types/redux';

export const LocalSetupForm: FunctionComponent = () => {
  const { control } = useFormContext<InstallValues>();
  return (
    <>
      <ControlledPassword
        control={control}
        name="gitToken"
        label="GitHub token"
        rules={{
          required: true,
        }}
        required
        helperText="Note: this token will expire in 8 hours"
      />
      <ControlledTextField
        control={control}
        name="gitopsTemplateBranch"
        rules={{ required: false }}
        label="GitOps template override"
      />
      <ControlledTextField
        control={control}
        name="gitopsTemplateUrl"
        rules={{ required: false }}
        label="GitOps template branch"
      />
    </>
  );
};
