'use client';
import styled from 'styled-components';

import Row from '../Row/Row';
import { DANGER } from '../../constants/colors';

export const Asterisk = styled.span`
  color: ${DANGER};
`;

export const InputContainer = styled(Row)`
  flex: 1;
`;

export const LabelContainer = styled(Row)`
  gap: 5px;
`;

export const NumInput = styled.input`
  /* Remove native number input up/down selectors for all browsers */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Remove native number input up/down selectors for firefox */
  -moz-appearance: textfield;
  width: 100%;
  text-align: end;
  padding-right: 10px;
  border: 1px solid #e4e4e7;
  color: #3f3f46;
`;

export const Root = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  font-size: 14px;
  color: #71717a;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 36px;
    border: 1px solid #e4e4e7;
    background-color: white;
    cursor: pointer;

    &:first-child {
      border-radius: 4px 0 0 4px;
      border-right: none;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
      border-left: none;
    }
  }
`;
