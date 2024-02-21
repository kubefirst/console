import React, { FunctionComponent } from 'react';

import Modal, { IModalProps } from '../Modal/Modal';
import Column from '../Column/Column';
import CopyCommand, { CopyCommandProps } from '../CopyCommand/CopyCommand';
import Button from '../Button/Button';

import {
  ButtonContainer,
  Content,
  ExclamationIcon,
  ExternalLink,
  Main,
  StyledTypography,
} from './KubeConfigModal.styled';

export interface KubeConfigModalProps extends Omit<IModalProps, 'children'>, CopyCommandProps {
  onAcceptance: () => void;
  commandDocLink: string;
}

const KubeConfigModal: FunctionComponent<KubeConfigModalProps> = ({
  command,
  onAcceptance,
  commandDocLink,
  ...rest
}) => {
  return (
    <Modal padding={0} styleOverrides={{ padding: '32px', width: '630px' }} {...rest}>
      <Main>
        {/* Exclamation Icon */}
        <Column>
          <ExclamationIcon />
        </Column>
        {/* Main Content */}
        <Content>
          <StyledTypography variant="subtitle2">
            Access your kubeconfig file by using the following command:
          </StyledTypography>
          <StyledTypography variant="body2">
            You can find more information about accessing your clusters kubeconfig file{' '}
            <ExternalLink href={commandDocLink} target="_blank" rel="noreferrer">
              here.
            </ExternalLink>
          </StyledTypography>
          <CopyCommand command={command} />
          <ButtonContainer>
            <Button variant="contained" color="primary" onClick={onAcceptance}>
              Got it
            </Button>
          </ButtonContainer>
        </Content>
      </Main>
    </Modal>
  );
};

export default KubeConfigModal;
