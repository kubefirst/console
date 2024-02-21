'use client';
import React, { FunctionComponent } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Button from '../Button/Button';
import useModal from '../../hooks/useModal';

import KubeConfigModal, { KubeConfigModalProps } from './KubeConfigModal';

const meta: Meta<typeof KubeConfigModal> = {
  component: KubeConfigModal,
};

export default meta;

const KubeConfigModalWithHooks: FunctionComponent<KubeConfigModalProps> = ({
  command,
  commandDocLink,
}) => {
  const { isOpen, openModal, closeModal } = useModal(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={openModal}>
        Open modal
      </Button>
      <KubeConfigModal
        isOpen={isOpen}
        onCloseModal={closeModal}
        onAcceptance={closeModal}
        command={command}
        commandDocLink={commandDocLink}
      />
    </>
  );
};

export const Default: StoryObj<typeof KubeConfigModal> = {
  args: {
    command:
      'gcloud container clusters get-credentials NAME [--internal-ip] [--location=LOCATION     | --region=REGION     | --zone=ZONE, -z ZONE] [GCLOUD_WIDE_FLAG …]',
    commandDocLink:
      'https://cloud.google.com/sdk/gcloud/reference/container/clusters/get-credentials',
  },
  render: (args) => <KubeConfigModalWithHooks {...args} />,
};
