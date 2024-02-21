'use client';
import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';

import Typography from '@/components/Typography/Typography';
import NotFoundIcon from '@/assets/404.svg';
import Button from '@/components/Button/Button';
import { VOLCANIC_SAND } from '@/constants/colors';
import Column from '@/components/Column/Column';
import { Route } from '@/constants';

const Container = styled(Column)`
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  img {
    margin-bottom: 40px;
  }
`;

const Description = muiStyled(Typography)(
  () => `
  color: ${VOLCANIC_SAND};
  text-align: center;
  margin: 24px 0;
  width: 340px;
`,
);

const NotFound: FunctionComponent = () => {
  const { push } = useRouter();

  const goHomePage = () => {
    push(Route.HOME);
  };

  return (
    <Container>
      <Image alt="not-found" src={NotFoundIcon} />
      <Typography variant="h4">Page not found</Typography>
      <Description variant="body2">
        The page you are trying to access is unavailable, has been deleted or doesn’t exist.
      </Description>
      <Button color="primary" variant="contained" onClick={goHomePage}>
        <Typography variant="buttonSmall">Back to homepage</Typography>
      </Button>
    </Container>
  );
};

export default NotFound;
