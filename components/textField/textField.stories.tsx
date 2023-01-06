import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import TextFieldComponent from './index';

export default {
  title: 'Form Elements/TextField',
  component: TextFieldComponent,
} as ComponentMeta<typeof TextFieldComponent>;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
`;

const DefaultTemplate: ComponentStory<typeof TextFieldComponent> = () => (
  <Wrapper>
    <TextFieldComponent variant="outlined" label="Default" />
  </Wrapper>
);

const OutlinedTemplate: ComponentStory<typeof TextFieldComponent> = () => (
  <Wrapper>
    <TextFieldComponent variant="outlined" label="Outlined" />
  </Wrapper>
);

const DisabledTemplate: ComponentStory<typeof TextFieldComponent> = () => (
  <Wrapper>
    <TextFieldComponent variant="outlined" color="primary" label="Disabled" disabled value="Text" />
  </Wrapper>
);

const PasswordTemplate: ComponentStory<typeof TextFieldComponent> = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Wrapper>
      <FormControl size="small" variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    </Wrapper>
  );
};

const ErrorTemplate: ComponentStory<typeof TextFieldComponent> = () => (
  <Wrapper>
    <TextFieldComponent
      error
      id="standard-error-helper-text"
      label="Label *"
      defaultValue="Hello World"
      helperText="Incorrect entry."
      variant="standard"
    />
  </Wrapper>
);

export const Default = DefaultTemplate.bind({});

export const Outlined = OutlinedTemplate.bind({});

export const Disabled = DisabledTemplate.bind({});

export const Password = PasswordTemplate.bind({});

export const Error = ErrorTemplate.bind({});
