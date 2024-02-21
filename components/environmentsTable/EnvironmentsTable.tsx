'use client';
import React, { useState, FunctionComponent, useMemo, ComponentPropsWithRef } from 'react';
import styled from 'styled-components';
import TableHead from '@mui/material/TableHead';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import TableSortLabel from '@mui/material/TableSortLabel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import moment from 'moment';

import { ECHO_BLUE, FIRE_BRICK, MAGNOLIA, PRIMARY, SALTBOX_BLUE } from '../../constants/colors';
import { ClusterEnvironment } from '../../types/provision';
import Typography from '../Typography/Typography';
import Tag from '../Tag/Tag';
import { descendingComparator } from '../../utils/descendingComparator';
import { EnvMap } from '../../redux/slices/environments.slice';

import {
  StyledTableRow,
  StyledTableCell,
  StyledTableBody,
  StyledTableHeading,
  StyledCellText,
  Menu,
  StyledHeaderCell,
  StyledTableContainer,
  StyledTable,
} from './EnvironmentsTable.styled';

import useToggle from '@/hooks/useToggle';

const MyButton = styled.button<{ selected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected }) => (selected ? MAGNOLIA : 'inherit')};
  color: ${SALTBOX_BLUE};
  height: 36px;
  width: 36px;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    color: ${PRIMARY};
    background-color: ${MAGNOLIA};
  }
`;

interface EnvironmentRowProps {
  environment: ClusterEnvironment;
  onDeleteEnvironment: (envId: string) => void;
  // onEditEnvironment: () => void;
}

const EnvironmentRow: FunctionComponent<EnvironmentRowProps> = ({
  environment,
  onDeleteEnvironment,
  // onEditEnvironment,
}) => {
  const { id, name, description, color, creationDate } = environment;
  const { isOpen, close, toggle } = useToggle();

  return (
    <StyledTableRow>
      <StyledTableCell scope="row">
        <StyledCellText variant="body2" style={{ fontWeight: 500 }}>
          <Tag text={name} bgColor={color} />
        </StyledCellText>
      </StyledTableCell>
      <StyledTableCell>
        {description && <StyledCellText variant="body2">{description}</StyledCellText>}
      </StyledTableCell>
      <StyledTableCell>
        <StyledCellText variant="body2">
          {moment(+creationDate).format('DD MMM YYYY, HH:MM:SS')}
        </StyledCellText>
      </StyledTableCell>
      <StyledTableCell>
        <div style={{ position: 'relative' }}>
          <MyButton aria-label="more info" onClick={toggle} selected={isOpen}>
            <MoreHorizIcon />
          </MyButton>
          {isOpen && (
            <ClickAwayListener onClickAway={close}>
              <Menu>
                <List>
                  {/* <ListItem disablePadding>
                  <ListItemButton onClick={onEditEnvironment}>
                    <Typography variant="body2">Edit</Typography>
                  </ListItemButton>
                </ListItem> */}
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => onDeleteEnvironment(id)}>
                      <Typography variant="body2" style={{ color: `${FIRE_BRICK}` }}>
                        Delete environment
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Menu>
            </ClickAwayListener>
          )}
        </div>
      </StyledTableCell>
    </StyledTableRow>
  );
};

type EnvKey = keyof ClusterEnvironment;

type HeadCell = {
  id: EnvKey;
  label: string;
};

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Environment Name',
  },
  {
    id: 'description',
    label: 'Description',
  },
  {
    id: 'creationDate',
    label: 'Created',
  },
];

type Order = 'asc' | 'desc';

interface EnvironmentTableHeadProps {
  orderBy: EnvKey;
  order: Order;
  onSort: (orderBy: EnvKey) => void;
}

const EnvironmentTableHead: FunctionComponent<EnvironmentTableHeadProps> = ({
  orderBy,
  order,
  onSort,
}) => {
  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((cell) => (
          <StyledHeaderCell key={cell.id}>
            {/* Only allow sorting of table by env name or creation date */}
            {cell.id !== 'description' ? (
              <TableSortLabel
                active={orderBy === cell.id}
                direction={orderBy === cell.id ? order : 'asc'}
                onClick={() => onSort(cell.id)}
                IconComponent={ArrowDropDownIcon}
                sx={{
                  '.MuiTableSortLabel-icon': {
                    fill: ECHO_BLUE,
                  },
                }}
              >
                <StyledTableHeading variant="labelMedium">{cell.label}</StyledTableHeading>
              </TableSortLabel>
            ) : (
              <StyledTableHeading variant="labelMedium">{cell.label}</StyledTableHeading>
            )}
          </StyledHeaderCell>
        ))}
        <StyledHeaderCell />
      </StyledTableRow>
    </TableHead>
  );
};

interface EnvironmentsTableProps extends Omit<ComponentPropsWithRef<'tbody'>, 'key'> {
  environments: EnvMap;
  onDeleteEnvironment: (envId: string) => void;
  customRef?: React.Ref<HTMLTableSectionElement>;
  // onEditEnvironment: () => void;
}

export const EnvironmentsTable: FunctionComponent<EnvironmentsTableProps> = ({
  environments,
  onDeleteEnvironment,
  // onEditEnvironment,
  customRef,
}) => {
  const [orderBy, setOrderBy] = useState<EnvKey>('creationDate');
  const [order, setOrder] = useState<Order>('asc');

  const handleRequestSort = (property: EnvKey) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedEnvironments = useMemo(() => {
    return Object.values(environments).sort((a, b) =>
      order === 'asc' ? -descendingComparator(a, b, orderBy) : descendingComparator(a, b, orderBy),
    );
  }, [environments, order, orderBy]);

  return (
    <StyledTableContainer>
      <StyledTable aria-label="collapsible table">
        <EnvironmentTableHead onSort={handleRequestSort} order={order} orderBy={orderBy} />
        <StyledTableBody ref={customRef}>
          {sortedEnvironments.map((environment) => (
            <EnvironmentRow
              key={environment.name}
              environment={environment}
              onDeleteEnvironment={onDeleteEnvironment}
              // onEditEnvironment={onEditEnvironment}
            />
          ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

const EnvironmentTableWithRef = React.forwardRef<HTMLTableSectionElement, EnvironmentsTableProps>(
  (props, ref) => <EnvironmentsTable customRef={ref} {...props} />,
);

export default EnvironmentTableWithRef;
