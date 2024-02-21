'use client';
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Joyride, { Step } from 'react-joyride';
import styled from 'styled-components';
import Image from 'next/image';

import Button from '../Button/Button';
import useModal from '../../hooks/useModal';

import TourModal from './TourModal';

import kubefirstRay from '@/assets/ray.svg';

const meta: Meta<typeof TourModal> = {
  component: TourModal,
};

export default meta;

export const K1Ray = styled(Image).attrs({
  src: kubefirstRay,
  alt: 'Kubefirst k ray',
})`
  height: 162px;
  width: 192px;
  margin: 24px 0;
  border: 1px dashed blue;
`;

const TourModalWithHooks = () => {
  const { isOpen, openModal, closeModal } = useModal(false);
  const [startTour, setStartTour] = useState(false);
  const [steps] = useState<Step[]>([
    {
      target: '.kray',
      content: 'My awesome first step',
      disableBeacon: true,
    },
    {
      target: '.other',
      content: 'My awesome second step',
      disableBeacon: true,
    },
    {
      target: '#button',
      content: 'check out this button',
      disableBeacon: true,
      spotlightPadding: 20,
    },
  ]);

  return (
    <div style={{ width: '100%', height: '100%', border: '1px dashed purple' }}>
      <Joyride steps={steps} run={startTour} />
      <Button variant="contained" color="primary" onClick={openModal} id="button">
        Open modal
      </Button>
      <TourModal
        isOpen={isOpen}
        onCloseModal={closeModal}
        onSkip={closeModal}
        onTakeTour={() => {
          closeModal();
          setStartTour(true);
        }}
        styleOverrides={{ width: '500px', padding: 0 }}
      />
    </div>
  );
};

export const Default: StoryObj<typeof TourModal> = {
  render: () => <TourModalWithHooks />,
};
