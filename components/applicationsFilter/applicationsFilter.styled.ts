import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';

import Column from '../Column/Column';
import Autocomplete from '../Autocomplete/Autocomplete';
import Row from '../Row/Row';

import { PASTEL_LIGHT_BLUE, WHITE } from '@/constants/colors';
import { media } from '@/utils/media';

export const Container = styled(Column)`
  padding: 24px;
  background-color: ${WHITE};
  border: 1px solid ${PASTEL_LIGHT_BLUE};
  border-radius: 8px;
`;

export const Content = styled(Column)`
  gap: 16px;
  width: fit-content;
  align-items: flex-end;

  ${media.greaterThan('md')`
    flex-direction: row;
    width: unset;
    justify-content: space-between;
  `}
`;

export const DropdownContainer = styled(Column)`
  align-items: flex-end;
  justify-content: end;
  width: fit-content;
  gap: 16px;

  ${media.greaterThan('md')`
    flex-direction: row;
  `}
`;

export const TargetContainer = styled(Row)`
  gap: 8px;
  align-items: center;
`;

export const StyledAutoComplete = muiStyled(Autocomplete)(() => ({
  'width': '248px',
  'height': '36px',
  '& .MuiAutocomplete-popupIndicator': { transform: 'none' },
}));
