import React, { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Container, FieldsContainer, Footer, Header, NameSection } from './ContactUsForm.styled';

import Typography from '@/components/Typography/Typography';
import { BISCAY, SALTBOX_BLUE, VOLCANIC_SAND } from '@/constants/colors';
import Button from '@/components/Button/Button';
import { ContactUsFields, UserRequest } from '@/types/subscription';
import ControlledTextArea from '@/components/controlledFields/ControlledTextArea/ControlledTextArea';
import ControlledTextField from '@/components/controlledFields/ControlledTextField/ControlledTextField';
import { EMAIL_REGEX } from '@/constants';

export interface ContactUsFormProps {
  closeModal: () => void;
  handleContactUsRequest: (userRequest: UserRequest) => void;
}

const ContactUsFormProps: FunctionComponent<ContactUsFormProps> = ({
  closeModal,
  handleContactUsRequest,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormContext<ContactUsFields>();

  const onSubmit = async ({ email, firstName, lastName, message }: ContactUsFields) => {
    const requestData: UserRequest = {
      requestData: JSON.stringify({ message, email, name: `${firstName} ${lastName}` }),
      type: 'upgrade',
    };

    handleContactUsRequest(requestData);
    reset();
  };

  return (
    <Container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Header>
        <Typography variant="h6" color={BISCAY}>
          Contact us for an Enterprise Plan
        </Typography>
        <CloseIcon style={{ margin: 0, color: SALTBOX_BLUE }} onClick={closeModal} />
      </Header>
      <Divider />
      <Typography variant="body2" color={VOLCANIC_SAND} sx={{ m: '32px 24px', display: 'flex' }}>
        Get even more GitOps magic with an Enterprise Plan. Send us a few details and a member of
        our team will reach out to you as soon as possible.{' '}
      </Typography>
      <FieldsContainer>
        <NameSection>
          <ControlledTextField
            control={control}
            label="First name"
            name="firstName"
            required
            rules={{
              required: true,
            }}
          />
          <ControlledTextField
            control={control}
            label="Last name"
            name="lastName"
            required
            rules={{
              required: true,
            }}
          />
        </NameSection>
        <ControlledTextField
          control={control}
          label="Email"
          name="email"
          onErrorText="Invalid email address."
          required
          rules={{
            required: true,
            pattern: EMAIL_REGEX,
          }}
        />
        <ControlledTextArea
          control={control}
          label="Message"
          placeholder="It may be helpful to tell us a little about your enterprise requirements..."
          name="message"
          minRows={3}
          rules={{
            maxLength: {
              value: 280,
              message: 'Max 280 characters permitted',
            },
          }}
        />
      </FieldsContainer>
      <Divider />
      <Footer>
        <Button color="text" variant="text" onClick={closeModal}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </Footer>
    </Container>
  );
};

export default ContactUsFormProps;
