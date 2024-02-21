import styled from 'styled-components';

import Row from '@/components/Row/Row';

export const AvailabilityIdicator = styled.div`
  border-radius: 50%;
  background-color: ${({ color }) => color};
  height: 8px;
  width: 8px;
`;

export const Container = styled(Row)`
  gap: 8px;
  align-items: center;
  height: 24px;
`;
