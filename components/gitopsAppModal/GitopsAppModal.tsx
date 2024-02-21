import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { Control } from 'react-hook-form';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import ControlledPassword from '../controlledFields/ControlledPassword';
import { GitOpsCatalogApp } from '../../types/applications';
import { BISCAY, SALTBOX_BLUE } from '../../constants/colors';
import ControlledTextField from '../controlledFields/ControlledTextField/ControlledTextField';

import { Container, Content, Close, Footer, Header } from './GitopsAppModal.styled';

export interface GitopsAppModalProps extends GitOpsCatalogApp {
  control: Control;
  isOpen: boolean;
  isValid: boolean;
  closeModal: () => void;
  onSubmit: (app: GitOpsCatalogApp) => void;
}

const GitopsAppModal: FunctionComponent<GitopsAppModalProps> = ({
  control,
  closeModal,
  isOpen,
  isValid,
  name,
  image_url,
  config_keys,
  secret_keys,
  onSubmit,
  ...rest
}) => {
  const handleSubmit = () => {
    onSubmit({ name, image_url, config_keys, secret_keys, ...rest });
  };

  return (
    <Modal isOpen={isOpen} padding={0}>
      <Container>
        <Header>
          <Image alt={name} src={image_url} width={30} height={30} />
          <Typography variant="h6" color={BISCAY}>
            {name}
          </Typography>
          <Close onClick={closeModal} htmlColor={SALTBOX_BLUE} fontSize="medium" />
        </Header>
        <Content>
          {secret_keys &&
            secret_keys.map(({ label, name }) => (
              <ControlledPassword
                key={label}
                control={control}
                name={name}
                label={label}
                rules={{
                  required: true,
                }}
                required
              />
            ))}

          {config_keys &&
            config_keys.map(({ label, name }) => (
              <ControlledTextField
                key={label}
                control={control}
                name={name}
                label={label}
                rules={{
                  required: true,
                }}
                required
              />
            ))}
        </Content>
        <Footer>
          <Button variant="text" color="text" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" disabled={!isValid} onClick={handleSubmit}>
            Add
          </Button>
        </Footer>
      </Container>
    </Modal>
  );
};

export default GitopsAppModal;
