import React, { FunctionComponent } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
import SelectMUI, { SelectProps } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';

import Typography from '../typography';
import { Required } from '../textField/textField.styled';
import Tag, { TagColor } from '../tag';
import { LIGHT_GREY, LINK_WATER, ROYAL_PURPLE, VOLCANIC_SAND } from '../../constants/colors';
import { StyledFormHelperText } from '../textArea/textArea.styled';
import Row from '../row';
import { ClusterEnvironment } from '../../types/provision';

import { Container } from './select.styled';

export interface ISelectProps extends SelectProps<string> {
  options: Array<{ value: string | number; label: string }>;
}

const MenuProps = {
  PaperProps: {
    sx: {
      '& .MuiMenu-list': {
        padding: 0,
      },
      '& .MuiMenuItem-root': {
        height: '40px',
        padding: '10px 16px',
      },
    },
    style: {
      backgroundColor: 'white',
      color: `${VOLCANIC_SAND}`,
      marginTop: '4px',
      border: `1px solid ${LIGHT_GREY}`,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.04)',
      borderRadius: '4px',
    },
  },
};

export const Input = styled(InputBase)(({ theme, error }) => ({
  '& .MuiInputBase-input': {
    'borderRadius': 4,
    'border': `1px solid ${error ? theme.palette.error.main : LINK_WATER}`,
    'fontSize': 14,
    'lineHeight': '20px',
    'letterSpacing': '0.25px',
    'padding': '8px 12px',
    'width': '100%',
    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

interface EnvironmentSelectProps extends SelectProps<ClusterEnvironment> {
  options?: ClusterEnvironment[];
  helperText?: string;
  error?: boolean;
  onAddNewEnvironment: () => void;
}

const EnvironmentSelect: FunctionComponent<EnvironmentSelectProps> = ({
  label,
  required,
  options = [],
  helperText,
  error,
  onAddNewEnvironment,
  ...props
}) => {
  return (
    <Container>
      <InputLabel sx={{ marginBottom: '8px' }}>
        <Typography variant="labelLarge" sx={{ display: 'flex', gap: '4px' }}>
          {label} {required && <Required>*</Required>}
        </Typography>
      </InputLabel>
      <SelectMUI
        {...props}
        IconComponent={KeyboardArrowDownIcon}
        fullWidth
        required={required}
        input={<Input error={error} sx={{ height: '36px' }} />}
        MenuProps={MenuProps}
        displayEmpty
        sx={{ width: '100%' }}
        renderValue={(value) => {
          if (value) {
            return <Tag text={value.name} bgColor={value.color} />;
          }
          if (props.value) {
            return <Tag text={props.value.name} bgColor={props.value.color} />;
          }
        }}
      >
        <MenuItem disableRipple onClick={onAddNewEnvironment}>
          <Row style={{ gap: '4px', alignItems: 'center' }}>
            <AddIcon sx={{ height: 20, width: 20, color: ROYAL_PURPLE }} />
            <Typography variant="body3" sx={{ color: ROYAL_PURPLE }}>
              New environment
            </Typography>
          </Row>
        </MenuItem>
        {options.map((option) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          <MenuItem key={option.environmentName} value={option} disableRipple>
            <Tag text={option.name} bgColor={option.color} />
          </MenuItem>
        ))}
      </SelectMUI>
      {helperText && <StyledFormHelperText error={error}>{helperText}</StyledFormHelperText>}
    </Container>
  );
};

interface TagSelectProps extends Omit<SelectProps<TagColor>, 'key'> {
  options: readonly string[];
  helperText?: string;
  error?: boolean;
}

const TagSelect: FunctionComponent<TagSelectProps> = ({
  label,
  required,
  options,
  helperText,
  error,
  ...props
}) => {
  return (
    <Container>
      <InputLabel sx={{ marginBottom: '8px' }}>
        <Typography variant="labelLarge" sx={{ display: 'flex', gap: '4px' }}>
          {label} {required && <Required>*</Required>}
        </Typography>
      </InputLabel>
      <SelectMUI
        {...props}
        IconComponent={KeyboardArrowDownIcon}
        fullWidth
        required={required}
        input={<Input error={error} sx={{ height: '36px' }} />}
        MenuProps={MenuProps}
        displayEmpty
        sx={{ width: '100%' }}
        renderValue={(selected) => {
          if (selected) {
            return <Tag text={selected} bgColor={selected} />;
          }
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option} disableRipple>
            <Tag text={option} bgColor={option as TagColor} />
          </MenuItem>
        ))}
      </SelectMUI>
      {helperText && <StyledFormHelperText error={error}>{helperText}</StyledFormHelperText>}
    </Container>
  );
};

const Select: FunctionComponent<ISelectProps> = ({
  label,
  required,
  placeholder,
  options,
  ...props
}) => (
  <Container>
    <InputLabel sx={{ marginBottom: '8px' }}>
      <Typography variant="labelLarge" sx={{ display: 'flex', gap: '4px' }}>
        {label} {required && <Required>*</Required>}
      </Typography>
    </InputLabel>
    <SelectMUI
      {...props}
      IconComponent={KeyboardArrowDownIcon}
      fullWidth
      required={required}
      input={<Input sx={{ height: '36px' }} />}
      MenuProps={MenuProps}
      displayEmpty
      sx={{ mb: '24px', width: '100%' }}
      renderValue={(selected: string) => {
        if (!selected) {
          return (
            <Typography variant="body2" color={VOLCANIC_SAND}>
              {placeholder || 'Select'}
            </Typography>
          );
        }

        return selected;
      }}
    >
      {options.map(({ label, value }) => (
        <MenuItem key={label} value={value} disableRipple>
          <Typography variant="body2">{label}</Typography>
        </MenuItem>
      ))}
    </SelectMUI>
  </Container>
);

const SelectWithRef = React.forwardRef<unknown, ISelectProps>((props, ref) => {
  return <Select inputRef={ref} {...props} />;
});

export const TagSelectWithRef = React.forwardRef<unknown, TagSelectProps>((props, ref) => {
  return <TagSelect inputRef={ref} {...props} />;
});

export const EnvironmentSelectWithRef = React.forwardRef<unknown, EnvironmentSelectProps>(
  (props, ref) => {
    return <EnvironmentSelect inputRef={ref} {...props} />;
  },
);

export default SelectWithRef;
