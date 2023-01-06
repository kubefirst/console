import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Progress from './';

export default {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    steps: [],
  },
} as ComponentMeta<typeof Progress>;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const DefaultTemplate: ComponentStory<typeof Progress> = (args) => (
  <Wrapper>
    <Progress {...args} />
  </Wrapper>
);

export const Default = DefaultTemplate.bind({});
Default.args = {
  steps: ['Select platform', 'Readiness check', 'Set up cluster', 'Preparing', 'Ready'],
  activeStep: 0,
};
