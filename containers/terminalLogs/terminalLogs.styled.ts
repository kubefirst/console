'use client';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

import { media } from '@/utils/media';
import Column from '@/components/Column/Column';

export const Container = styled.div`
  align-items: flex-start;
  background: #1e293b;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  position: relative;
  min-height: 551px;
  width: calc(100% - 30px);
`;

export const Search = styled.div`
  align-items: center;
  border-radius: 4px;
  display: flex;
  background: ${({ theme }) => theme.colors.libertyBlue};
  gap: 10px;
  margin-right: 16px;
  padding-left: 10px;
  width: 271px;

  & > svg {
    cursor: pointer;
  }
`;

export const SearchTextField = styled(TextField)`
  input {
    color: #dcdef3;
    background: ${({ theme }) => theme.colors.libertyBlue};
    border-radius: 4px;
    height: 20px;
    padding: 6px 16px 6px 0;
  }

  fieldset {
    border: none;
  }
`;

export const TerminalView = styled.div`
  font-family: 'Roboto Mono' !important;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: 18px !important;
  height: 464px;

  & > div {
    border-radius: 4px;
    height: 100%;
    padding: 16px;
  }

  & .xterm-helper-textarea {
    display: none;
  }

  & .xterm .xterm-viewport {
    border-radius: 4px;
  }

  & .xterm-screen {
    height: 100% !important;
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: scroll;
  }

  & span:not([class]) {
    color: white;
  }
`;

export const Tools = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;

  & svg {
    cursor: pointer;
  }
`;

export const TerminalHead = styled(Column)`
  justify-content: space-between;
  width: 100%;

  ${media.greaterThan('sm')`
    flex-direction: row;
  `}
`;
