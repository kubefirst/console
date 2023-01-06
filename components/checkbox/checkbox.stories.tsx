import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckboxComponent from './index';

export default {
  title: 'Form Elements/Checkbox',
  component: CheckboxComponent,
} as ComponentMeta<typeof CheckboxComponent>;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40px;
`;

const DefaultTemplate: ComponentStory<typeof CheckboxComponent> = () => (
  <Wrapper>
    <CheckboxComponent required />
  </Wrapper>
);

const CheckedTemplate: ComponentStory<typeof CheckboxComponent> = () => (
  <Wrapper>
    <CheckboxComponent checked />
  </Wrapper>
);

const DisabledTemplate: ComponentStory<typeof CheckboxComponent> = () => (
  <Wrapper>
    <CheckboxComponent disabled />
  </Wrapper>
);

export const Default = DefaultTemplate.bind({});

export const Checked = CheckedTemplate.bind({});

export const Disabled = DisabledTemplate.bind({});
