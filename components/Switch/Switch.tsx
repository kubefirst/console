import React, { FunctionComponent } from 'react';
import SwitchMui, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

import { PRIMARY } from '@/constants/colors';

interface CustomSwitchProps extends Omit<SwitchProps, 'key' | 'onChange'> {
  onChange: (checked: boolean) => void;
}

const CustomSwitch = styled(({ onChange, ...rest }: CustomSwitchProps) => (
  <SwitchMui
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...rest}
    onChange={(e) => onChange(e.target.checked)}
  />
))(({ theme }) => ({
  'width': 44,
  'height': 22,
  'padding': 0,
  '& .MuiSwitch-switchBase': {
    'padding': 0,
    'margin': 2,
    'transitionDuration': '300ms',
    '&.Mui-checked': {
      'transform': 'translateX(22px)',
      'color': '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: PRIMARY,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: PRIMARY,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 16,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Switch: FunctionComponent<CustomSwitchProps> = (props) => {
  return <CustomSwitch {...props} />;
};

export default Switch;
