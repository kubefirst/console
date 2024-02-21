import styled from 'styled-components';
import Image from 'next/image';

import Column from '../Column/Column';
import Row from '../Row/Row';

export const CardContent = styled(Column)`
  align-items: center;
  padding: 32px 24px;
`;

export const CardFooter = styled(Row)`
  justify-content: center;
  gap: 16px;
  padding: 16px 0;
  border-top: 1px solid #e6e8f0;
`;

export const Content = styled(Column)`
  width: 100%;
`;

export const K1Ray = styled(Image)`
  height: 162px;
  width: 192px;
  margin: 24px 0;
`;
