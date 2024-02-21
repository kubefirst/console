import { styled as muiStyled } from '@mui/material';
import styled from 'styled-components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { PRIMARY, ROCK_BLUE } from '@/constants/colors';
import Row from '@/components/Row/Row';

export const Container = styled(Row)`
  align-items: center;
  gap: 8px;
`;

export const InfoIcon = muiStyled(InfoOutlinedIcon)(() => ({
  'height': '18px',
  'width': '18px',
  'fill': ROCK_BLUE,
  '&:hover': {
    fill: PRIMARY,
  },
}));
