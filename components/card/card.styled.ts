import NextImage from 'next/image';
import styled from 'styled-components';

import Text from '../text';
import ThreeDotsIcon from '../../assets/dots.svg';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0px 1px 4px 1px darkgrey;
  cursor: default;
  display: flex;
  flex-direction: column;
  height: 260px;
  justify-content: space-between;
  margin: 2px;
  padding: 16px;
  width: 300px;
  z-index: 2;
`;

export const CardContent = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 10px;

  & > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

export const Column = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width && `${width}%`};
`;

export const Image = styled(NextImage)`
  height: 100px;
  object-fit: contain;
  width: 68px;
`;

export const Link = styled.a`
  align-items: center;
  cursor: pointer;
  display: flex;
  text-decoration: none;
  text-transform: lowercase;

  & span {
    color: ${({ theme }) => theme.colors.jordyBlue};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > svg {
    color: ${({ theme }) => theme.colors.jordyBlue};
    margin-left: 5px;
  }

  &:hover > span,
  &:hover > svg {
    color: ${({ theme }) => theme.colors.americanBlue};
  }
`;

export const Tags = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

export const TextHeader = styled.div`
  align-items: baseline;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const ThreeDots = styled.img.attrs({ src: ThreeDotsIcon })`
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 10px;
`;

export const UserName = styled(Text)`
  margin-top: 5px;
`;

export const PopoverContainer = styled.div`
  flex-direction: row !important;
`;
