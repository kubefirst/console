'use client';
import React, { useState, FunctionComponent, useMemo, ComponentPropsWithRef } from 'react';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import moment from 'moment';

import { ECHO_BLUE, VOLCANIC_SAND } from '../../constants/colors';
import Typography from '../Typography/Typography';
import { descendingComparator } from '../../utils/descendingComparator';

import {
  StyledTableRow,
  StyledTableCell,
  StyledTableBody,
  StyledTableHeading,
  StyledCellText,
  StyledHeaderCell,
  StyledTableContainer,
  StyledTable,
} from './ClusterUsageTable.styled';

import { ClusterUsage } from '@/types/subscription';

interface ClusterUsageProps {
  cluster: ClusterUsage;
}

const ClusterUsageRow: FunctionComponent<ClusterUsageProps> = ({ cluster }) => {
  const { clusterName, clusterID, clusterType, createdAt, deletedAt, hours, total } = cluster;

  return (
    <StyledTableRow>
      <StyledTableCell scope="row">
        <Typography variant="body2" color={VOLCANIC_SAND}>
          {clusterName}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Typography variant="body2" color={VOLCANIC_SAND}>
          {clusterID}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Typography variant="body2" color={VOLCANIC_SAND}>
          {clusterType}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        <StyledCellText variant="body2">
          {moment(createdAt).format('DD MMM YYYY, HH:MM')}
          {deletedAt ? ` - ${moment(deletedAt).format('DD MMM YYYY, HH:MM')}` : ' - Present'}
        </StyledCellText>
      </StyledTableCell>
      <StyledTableCell>
        <Typography variant="body2" color={VOLCANIC_SAND} align="right">
          {hours}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Typography variant="body2" color={VOLCANIC_SAND}>
          {`$${total}`}
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

type ClusterUsageType = keyof ClusterUsage;

type HeadCell = {
  alignment?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  id: ClusterUsageType;
  label: string;
  width?: number;
};

const headCells: HeadCell[] = [
  {
    id: 'clusterName',
    label: 'Cluster Name',
  },
  {
    id: 'clusterID',
    label: 'Cluster ID',
  },
  {
    id: 'clusterType',
    label: 'Cluster Type',
  },
  {
    id: 'createdAt',
    label: 'Duration',
  },
  {
    id: 'hours',
    label: 'Hours',
    alignment: 'right',
    width: 100,
  },
  {
    id: 'total',
    label: 'Total',
    alignment: 'right',
    width: 100,
  },
];

type Order = 'asc' | 'desc';

interface ClusterUsageTableHeadProps {
  orderBy: ClusterUsageType;
  order: Order;
  onSort: (orderBy: ClusterUsageType) => void;
}

const ClusterUsageTableHead: FunctionComponent<ClusterUsageTableHeadProps> = ({
  orderBy,
  order,
  onSort,
}) => {
  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map(({ alignment, id, label, width }) => (
          <StyledHeaderCell key={id} width={width} align={alignment}>
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
              onClick={() => onSort(id)}
              IconComponent={ArrowDropDownIcon}
              sx={{
                '.MuiTableSortLabel-icon': {
                  fill: ECHO_BLUE,
                },
              }}
            >
              <StyledTableHeading variant="labelMedium">{label}</StyledTableHeading>
            </TableSortLabel>
          </StyledHeaderCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
};

interface ClusterUsageTableProps extends Omit<ComponentPropsWithRef<'tbody'>, 'key'> {
  clusters: Array<ClusterUsage>;
  customRef?: React.Ref<HTMLTableSectionElement>;
}

export const ClusterUsageTable: FunctionComponent<ClusterUsageTableProps> = ({
  clusters,
  customRef,
}) => {
  const [orderBy, setOrderBy] = useState<ClusterUsageType>('clusterType');
  const [order, setOrder] = useState<Order>('asc');

  const handleRequestSort = (property: ClusterUsageType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRecords = useMemo(() => {
    return (
      clusters &&
      Object.values(clusters).sort((a, b) =>
        order === 'asc'
          ? -descendingComparator(a, b, orderBy)
          : descendingComparator(a, b, orderBy),
      )
    );
  }, [clusters, order, orderBy]);

  return (
    <StyledTableContainer>
      <StyledTable aria-label="collapsible table">
        <ClusterUsageTableHead onSort={handleRequestSort} order={order} orderBy={orderBy} />
        <StyledTableBody ref={customRef}>
          {sortedRecords &&
            sortedRecords.map((record) => (
              <ClusterUsageRow key={record.clusterID} cluster={record} />
            ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

const ClusterUsageTableWithRef = React.forwardRef<HTMLTableSectionElement, ClusterUsageTableProps>(
  (props, ref) => <ClusterUsageTable customRef={ref} {...props} />,
);

export default ClusterUsageTableWithRef;
