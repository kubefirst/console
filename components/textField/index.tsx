import React, { FunctionComponent } from 'react';
import TextFieldMUI, { TextFieldProps } from '@mui/material/TextField';

const TextField: FunctionComponent<TextFieldProps> = ({ ...props }) => {
  return <TextFieldMUI {...props} size="small" />;
};

export default TextField;
