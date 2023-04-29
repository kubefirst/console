import React, { FunctionComponent } from 'react';
import { FormFlowProps } from 'types/provision';

import { InstallValues } from '../../../../types/redux/index';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { CIVO_REGIONS, EMAIL_REGEX } from '../../../../constants/index';
import ControlledTextField from '../../../../components/controlledFields/TextField';

const DigitalOceanSetupForm: FunctionComponent<FormFlowProps<InstallValues>> = ({ control }) => {
  return (
    <>
      <ControlledTextField
        control={control}
        name="alertsEmail"
        label="Alerts email"
        helperText="This email address will receive important system notifications such cert expiry notices."
        required
        rules={{
          required: true,
          pattern: EMAIL_REGEX,
        }}
      />
      <ControlledAutocomplete
        control={control}
        name="cloudRegion"
        label="Datacenter region"
        required
        rules={{ required: true }}
        options={CIVO_REGIONS}
      />
      <ControlledTextField
        control={control}
        name="domainName"
        label="Cluster domain name"
        required
        rules={{
          required: true,
        }}
      />
      <ControlledTextField
        control={control}
        name="clusterName"
        label="Cluster name"
        rules={{
          maxLength: 25,
          required: true,
        }}
        onErrorText="Maximum 25 characters."
      />
    </>
  );
};

export default DigitalOceanSetupForm;