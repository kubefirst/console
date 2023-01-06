import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  height: 40px;
  width: calc(100% - 50px);
  border-radius: 0px;
  padding: 12px 24px 12px 24px;
`;

export const Title = styled.div`
  margin: 40px auto;
`;

export const Card = styled.div<{ isActive: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 10px;

  width: 500px;
  height: 116px;

  border: 1px solid #e2e8f0;
  border-radius: 12px;

  ${({ theme, isActive }) =>
    isActive &&
    `
      border: 2px solid ${theme.colors.primary};
  `}
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  height: calc(100vh - 375px);
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardDescription = styled.div<{ isActive?: boolean }>`
  color: ${({ theme }) => theme.colors.saltboxBlue};
  max-width: 394px;
  letter-spacing: 0 !important;

  ${({ isActive }) =>
    isActive &&
    `
    color: #3f3f46;
  
  `}
`;

export const CartTitle = styled.div``;

export const InfoContainer = styled.div``;

export const CardInfo = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-sizing: border-box;
  height: 228px;
  padding: 24px;
  width: 500px;
`;

export const CardInfoHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Code = styled.div`
  align-items: center;
  background: #f1f5f9;
  border-radius: 4px;
  color: #3f3f46;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-family: Roboto Mono;
  height: 20px;
  padding: 10px 16px;
  margin-top: 16px;
  width: 416px;

  & svg {
    color: #94a3b8;
  }
`;

export const CardLink = styled(Link)`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  gap: 8px;
  margin-top: 24px;
`;

export const Footer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0px;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  height: 64px;
  padding: 0 80px;
  width: calc(100% - 160px);

  & button {
    text-transform: capitalize;
  }
`;
