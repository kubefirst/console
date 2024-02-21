import React, { FunctionComponent } from 'react';

import CopyButton from '../CopyButton/CopyButton';

import { Command, Container } from './CopyCommand.styled';

export interface CopyCommandProps {
  command: string;
}

const CopyCommand: FunctionComponent<CopyCommandProps> = ({ command, ...rest }) => {
  return (
    <Container {...rest}>
      <Command>{command}</Command>
      <CopyButton buttonText="Copy" textToCopy={command} />
    </Container>
  );
};

export default CopyCommand;
