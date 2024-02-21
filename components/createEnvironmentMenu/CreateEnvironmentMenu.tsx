import React, { ComponentPropsWithoutRef, FormEvent, FunctionComponent, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import { SALTBOX_BLUE } from '../../constants/colors';
import { TagColor } from '../Tag/Tag';
import ControlledTextField from '../controlledFields/ControlledTextField/ControlledTextField';
import ControlledTagSelect from '../controlledFields/ControlledTagSelect/ControlledTagSelect';
import ControlledTextArea from '../controlledFields/ControlledTextArea/ControlledTextArea';
import { ClusterEnvironment } from '../../types/provision';
import { EnvMap } from '../../redux/slices/environments.slice';

import { CloseButton, Content, Footer, Header, Root } from './CreateEnvironmentMenu.styled';

const ENVIRONMENT_MENU_COLOR_OPTIONS: TagColor[] = [
  'gray',
  'cyan',
  'gold',
  'green',
  'light blue',
  'lime',
  'pink',
  'purple',
];

interface CreateEnvironmentMenuProps
  extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit' | 'key'> {
  onSubmit: (environment: ClusterEnvironment) => void;
  onClose: () => void;
  previouslyCreatedEnvironments?: EnvMap;
  errorMessage?: string;
  onErrorClose?: () => void;
}

export const CreateEnvironmentMenu: FunctionComponent<CreateEnvironmentMenuProps> = ({
  onSubmit,
  onClose,
  previouslyCreatedEnvironments = {},
  errorMessage,
  onErrorClose,
  ...rest
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ClusterEnvironment>({ mode: 'onBlur', defaultValues: { color: 'gray' } });

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      // stop propogation of form event because this form is
      // "nested" in the create workload cluster menu
      e.stopPropagation();
      handleSubmit(onSubmit)(e);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <Root {...rest} onSubmit={handleFormSubmit}>
      <Header>
        <Typography variant="h6">Create new environment</Typography>
        <CloseButton type="button" onClick={onClose}>
          <CloseIcon style={{ margin: 0, color: SALTBOX_BLUE }} />
        </CloseButton>
      </Header>
      <Content>
        {errorMessage && (
          <Alert variant="filled" severity="error" onClose={onErrorClose}>
            {errorMessage}
          </Alert>
        )}
        <ControlledTextField
          name="name"
          label="Environment name"
          required
          rules={{
            required: 'Environment name is required',
            maxLength: {
              value: 80,
              message: 'Max 80 characters permitted',
            },
            validate: (name) =>
              (name && !previouslyCreatedEnvironments[name]) || 'Environment name must be unique',
          }}
          control={control}
          onErrorText={errors.name?.message}
        />
        <ControlledTextArea
          name="description"
          label="Description"
          control={control}
          rules={{
            maxLength: {
              value: 280,
              message: 'Max 280 characters permitted',
            },
          }}
          onErrorText={errors.description?.message}
        />
        <div style={{ width: '290px' }}>
          <ControlledTagSelect
            name="color"
            label="Label color"
            required
            rules={{ required: 'Label color is required' }}
            options={ENVIRONMENT_MENU_COLOR_OPTIONS}
            control={control}
            onErrorText={errors.color?.message as string}
          />
        </div>
      </Content>
      <Footer>
        <Button type="button" color="text" variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" variant="contained" disabled={!isValid}>
          Create environment
        </Button>
      </Footer>
    </Root>
  );
};
