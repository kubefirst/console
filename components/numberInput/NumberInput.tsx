'use client';
import React, { ComponentPropsWithoutRef, InputHTMLAttributes, useState, forwardRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import removeIconSrc from '../../assets/remove.svg';
import addIconSrc from '../../assets/add.svg';
import { noop } from '../../utils/noop';
import Typography from '../Typography/Typography';
import { EXCLUSIVE_PLUM } from '../../constants/colors';

import { Root, NumInput, InputContainer, LabelContainer, Asterisk } from './NumberInput.styled';

export interface NumberInputProps
  extends Omit<ComponentPropsWithoutRef<'label'>, 'onChange' | 'key'> {
  label?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: number) => void;
}

const NumberInput = forwardRef<HTMLLabelElement | null, NumberInputProps>(function NumberInput(
  { label, onChange = noop, inputProps = {}, ...rest },
  ref,
) {
  const [value, setValue] = useState(Number(inputProps.defaultValue ?? 0));
  return (
    <Root {...rest} ref={ref}>
      {label && (
        <LabelContainer>
          <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
            {label}
          </Typography>
          {inputProps.required && <Asterisk>*</Asterisk>}
        </LabelContainer>
      )}
      <InputContainer>
        <button
          type="button"
          onClick={() => {
            const curValue = value - 1;
            setValue(curValue);
            onChange(curValue);
          }}
          disabled={value === inputProps.min || inputProps.disabled}
        >
          <Image src={removeIconSrc} alt="remove" width={20} height={20} />
        </button>
        <NumInput {...inputProps} type="number" value={value} readOnly />
        <button
          type="button"
          onClick={() => {
            const curValue = value + 1;
            setValue(curValue);
            onChange(curValue);
          }}
          disabled={inputProps.disabled}
        >
          <Image src={addIconSrc} alt="add" width={20} height={20} />
        </button>
      </InputContainer>
    </Root>
  );
});

export default styled(NumberInput)``;
