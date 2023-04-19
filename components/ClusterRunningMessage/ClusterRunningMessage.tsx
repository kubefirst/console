import React, { FC } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import Typography from '../typography';
import boxImgSrc from '../../public/static/box.svg';

import { Container, Description, Link, Title } from './ClusterRunningMessage.styled';

const boxImageSrc = process.env.STORYBOOK_MODE ? boxImgSrc : '/static/box.svg';

const ClusterRunningMessage: FC = (props) => (
  <Container {...props}>
    <Image alt="box" src={boxImageSrc} width={170} height={160} />
    <Title>
      <Typography variant="body1">
        Cluster <strong>{'<cluster identifier>'}</strong> is now up and running.
      </Typography>
    </Title>
    <Description>
      <Typography variant="body2" align="center">
        You’ll now be able to add and manage clusters, in addition to adding team members.{' '}
        <Link href="#">Here’s how</Link>
      </Typography>
    </Description>
  </Container>
);

export default styled(ClusterRunningMessage)``;
