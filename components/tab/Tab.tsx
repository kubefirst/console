import React, { FunctionComponent, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import MuiTab, { tabClasses } from '@mui/material/Tab';

import { TabContainer } from './Tab.styled';

import { ECHO_BLUE } from '@/constants/colors';

interface TabPanelProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const a11yProps = (index: number) => {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const Tab = styled((props: { color?: string; label: string | ReactNode }) => (
  <MuiTab disableRipple {...props} />
))(({ theme, color }) => ({
  ...theme.typography.labelMedium,
  color: color || ECHO_BLUE,
  padding: 0,
  minWidth: 'auto',
  marginRight: '12px',
  [`&.${tabClasses.selected}`]: {
    color: color || theme.palette.secondary.main,
  },
}));

const TabPanel: FunctionComponent<TabPanelProps> = ({
  backgroundColor,
  children,
  value,
  index,
  ...other
}) => (
  <TabContainer
    backgroundColor={backgroundColor}
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    sx={{ visibility: value === index ? 'visible' : 'hidden' }}
    {...other}
  >
    {children}
  </TabContainer>
);

export default TabPanel;
