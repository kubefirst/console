import React, { FunctionComponent } from 'react';
import CheckboxMUI, { CheckboxProps } from '@mui/material/Checkbox';

const Checkbox: FunctionComponent<CheckboxProps> = ({ ...props }) => {
  return <CheckboxMUI {...props} style={{ border: '1px' }} disableRipple />;
};

export default Checkbox;
