import { styled } from 'styled-components';

import FormContainerComponent from '@/components/FormContainer/FormContainer';

export const FormContainer = styled(FormContainerComponent)<{ hasMargin: boolean }>`
  border-radius: 8px;
  width: auto;

  ${({ hasMargin }) =>
    hasMargin &&
    `
      &:last-child {
        margin-top: 32px;
      }
  `}
`;

export const BottomFormContainer = styled(FormContainer)<{ hasMargin: boolean }>`
  align-items: center;
  border-radius: 0 0 8px 8px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;

  & > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

export const UList = styled.ul`
  padding-left: 20px;
`;

export const CancelContainer = styled.div`
  align-items: flex-start;
  background: #fff7ed;
  border: 1px solid #ffedd5;
  border-radius: 4px;
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  padding: 16px;
`;
