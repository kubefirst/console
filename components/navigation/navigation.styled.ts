import { styled as muiStyled } from '@mui/material/styles';

import styled, { css } from '@/app/lib/styled-components';
import Typography from '@/components/Typography/Typography';
import { MIDNIGHT_EXPRESS } from '@/constants/colors';
import { media } from '@/utils/media';
import Tooltip from '@/components/Tooltip/Tooltip';

export const Container = styled.nav`
  background-color: ${({ theme }) => theme.colors.moonlessMystery};
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 72px;
  transition: width 0.5s ease;

  ${media.greaterThan('md')`
    width: 304px;
    overflow: auto;
  `}
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;

  & a {
    text-decoration: none;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & a {
    text-decoration: none;
  }
`;

export const MenuItem = styled.div<{ isActive?: boolean }>`
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #9ea2c6;
  cursor: pointer;
  display: flex;
  gap: 18px;
  height: 24px;
  margin: 0 8px;
  padding: 10px;
  width: 40px;
  transition: width 0.5s ease;

  &:hover {
    background-color: ${MIDNIGHT_EXPRESS};
    color: white;

    svg {
      color: white;
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${MIDNIGHT_EXPRESS};
      color: white;

      svg {
        color: white;
      }
    `}

  ${media.greaterThan('md')`
    padding: 12px 18px;
    width: 204px;
    justify-content: flex-start;
  `}
`;

export const Title = styled(Typography)`
  display: none;

  ${media.greaterThan('md')`
      display: block;
  `}
`;

export const KubefirstVersion = styled(Typography)``;

export const KubefirstTitle = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  padding: 12px;
  position: relative;

  #title {
    display: none;
  }

  ${media.greaterThan('md')`
    align-items: flex-start;
    margin-bottom: 32px;
    padding: 24px 16px 0;

    ${KubefirstVersion}{
      margin-left: 55px;
    } 

    #ray {
      display: none;
    }
    #title {
      display: block;
    } 
  `}
`;

export const RouterCard = styled.div`
  align-items: center;
  border-radius: 16px;
  cursor: pointer;
  display: none;
  height: 135px;
  padding: 0 16px;
  width: 176px;

  ${media.greaterThan('md')`
    display: flex;
  `}
`;

export const ContentCard = styled.div``;

export const BreakpointTooltip = muiStyled(Tooltip)(() => ({
  '@media (min-width: 1024px)': {
    display: 'none',
  },
}));
