import React, { FunctionComponent } from 'react';
import InputLabel from '@mui/material/InputLabel';
import SelectMUI, { SelectProps } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';

import Typography from '../Typography/Typography';
import { Required } from '../TextField/TextField.styled';
import Tag, { TagColor } from '../Tag/Tag';
import { StyledFormHelperText } from '../TextArea/TextArea.styled';

import { Container, Input } from './Select.styled';

import { DOLPHIN, LIGHT_GREY } from '@/constants/colors';

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
      color: `${DOLPHIN}`,
      marginTop: '4px',
      border: `1px solid ${LIGHT_GREY}`,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.04)',
      borderRadius: '4px',
    },
  },
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
      {label && (
        <InputLabel sx={{ marginBottom: '8px' }}>
          <Typography variant="labelLarge" sx={{ display: 'flex', gap: '4px' }}>
            {label} {required && <Required>*</Required>}
          </Typography>
        </InputLabel>
      )}
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

export interface ISelectProps extends SelectProps<string> {
  options: Array<{ value: string | number; label: string }>;
  className?: string;
}

const Select: FunctionComponent<ISelectProps> = ({
  label,
  required,
  placeholder,
  options,
  className,
  ...props
}) => (
  <Container className={className}>
    {label && (
      <InputLabel sx={{ marginBottom: '8px' }}>
        <Typography variant="labelLarge" sx={{ display: 'flex', gap: '4px' }}>
          {label} {required && <Required>*</Required>}
        </Typography>
      </InputLabel>
    )}
    <SelectMUI
      {...props}
      IconComponent={KeyboardArrowDownIcon}
      fullWidth
      required={required}
      input={<Input sx={{ height: '36px' }} />}
      MenuProps={MenuProps}
      displayEmpty
      renderValue={(selected: string) => {
        if (!selected) {
          return (
            <Typography variant="body2" color={DOLPHIN}>
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

export default SelectWithRef;
