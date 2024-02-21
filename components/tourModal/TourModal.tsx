import React, { FunctionComponent } from 'react';

import Modal, { IModalProps } from '../Modal/Modal';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';

import { CardContent, CardFooter, Content, K1Ray } from './TourModal.styled';

import kubefirstRay from '@/assets/ray.svg';
import { BISCAY, DOLPHIN } from '@/constants/colors';

interface TourModalProps extends Omit<IModalProps, 'children'> {
  onSkip: () => void;
  onTakeTour: () => void;
}

const TourCard: FunctionComponent<TourModalProps> = ({ onSkip, onTakeTour, ...modalProps }) => {
  return (
    <Modal {...modalProps}>
      <Content>
        <CardContent>
          <Typography variant="h6" color={BISCAY}>
            Welcome to kubefirst!
          </Typography>
          <K1Ray src={kubefirstRay} alt="Kubefirst k ray" />
          <Typography variant="body2" color={DOLPHIN} textAlign="center">
            We’d like to show you a couple of the features we’ve included to get you started.
          </Typography>
        </CardContent>
        <CardFooter>
          <Button color="text" onClick={onSkip}>
            Skip
          </Button>
          <Button color="primary" variant="contained" onClick={onTakeTour}>
            Take a quick tour
          </Button>
        </CardFooter>
      </Content>
    </Modal>
  );
};

export default TourCard;
