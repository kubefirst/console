import { styled as muiStyled } from '@mui/material/styles';
import { typographyClasses } from '@mui/material/Typography';
import { Handle } from 'reactflow';
import Image from 'next/image';

import Typography from '../Typography/Typography';
import Column from '../Column/Column';
import Row from '../Row/Row';
import Tag from '../Tag/Tag';
import { BLUE_REFLECTION, EXCLUSIVE_PLUM } from '../../constants/colors';

import styled, { css } from '@/app/lib/styled-components';

export const StatusTag = styled(Tag)`
  position: absolute;
  top: 14px;
  right: 17px;
`;
export const EnvironmentTag = styled(Tag)`
  margin-top: 4px;
`;

export const LeftPanel = styled(Column)`
  margin-left: 83px;
  height: 100%;
  justify-content: center;
  gap: 4px;
`;

export const Img = styled(Image)`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  left: -50px;
`;

export const Container = styled(Row)<{ selected: boolean; managementCluster: boolean }>`
  height: 126px;
  width: 360px;
  background-color: white;
  border: 2px solid ${BLUE_REFLECTION};
  border-radius: 8px;
  align-items: center;
  color: #3f3f46;

  ${({ selected }) =>
    selected &&
    css`
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    `}

  ${({ managementCluster }) =>
    managementCluster &&
    css`
      height: 96px;
      border-radius: 0 8px 8px 0;

      ${LeftPanel} {
        margin-left: 67px;
      }

      ${StatusTag} {
        top: 16px;
        right: 33px;
      }

      ${Img} {
        height: 103px;
        width: 103px;
      }
    `}
`;

export const Nodes = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    fontSize: '11px',
    fontWeight: 400,
    color: EXCLUSIVE_PLUM,
    lineHeight: '16px',
    letterSpacing: '0.5px',
  },
}));
export const CloudProvider = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
  },
}));

export const LabelContainer = styled(Row)`
  align-items: center;
  gap: 4px;
`;

export const MainContainerInfo = styled(Row)`
  height: 100%;
  width: 100%;
`;

export const NodeHandle = styled(Handle)<{ bgColor: string }>`
  right: -8px;
  height: 16px;
  width: 16px;
  border: none;
  background-color: ${({ bgColor }) => bgColor};
`;

export const ClusterName = muiStyled(Typography)(() => ({
  [`&.${typographyClasses.root}`]: {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '16px',
    letterSpacing: '0.4px',
    textWrap: 'nowrap',
    width: '196px',
    marginBottom: '4px',
  },
}));
