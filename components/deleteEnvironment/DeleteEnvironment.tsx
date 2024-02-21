import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Typography from '../Typography/Typography';
import TextFieldWithRef from '../TextField/TextField';
import Modal from '../Modal/Modal';
import { LAUGHING_ORANGE, TRUE_BLUE } from '../../constants/colors';
import Button from '../Button/Button';
import { ClusterEnvironment } from '../../types/provision';
import CopyButton from '../CopyButton/CopyButton';

import { Content, CopyTextContainer, Footer, Header, NextLink } from './DeleteEnvironment.styled';

export interface DeleteEnvironmentProps extends PropsWithChildren {
  environment: ClusterEnvironment;
  boundToCluster: boolean;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onCloseModal?: () => void;
}

const DeleteEnvironment: FunctionComponent<DeleteEnvironmentProps> = ({
  environment,
  boundToCluster,
  isOpen,
  onClose,
  onDelete,
  onCloseModal,
}) => {
  const [matchingEnvName, setMatchingEnvName] = useState('');

  return (
    <Modal isOpen={isOpen} onCloseModal={onCloseModal}>
      <Box sx={{ width: '500px', backgroundColor: 'white' }}>
        <Header>
          <ErrorOutlineIcon htmlColor={boundToCluster ? TRUE_BLUE : LAUGHING_ORANGE} />
          <Typography variant="subtitle2">
            {boundToCluster
              ? 'Environment cannot be deleted while linked to cluster.'
              : `Delete ${environment.name} environment?`}
          </Typography>
        </Header>
        <Content>
          {boundToCluster ? (
            <>
              <Typography style={{ marginBottom: '13px' }}>
                To delete this environment first remove link it has with any clusters.
              </Typography>
              <Typography style={{ display: 'inline' }}>
                You can do this via the
                <NextLink href="/cluster-management"> Cluster management</NextLink> page.
              </Typography>
            </>
          ) : (
            <>
              <CopyTextContainer>
                <Typography>Are you sure you want to delete the</Typography>
                <CopyButton buttonText={environment.name} textToCopy={environment.name} />
                <Typography>environment? This action cannot be undone.</Typography>
              </CopyTextContainer>
              <TextFieldWithRef
                style={{ width: '100%' }}
                label="To delete, enter the environment name"
                required
                onChange={(e) => setMatchingEnvName(e.target.value)}
              />
            </>
          )}
        </Content>
        <Footer>
          {!boundToCluster && (
            <Button variant="text" onClick={onClose} color="info">
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            onClick={boundToCluster ? onClose : onDelete}
            color={boundToCluster ? 'primary' : 'error'}
            disabled={environment.name !== matchingEnvName && !boundToCluster}
          >
            {boundToCluster ? 'Got it!' : 'Yes, Delete'}
          </Button>
        </Footer>
      </Box>
    </Modal>
  );
};

export default DeleteEnvironment;
