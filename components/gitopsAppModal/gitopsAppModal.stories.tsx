import React from 'react';
import { useForm } from 'react-hook-form';
import { Meta, StoryObj } from '@storybook/react';

import useModal from '../../hooks/useModal';
import Button from '../Button/Button';
import { noop } from '../../utils/noop';
import { mockGitopsCatalogApp } from '../../tests/mocks/mockGitopsCatalogApp';

import GitopsAppModal from './GitopsAppModal';

const meta: Meta<typeof GitopsAppModal> = {
  component: GitopsAppModal,
};

export default meta;

const GitopsAppModalWithHooks = () => {
  const { isOpen, openModal, closeModal } = useModal(true);

  const {
    control,
    formState: { isValid },
  } = useForm();

  return (
    <div>
      <GitopsAppModal
        control={control}
        isOpen={isOpen}
        isValid={isValid}
        closeModal={closeModal}
        onSubmit={noop}
        {...mockGitopsCatalogApp}
      />
      <Button color="primary" onClick={openModal}>
        Open Modal
      </Button>
    </div>
  );
};

export const Default: StoryObj<typeof GitopsAppModal> = {
  render: () => <GitopsAppModalWithHooks />,
};
