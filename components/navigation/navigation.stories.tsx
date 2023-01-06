import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Navigation from './index';

export default {
  title: 'Layout/Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 60px);
`;

const DefaultTemplate: ComponentStory<typeof Navigation> = () => (
  <Wrapper>
    <Navigation />
  </Wrapper>
);

const CollapsibleTemplate: ComponentStory<typeof Navigation> = () => (
  <Wrapper>
    <Navigation collapsible />
  </Wrapper>
);

export const Default = DefaultTemplate.bind({});
export const Collapsible = CollapsibleTemplate.bind({});
