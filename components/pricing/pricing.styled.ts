import styled from 'styled-components';

import Column from '../Column/Column';

export const Container = styled.div<{ isActive?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.pastelLightBlue};
  border-radius: 12px;
  height: 650px;
  padding: 24px;
  width: 219px;

  ${({ isActive, theme }) =>
    isActive &&
    `
    border: 4px solid ${theme.colors.primary};
  `}
`;

export const Features = styled(Column)``;

export const PriceImage = styled.img`
  object-fit: cover;
`;
