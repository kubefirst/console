import React, { FunctionComponent, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CircularProgress } from '@mui/material';

import Typography from '../Typography/Typography';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import { Content, Footer, Header } from './UninstallApplication.styled';

import { LAUGHING_ORANGE } from '@/constants/colors';

export interface UninstallApplicationProps extends PropsWithChildren {
  cluster: string;
  application: string;
  isOpen: boolean;
  isLoading: boolean;
  onDelete: () => void;
  onCloseModal?: () => void;
}

const UninstallApplication: FunctionComponent<UninstallApplicationProps> = ({
  application,
  cluster,
  isOpen,
  isLoading,
  onDelete,
  onCloseModal,
}) => {
  return (
    <Modal isOpen={isOpen} onCloseModal={onCloseModal}>
      <Box sx={{ width: '500px', backgroundColor: 'white' }}>
        <Header>
          <ErrorOutlineIcon htmlColor={LAUGHING_ORANGE} />
          <Typography variant="subtitle2">Uninstall application?</Typography>
        </Header>
        <Content>
          <>
            <Typography>
              Are you sure you want to uninstall <strong>{application}</strong> from cluster{' '}
              <strong>{cluster}</strong>?
            </Typography>
          </>
        </Content>
        <Footer>
          <Button variant="text" color="text" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onDelete}>
            {isLoading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
            Yes, uninstall
          </Button>
        </Footer>
      </Box>
    </Modal>
  );
};

export default UninstallApplication;
