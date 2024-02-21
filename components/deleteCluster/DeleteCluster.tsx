import React, { FunctionComponent, useState } from 'react';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

import Modal, { IModalProps } from '../Modal/Modal';
import Button from '../Button/Button';
import { Cluster, ClusterType, DraftCluster } from '../../types/provision';
import CopyButton from '../CopyButton/CopyButton';

import {
  Container,
  Content,
  ErrorIcon,
  Footer,
  GapContainer,
  MainMessage,
  NextLink,
  Text,
  TextField,
} from './DeleteCluster.styled';

export interface DeleteClusterProps extends Omit<IModalProps, 'children'> {
  cluster: Cluster | DraftCluster;
  onDelete: () => void;
}

const DeleteCluster: FunctionComponent<DeleteClusterProps> = ({ cluster, onDelete, ...rest }) => {
  const [matchingClusterName, setMatchingClusterName] = useState('');

  const isManagementCluster = cluster.type === ClusterType.MANAGEMENT;

  return (
    <Modal {...rest} styleOverrides={{ width: '436px' }}>
      <Container>
        <ErrorIcon />
        <GapContainer>
          <Content>
            <MainMessage>Delete {cluster.clusterName} ?</MainMessage>
            {isManagementCluster ? (
              <>
                <Text>Deleting a management cluster is carried out via the CLI.</Text>
                <Text style={{ marginBottom: '13px' }}>
                  <strong>Note:</strong>{' '}
                  {`deleting a management cluster will also delete all it's
                  corresponding worker clusters`}
                </Text>
                <NextLink href="https://docs.kubefirst.io/common/deprovision" target="_blank">
                  <>
                    How to delete a management cluster
                    <LaunchOutlinedIcon />
                  </>
                </NextLink>
              </>
            ) : (
              <>
                <Text>
                  Are you sure you want to delete the cluster{' '}
                  <CopyButton buttonText={cluster.clusterName} textToCopy={cluster.clusterName} /> ?
                  This action cannot be undone.
                </Text>
                <Text>
                  <strong>Note:</strong> You will still need to manually delete the cluster folder
                  from your gitops repository
                </Text>
              </>
            )}
          </Content>
          {!isManagementCluster && (
            <TextField
              label="To delete, enter cluster name"
              onChange={(e) => setMatchingClusterName(e.target.value)}
            />
          )}
          <Footer>
            <Button variant="text" onClick={rest.onCloseModal} color="text">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={isManagementCluster ? rest.onCloseModal : onDelete}
              color={isManagementCluster ? 'primary' : 'error'}
              disabled={cluster.clusterName !== matchingClusterName && !isManagementCluster}
            >
              {isManagementCluster ? 'Got it!' : 'Yes, Delete'}
            </Button>
          </Footer>
        </GapContainer>
      </Container>
    </Modal>
  );
};

export default DeleteCluster;
