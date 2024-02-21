import React, { FunctionComponent, ReactNode, useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import CancelSubscriptionForm from './CancelSubscriptionForm/CancelSubscriptionForm';
import CancelSubscriptionConfirmation from './CancelSubscriptionConfirmation/CancelSubscriptionConfirmation';

import useStep from '@/hooks/useStep';
import { CancelSubscriptionFields, UserRequest } from '@/types/subscription';
import Modal from '@/components/Modal/Modal';
import { useAppDispatch } from '@/redux/store';
import { createUserRequest, validateLicenseKey } from '@/redux/thunks/subscription.thunk';

export enum MODAL_STEP {
  FORM = 0,
  CONFIRMATION = 1,
}

export interface CancelSubscriptionProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CancelSubscription: FunctionComponent<CancelSubscriptionProps> = ({ isOpen, closeModal }) => {
  const { currentStep, goToNext, goTo } = useStep();
  const dispatch = useAppDispatch();

  const methods = useForm<CancelSubscriptionFields>({
    mode: 'onChange',
  });

  const handleCancelSubscription = useCallback(
    (userRequest: UserRequest) => {
      dispatch(createUserRequest(userRequest)).then(() => {
        goToNext();
        dispatch(validateLicenseKey());
      });
    },
    [dispatch, goToNext],
  );

  const handleClose = useCallback(() => {
    closeModal();
    goTo(0);
  }, [closeModal, goTo]);

  const modalComponents = useMemo(
    () =>
      ({
        [MODAL_STEP.FORM]: (
          <FormProvider {...methods}>
            <CancelSubscriptionForm
              closeModal={closeModal}
              handleCancelSubscription={handleCancelSubscription}
            />
          </FormProvider>
        ),
        [MODAL_STEP.CONFIRMATION]: <CancelSubscriptionConfirmation closeModal={handleClose} />,
      } as { [key: string]: ReactNode }),
    [closeModal, handleCancelSubscription, handleClose, methods],
  );

  const modalComponent = useMemo<ReactNode>(
    () => modalComponents && modalComponents[currentStep as unknown as string],
    [currentStep, modalComponents],
  );

  return (
    <Modal isOpen={isOpen} padding={0}>
      <>{modalComponent}</>
    </Modal>
  );
};

export default CancelSubscription;
