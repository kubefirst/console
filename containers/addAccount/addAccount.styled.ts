import styled from 'styled-components';

import { LIGHT_GREY, WHITE } from '@/constants/colors';
import row from '@/components/row';

export const ButtonsContainer = styled.div`
  display: flex;
`;

export const Container = styled.form`
  padding: 20px 40px;
`;

export const Header = styled.div`
  margin-bottom: 32px;
`;

export const FormContainer = styled.div`
  background: ${WHITE};
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

export const InfoCard = styled.div`
  & > div {
    width: 100%;
  }

  & > div > div {
    max-width: max-content;
  }
`;

export const FormFooter = styled(row)`
  align-items: center;
  background: ${WHITE};
  border-top: 1px solid ${LIGHT_GREY};
  border-radius: 0 0 8px 8px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
