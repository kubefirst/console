import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { typographies } from '../../theme/muiTheme';

import Typography from './index';

export default {
  title: 'Layout/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const VariationsTemplate: ComponentStory<typeof Typography> = () => (
  <Wrapper>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Style name</TableCell>
            <TableCell align="right">Font Weight</TableCell>
            <TableCell align="right">Font Size</TableCell>
            <TableCell align="right">Line Height</TableCell>
            <TableCell align="right">Letter spacing</TableCell>
            <TableCell align="right">Sample</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(typographies).map((typographyVariant: string) => {
            const { fontSize, fontWeight, lineHeight, letterSpacing } =
              typographies[typographyVariant];
            return (
              <TableRow
                key={typographyVariant}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant={typographyVariant}>{typographyVariant}</Typography>
                </TableCell>
                <TableCell align="right">{fontWeight}</TableCell>
                <TableCell align="right">{fontSize}</TableCell>
                <TableCell align="right">{lineHeight}</TableCell>
                <TableCell align="right">{`${letterSpacing || 0}px`}</TableCell>
                <TableCell>
                  <Typography variant={typographyVariant}>
                    Almost before we knew it, we had left the ground.
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Wrapper>
);

export const Variations = VariationsTemplate.bind({});
