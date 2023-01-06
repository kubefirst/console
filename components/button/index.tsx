import React, { FunctionComponent } from 'react';
import ButtonMUI from '@mui/material/Button';
import { ButtonProps } from '@mui/material';

const Button: FunctionComponent<ButtonProps> = ({ variant, color, ...rest }) => {
  return <ButtonMUI variant={variant} color={color} {...rest} />;
};

export default Button;
