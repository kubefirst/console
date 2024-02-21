import React, { FunctionComponent } from 'react';
import InputLabel from '@mui/material/InputLabel';
import { TextareaAutosizeProps } from '@mui/base/TextareaAutosize';
import { SxProps } from '@mui/material';

import { Required } from '../TextField/TextField.styled';

import {
  Container,
  StyledErrorIcon,
  StyledFormHelperText,
  StyledLabel,
  StyledTextArea,
  TextAreaContainer,
} from './TextArea.styled';

interface TextAreaProps extends TextareaAutosizeProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  textAreaStyleOverrides?: React.CSSProperties;
  hideValue?: boolean;
  sx?: SxProps;
}

export const TextArea: FunctionComponent<TextAreaProps> = ({
  label,
  helperText,
  error,
  required,
  textAreaStyleOverrides,
  ...rest
}) => {
  return (
    <Container>
      {label && (
        <InputLabel>
          <StyledLabel variant="labelLarge">
            {label} {required && <Required>*</Required>}
          </StyledLabel>
        </InputLabel>
      )}
      <TextAreaContainer>
        <StyledTextArea error={error} {...rest} style={textAreaStyleOverrides} />
        {error && <StyledErrorIcon color="error" fontSize="small" />}
      </TextAreaContainer>

      {helperText && <StyledFormHelperText error={error}>{helperText}</StyledFormHelperText>}
    </Container>
  );
};

const TextAreaWithRef = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  return <TextArea ref={ref} {...props} />;
});

export default TextAreaWithRef;
