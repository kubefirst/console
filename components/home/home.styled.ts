import styled from 'styled-components';

import { media } from '../../theme/media';
import RayImage from '../../assets/k-ray.svg';

export const Container = styled.div`
  height: calc(100% - 60px);
  padding: 30px 0 30px 60px;
  overflow: auto;
  width: 100%;

  ${media.lessThan('sm')`
    padding: 30px 0 0 20px;
  `};
`;

export const Content = styled.div<{ isLocal: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  height: calc(100% - 150px);
  justify-content: center;
  margin: 0 auto;
  overflow: auto;
  max-width: ${({ isLocal }) => (isLocal ? '1250px' : '1450px')};

  ${media.lessThan('sm')`
    height: calc(100% - 30px);
  `};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Template = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const Ray = styled.img.attrs({ src: RayImage })`
  height: 500px;

  ${media.lessThan('sm')`
    display: none;
  `}
`;
