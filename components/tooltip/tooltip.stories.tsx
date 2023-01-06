import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Typography from '../typography';
import Button from '../button';

import TooltipComponent from './index';

export default {
  title: 'Components/Tooltip',
  component: TooltipComponent,
} as ComponentMeta<typeof TooltipComponent>;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 150px;
`;

const DefaultTemplate: ComponentStory<typeof TooltipComponent> = () => (
  <Wrapper>
    <TooltipComponent title="This is a tooltip">
      <Button variant="contained">
        <Typography variant="body2">Hover here</Typography>
      </Button>
    </TooltipComponent>
  </Wrapper>
);

export const Default = DefaultTemplate.bind({});
