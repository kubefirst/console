import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';

import Column from '../column';
import SelectWithRef from '../select';
import Autocomplete from '../autocomplete';
import Row from '../row';

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

  ${media.greaterThan('sm')`
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

  ${media.greaterThan('sm')`
    flex-direction: row;
  `}
`;

export const TargetContainer = styled(Row)`
  gap: 8px;
  align-items: center;
`;

export const TargetSelect = styled(SelectWithRef)`
  width: 248px;
  height: 36px;
`;

export const ClusterSelect = styled(TargetSelect)``;

export const StyledAutoComplete = muiStyled(Autocomplete)(() => ({
  'width': '248px',
  'height': '36px',
  '& .MuiAutocomplete-popupIndicator': { transform: 'none' },
}));
