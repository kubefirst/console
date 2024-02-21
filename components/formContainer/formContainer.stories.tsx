import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Row from '../Row/Row';
import LearnMore from '../LearnMore/LearnMore';

import FormContainer from './FormContainer';

import { LIGHT_GREY } from '@/constants/colors';

const meta: Meta<typeof FormContainer> = {
  component: FormContainer,
};

export default meta;

export const DefaultTemplate: StoryObj<typeof FormContainer> = {
  args: {
    style: { width: '90%', margin: '50px auto' },
  },
};

export const WithFooterContent: StoryObj<typeof FormContainer> = {
  args: {
    style: { width: '90%', margin: '50px auto' },
    footerContent: (
      <Row
        style={{
          borderTop: `1px solid ${LIGHT_GREY}`,
          padding: 20,
        }}
      >
        <LearnMore href="" linkTitle="configuring your cluster" description="Learn more about" />
      </Row>
    ),
  },
};
