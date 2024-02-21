import React, { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import CopyToClipboard from 'react-copy-to-clipboard';

import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Password from '../Password/Password';

import { Container, Link, PasswordContainer, Title } from './ClusterReady.styled';

import Box from '@/assets/box.svg';

export interface ClusterRunningMessageProps {
  clusterName?: string;
  domainName?: string;
  kbotPassword?: string;
  onOpenConsole: () => void;
}

const ClusterReady: FunctionComponent<ClusterRunningMessageProps> = ({
  clusterName,
  domainName,
  kbotPassword,
  onOpenConsole,
}) => {
  const [copyLabel, setCopyLabel] = useState<string>('Copy');

  const handleOnCopy = () => {
    setCopyLabel('Copied!');

    setTimeout(() => setCopyLabel('Copy'), 3000);
  };

  return (
    <Container>
      <Image alt="box" src={Box} width={170} height={160} />
      <Title variant="body1">
        Cluster <strong>{clusterName || '<cluster identifier>'}</strong> is now up and running.
      </Title>
      <Typography variant="body2" style={{ textAlign: 'center' }}>
        Copy the kbot user password and log into the kubefirst console UI.
      </Typography>
      <PasswordContainer>
        <Password value={kbotPassword} sx={{ width: '100%' }} />
        <CopyToClipboard text={kbotPassword as string} onCopy={handleOnCopy}>
          <Button color="text" variant="text">
            {copyLabel}
          </Button>
        </CopyToClipboard>
      </PasswordContainer>
      <Link href={`https://kubefirst.${domainName}/`} target="_blank" onClick={onOpenConsole}>
        <Button variant="contained" color="primary" data-test-id="launch-console">
          Open kubefirst console
        </Button>
      </Link>
    </Container>
  );
};

export default ClusterReady;
