import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';

import { Container, Content, Close, Footer, Header } from './UpgradeModal.styled';

import { ASMANI_SKY, ECHO_BLUE, MIDNIGHT_EXPRESS, WHITE } from '@/constants/colors';
import RocketIcon from '@/assets/rocket.svg';

export interface UpgradeModalProps {
  isOpen: boolean;
  clusterLimitText: string;
  clusterLimitDescription: string;
  ctaText: string;
  closeModal: () => void;
}

const UpgradeModal: FunctionComponent<UpgradeModalProps> = ({
  ctaText,
  closeModal,
  clusterLimitText,
  clusterLimitDescription,
  isOpen,
}) => {
  const handleRedirect = () => {
    return window.open(`${location.origin}/settings/subscription/plans`, '_blank');
  };

  return (
    <Modal isOpen={isOpen} padding={0} backgroundColor={MIDNIGHT_EXPRESS}>
      <Container>
        <Header>
          <Close onClick={closeModal} htmlColor={ECHO_BLUE} fontSize="medium" />
        </Header>
        <Content>
          <Image alt="rocket" src={RocketIcon} />
          <Typography variant="subtitle2" color={WHITE} sx={{ mt: 2 }}>
            {clusterLimitText}
          </Typography>
          <Typography variant="body2" color={WHITE} sx={{ mt: 2, textAlign: 'center' }}>
            {clusterLimitDescription}
          </Typography>
        </Content>
        <Footer>
          <Button variant="outlined" color="subscription" onClick={handleRedirect}>
            <StarBorderOutlinedIcon htmlColor={ASMANI_SKY} sx={{ mr: 1 }} /> {ctaText}
          </Button>
        </Footer>
      </Container>
    </Modal>
  );
};

export default UpgradeModal;
