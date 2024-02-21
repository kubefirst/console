import Column from '../../../components/Column/Column';
import Button from '../../../components/Button/Button';

import styled, { css } from '@/app/lib/styled-components';

export const AdvancedOptionsButton = styled.button.attrs({ type: 'button' })<{
  expanded?: boolean;
}>`
  border: none;
  background-color: transparent;
  display: flex;
  cursor: pointer;

  svg {
    transition: transform 0.4s ease;
  }

  ${({ expanded }) =>
    expanded &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `}
`;

export const Container = styled(Column)`
  gap: 32px;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  width: 163px;
  margin-top: -8px;
  display: flex;
  gap: 8px;

  svg {
    height: 20px;
    width: 20px;
  }
`;
