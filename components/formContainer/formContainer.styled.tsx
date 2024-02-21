import styled from 'styled-components';

import Column from '../Column/Column';

export const Container = styled(Column)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1);
`;

export const FormContent = styled(Column)`
  padding: 24px;
`;
