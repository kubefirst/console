import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import useModal from '../../hooks/useModal';
import Button from '../Button/Button';

import UpgradeModalComponent from './UpgradeModal';

const meta: Meta<typeof UpgradeModal> = {
  component: UpgradeModalComponent,
};

export default meta;

const UpgradeModal = () => {
  const { isOpen, openModal, closeModal } = useModal(true);
  return (
    <div>
      <UpgradeModalComponent
        isOpen={isOpen}
        closeModal={closeModal}
        clusterLimitText="You’ve reached the 10 physical clusters limit."
        clusterLimitDescription="Upgrade to an Enterprise plan to provision the number of clusters you need."
        ctaText="Contact us to upgrade"
      />
      <Button color="primary" variant="contained" onClick={openModal}>
        Open Modal
      </Button>
    </div>
  );
};

export const Default: StoryObj<typeof UpgradeModal> = {
  render: () => <UpgradeModal />,
};
