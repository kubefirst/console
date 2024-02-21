import React, { FunctionComponent, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ContactUsForm from './ContactUsForm/ContactUsForm';

import { CancelSubscriptionFields, UserRequest } from '@/types/subscription';
import Modal from '@/components/Modal/Modal';
import { useAppDispatch } from '@/redux/store';
import { createUserRequest, validateLicenseKey } from '@/redux/thunks/subscription.thunk';

export interface ContactUsProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ContactUs: FunctionComponent<ContactUsProps> = ({ isOpen, closeModal }) => {
  const dispatch = useAppDispatch();

  const methods = useForm<CancelSubscriptionFields>({
    mode: 'onChange',
  });

  const handleContactUsRequest = useCallback(
    (userRequest: UserRequest) => {
      dispatch(createUserRequest(userRequest)).then(() => {
        dispatch(validateLicenseKey());
        closeModal();
      });
    },
    [closeModal, dispatch],
  );

  return (
    <Modal isOpen={isOpen} padding={0}>
      <FormProvider {...methods}>
        <ContactUsForm closeModal={closeModal} handleContactUsRequest={handleContactUsRequest} />
      </FormProvider>
    </Modal>
  );
};

export default ContactUs;
