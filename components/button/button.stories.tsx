import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './index';

export default {
  title: 'Form Elements/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
`;

const PrimaryTemplate: ComponentStory<typeof Button> = () => (
  <Wrapper>
    <Button variant="contained">Primary</Button>
  </Wrapper>
);

const SecondaryTemplate: ComponentStory<typeof Button> = () => (
  <Wrapper>
    <Button variant="outlined">Secondary</Button>
  </Wrapper>
);

const DangerTemplate: ComponentStory<typeof Button> = () => (
  <Wrapper>
    <Button variant="contained" color="error">
      Danger
    </Button>
  </Wrapper>
);

const DisabledTemplate: ComponentStory<typeof Button> = () => (
  <Wrapper>
    <Button variant="contained" disabled>
      Disabled
    </Button>
  </Wrapper>
);

export const Primary = PrimaryTemplate.bind({});
export const Secondary = SecondaryTemplate.bind({});
export const Danger = DangerTemplate.bind({});
export const Disabled = DisabledTemplate.bind({});
