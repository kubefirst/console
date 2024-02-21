import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import useToggle from '../../hooks/useToggle';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';

import BannerComponent from './Banner';

import { WHITE } from '@/constants/colors';

export const Link = styled.a`
  cursor: pointer;
  text-decoration: underline;
`;

const meta: Meta<typeof Banner> = {
  component: BannerComponent,
};

export default meta;

const Banner = () => {
  const { isOpen, open, close } = useToggle(false);
  return (
    <div>
      {isOpen && (
        <BannerComponent close={close} type="error">
          <Typography variant="subtitle2" color={WHITE} sx={{ fontWeight: 400 }}>
            <strong style={{ fontWeight: 500 }}>Your payment was declined.</strong> Please{' '}
            <Link>update your billing information</Link> to continue to use the kubefirst UI to
            manage your physical clusters. Alternatively, manage your physical clusters directly in
            your GitOps repository on a Free Plan.
          </Typography>
        </BannerComponent>
      )}
      <Button color="primary" variant="contained" onClick={open} sx={{ m: 2 }}>
        Open Banner
      </Button>
    </div>
  );
};

export const Default: StoryObj<typeof Banner> = {
  render: () => <Banner />,
};
