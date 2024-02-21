'use client';
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import Button from '../Button/Button';
import useModal from '../../hooks/useModal';

import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
`;

const Content = styled.div`
  height: 400px;
  width: 100%;
`;

const ModalWithHooks = () => {
  const { isOpen, openModal, closeModal } = useModal(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={openModal}>
        Open modal
      </Button>
      <Wrapper>
        <Modal isOpen={isOpen} onCloseModal={closeModal}>
          <Content>
            <span>This is a modal</span>
          </Content>
        </Modal>
      </Wrapper>
    </>
  );
};

export const Default: StoryObj<typeof Modal> = {
  render: () => <ModalWithHooks />,
};
