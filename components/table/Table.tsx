import React, { FunctionComponent, ReactNode } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, DataGridProps, gridClasses } from '@mui/x-data-grid';

import { CHILD_OF_LIGHT, SALTBOX_BLUE } from '../../constants/colors';
import { Row } from '../../types';
import { typographies } from '../../theme/muiTheme';

export interface TableProps {
  cols: Array<string>;
  rows: Array<Row>;
  onClickRow?: (id: string) => void;
  hasActionMenu?: boolean;
  menuOptions?: Array<{ label: string; icon?: ReactNode; color?: string }>;
  onClickMenu: (label: string, row: Row) => void;
}

const Table: FunctionComponent<DataGridProps> = ({ ...props }) => {
  return (
    <Box sx={{ maxHeight: '400px', width: '100%' }}>
      <DataGrid
        {...props}
        hideFooter
        disableColumnFilter
        disableColumnMenu
        rowHeight={44}
        columnHeaderHeight={44}
        rowSelection
        sx={{
          [`.${gridClasses.columnHeaders}`]: {
            height: '44px',
            minHeight: '44px !important',
          },
          [`.${gridClasses.columnHeader}`]: {
            background: CHILD_OF_LIGHT,
            color: SALTBOX_BLUE,
            textTransform: 'uppercase',
            padding: '0 16px',
            ...typographies.labelMedium,
          },
          [`.${gridClasses.columnSeparator}`]: {
            display: 'none',
          },
          '.MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          [`.${gridClasses.columnHeader}:focus-within`]: {
            outline: 'none !important',
          },
          [`.${gridClasses.row}`]: {
            background: 'white',
          },
          [`.${gridClasses.row}:hover`]: {
            background: 'white',
          },
          [`.${gridClasses.cell}`]: {
            padding: '0 16px',
          },
          [`.${gridClasses.main}`]: {
            background: 'white',
            borderRadius: '4px',
          },
          'filter': 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.04))',
          'border': 0,
          'max-height': '600px',
        }}
      />
    </Box>
  );
};

export default Table;
