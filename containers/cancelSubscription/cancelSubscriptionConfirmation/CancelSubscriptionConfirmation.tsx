import React, { FunctionComponent } from 'react';
import { Divider } from '@mui/material';
import Image from 'next/image';

import { Container, Footer } from './CancelSubscriptionConfirmation.styled';

import Cancel from '@/assets/cancel.svg';
import Typography from '@/components/Typography/Typography';
import { BISCAY, VOLCANIC_SAND } from '@/constants/colors';
import Button from '@/components/Button/Button';

export interface CancelSubscriptionConfirmationProps {
  closeModal: () => void;
}

const CancelSubscriptionConfirmation: FunctionComponent<CancelSubscriptionConfirmationProps> = ({
  closeModal,
}) => {
  return (
    <>
      <Container>
        <Typography variant="h6" sx={{ mb: 3 }} color={BISCAY}>
          We’re sorry to see you go!
        </Typography>
        <Image alt="cancel-image" src={Cancel} />
        <Typography variant="body2" color={VOLCANIC_SAND} sx={{ mt: 3, textAlign: 'center' }}>
          You will receive an email within 24 hours confirming that your subscription has been
          cancelled and your plan has been downgraded.
        </Typography>
      </Container>
      <Divider />
      <Footer>
        <Button color="primary" variant="contained" onClick={closeModal}>
          Close
        </Button>
      </Footer>
    </>
  );
};

export default CancelSubscriptionConfirmation;
