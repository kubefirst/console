import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Control, Controller, UseControllerProps, FieldValues } from 'react-hook-form';

import { Container, InfoIcon } from './ControlledRadioGroup.styled';

import Typography from '@/components/Typography/Typography';
import { VOLCANIC_SAND } from '@/constants/colors';
import Row from '@/components/Row/Row';
import Tooltip from '@/components/Tooltip/Tooltip';

export type RadioOptionsType = Array<{
  label: string;
  value: string;
  isDisabled?: boolean;
  tooltipInfo?: string;
  tag?: React.ReactNode;
}>;

export interface ControlledRadioGroupProps<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  required?: boolean;
  rules: {
    required: boolean;
    pattern?: RegExp;
  };
  options: RadioOptionsType;
  onChange?: (value: string) => void;
  inLine?: boolean;
}

function ControlledRadioGroup<T extends FieldValues>({
  defaultValue,
  inLine = false,
  name,
  options,
  onChange,
  required,
  ...props
}: ControlledRadioGroupProps<T>) {
  return (
    <Controller
      {...props}
      name={name}
      render={({ field }) => (
        <RadioGroup
          defaultValue={defaultValue}
          name={name}
          sx={{ display: 'flex', flexDirection: inLine ? 'row' : 'column' }}
        >
          {options.map(({ label, isDisabled = false, tag: Tag, value, tooltipInfo }) => (
            <FormControlLabel
              key={label}
              value={value}
              control={
                <Radio
                  {...field}
                  name={name}
                  required={required}
                  inputRef={field.ref}
                  value={value}
                  disabled={isDisabled}
                  onChange={(e) => {
                    onChange && onChange(e.target.value);
                    field.onChange(e);
                  }}
                />
              }
              label={
                <Container>
                  <Typography
                    variant="body2"
                    color={VOLCANIC_SAND}
                    sx={
                      Tag
                        ? {
                            alignItems: 'center',
                            cursor: 'pointer',
                            display: 'flex',
                            gap: 2,
                          }
                        : undefined
                    }
                  >
                    {label}
                    {Tag}
                  </Typography>
                  {tooltipInfo && (
                    <Tooltip placement="top" title={tooltipInfo} maxWidth="280px" whiteSpace="wrap">
                      <Row style={{ alignItems: 'center' }}>
                        <InfoIcon />
                      </Row>
                    </Tooltip>
                  )}
                </Container>
              }
            />
          ))}
        </RadioGroup>
      )}
    />
  );
}

export default ControlledRadioGroup;
