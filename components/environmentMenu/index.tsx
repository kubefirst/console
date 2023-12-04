import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

import Typography from '../typography';
import Button from '../button';
import { SALTBOX_BLUE } from '../../constants/colors';
import { TagColor } from '../tag';
import ControlledTextField from '../controlledFields/TextField';
import ControlledTagSelect from '../controlledFields/tagSelect';
import ControlledTextArea from '../controlledFields/textArea';
import { ClusterEnvironment } from '../../types/provision';
import { EnvMap } from '../../redux/slices/environments.slice';

import { CloseButton, Content, Footer, Header, Root } from './environmentMenu.styled';

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

interface EnvironmentMenuProps extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit' | 'key'> {
  onSubmit: (environment: ClusterEnvironment) => void;
  onClose: () => void;
  previouslyCreatedEnvironments?: EnvMap;
  errorMessage?: string;
  onErrorClose?: () => void;
  envToEdit?: ClusterEnvironment;
}

export const EnvironmentMenu: FunctionComponent<EnvironmentMenuProps> = ({
  onSubmit,
  onClose,
  previouslyCreatedEnvironments = {},
  errorMessage,
  onErrorClose,
  envToEdit,
  ...rest
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ClusterEnvironment>({
    mode: 'onBlur',
    defaultValues: envToEdit ?? { color: 'gray' },
  });

  return (
    <Root {...rest} onSubmit={handleSubmit(onSubmit)}>
      <Header>
        <Typography variant="h6">
          {envToEdit ? 'Edit Environment' : 'Create new environment'}
        </Typography>
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
          readOnly={!!envToEdit}
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
          {envToEdit ? 'Save' : 'Create environment'}
        </Button>
      </Footer>
    </Root>
  );
};
