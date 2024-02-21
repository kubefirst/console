import React, { FunctionComponent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {
  Container,
  Description,
  Footer,
  Header,
  SubscriptionOptions,
} from './CancelSubscriptionForm.styled';

import Typography from '@/components/Typography/Typography';
import { BISCAY, SALTBOX_BLUE, VOLCANIC_SAND } from '@/constants/colors';
import ControlledCheckbox from '@/components/controlledFields/ControlledCheckbox/ControlledCheckbox';
import Button from '@/components/Button/Button';
import { CancelSubscriptionFields, UserRequest } from '@/types/subscription';
import ControlledTextArea from '@/components/controlledFields/ControlledTextArea/ControlledTextArea';
import { Required } from '@/components/TextField/TextField.styled';

export const CANCEL_SUBSCRIPTION_OPTIONS = [
  {
    name: 'projectIsComplete',
    label: 'The project I was working on is now complete',
  },
  {
    name: 'kubefirstIsTooExpensive',
    label: 'kubefirst is too expensive',
  },
  {
    name: 'kubefirstIsDifficult',
    label: 'kubefirst is too difficult to use',
  },
  {
    name: 'didnotUsePaidPlan',
    label: 'I didn’t use the paid plan features',
  },
  {
    name: 'didnotProvideFunctionality',
    label: 'kubefirst didn’t provide the functionality I needed',
  },
  {
    name: 'other',
    label: 'Other',
  },
];

export interface CancelSubscriptionFormProps {
  closeModal: () => void;
  handleCancelSubscription: (userRequest: UserRequest) => void;
}

const CancelSubscriptionForm: FunctionComponent<CancelSubscriptionFormProps> = ({
  closeModal,
  handleCancelSubscription,
}) => {
  const [hasSelectedOption, setHasSelectedOption] = useState<boolean>(false);
  const { control, handleSubmit, watch, reset } = useFormContext<CancelSubscriptionFields>();

  const onSubmit = async ({ description, ...rest }: CancelSubscriptionFields) => {
    const reasons = Object.keys(rest)
      .filter((key) => rest && !!rest[key as never])
      .map((reason) => {
        return CANCEL_SUBSCRIPTION_OPTIONS.find(({ name }) => name === reason)?.label;
      })
      .join(', ');

    const requestData: UserRequest = {
      requestData: JSON.stringify({ message: description, reason: reasons }),
      type: 'cancel',
    };

    handleCancelSubscription(requestData);
    reset();
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const subscription = watch(({ description, ...rest }) => {
      setHasSelectedOption([...Object.values(rest)].includes(true));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Header>
        <Typography variant="h6" color={BISCAY}>
          Cancel my subscription
        </Typography>
        <CloseIcon style={{ margin: 0, color: SALTBOX_BLUE }} onClick={closeModal} />
      </Header>
      <Divider />
      <Typography variant="body2" color={VOLCANIC_SAND} sx={{ m: '32px 24px', display: 'flex' }}>
        Before you go would you mind letting us know why? <Required>*</Required>
      </Typography>
      <SubscriptionOptions>
        {CANCEL_SUBSCRIPTION_OPTIONS.map(({ name, label }) => (
          <ControlledCheckbox
            key={name}
            control={control}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            name={name}
            label={label}
            rules={{
              required: false,
            }}
          />
        ))}
      </SubscriptionOptions>
      <Description>
        <ControlledTextArea
          control={control}
          label="Anything else you’d like to share?"
          name="description"
          minRows={3}
          rules={{
            maxLength: {
              value: 280,
              message: 'Max 280 characters permitted',
            },
          }}
        />
      </Description>
      <Divider />
      <Footer>
        <Button color="secondary" variant="outlined" onClick={closeModal}>
          Cancel
        </Button>
        <Button color="error" variant="contained" type="submit" disabled={!hasSelectedOption}>
          Cancel subscription
        </Button>
      </Footer>
    </Container>
  );
};

export default CancelSubscriptionForm;
