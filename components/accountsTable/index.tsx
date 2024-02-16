'use client';
import React, {
  useState,
  FunctionComponent,
  useMemo,
  ComponentPropsWithRef,
  ChangeEvent,
} from 'react';
import Image from 'next/image';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ClickAwayListener, List, ListItem, ListItemButton } from '@mui/material';

import { DODGER_BLUE, ECHO_BLUE, FIRE_BRICK, VOLCANIC_SAND } from '../../constants/colors';
import { descendingComparator } from '../../utils/descendingComparator';
import { Container } from '../textField/textField.styled';
import TextFieldWithRef from '../textField';
import Button from '../button';
import { PROVIDER_OPTIONS } from '../cloudProviderCard';
import Typography from '../typography';
import Switch from '../switch';

import {
  StyledTableRow,
  StyledTableCell,
  StyledTableBody,
  StyledTableHeading,
  StyledCellText,
  StyledHeaderCell,
  StyledTableContainer,
  StyledTable,
  SearchHeader,
  EllipsisButton,
  Menu,
} from './accountsTable.styled';

import { CloudAccount } from '@/types/cloudAccount';
import useToggle from '@/hooks/useToggle';

interface AccountRowProps {
  account: CloudAccount;
  handleEnableAccount: (account: CloudAccount) => void;
  handleEditAccount: (account: CloudAccount) => void;
}

const AccountRow: FunctionComponent<AccountRowProps> = ({
  account,
  handleEditAccount,
  handleEnableAccount,
}) => {
  const { isOpen, close, toggle } = useToggle();

  const { name, isEnabled, type } = account;
  const cloud = PROVIDER_OPTIONS[type];

  return (
    <StyledTableRow>
      <StyledTableCell scope="row">
        <StyledCellText
          variant="subtitle3"
          sx={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 3 }}
        >
          <Image src={cloud?.logoSrc} alt="logo" width={38} height={14} />
          <Typography
            variant="subtitle3"
            sx={{ display: 'flex', flexDirection: 'column' }}
            color={VOLCANIC_SAND}
          >
            {name}
            <Typography variant="subtitle3" color={DODGER_BLUE}>
              {cloud?.label}
            </Typography>
          </Typography>
        </StyledCellText>
      </StyledTableCell>
      <StyledTableCell>
        <Switch
          onChange={(isChecked) => handleEnableAccount({ ...account, isEnabled: isChecked })}
          checked={isEnabled}
        />
      </StyledTableCell>
      <StyledTableCell width={20}>
        <div style={{ position: 'relative' }}>
          <EllipsisButton aria-label="more info" onClick={toggle} selected={isOpen}>
            <MoreHorizIcon />
          </EllipsisButton>
          {isOpen && (
            <ClickAwayListener onClickAway={close}>
              <Menu>
                <List>
                  <ListItem disablePadding onClick={() => handleEditAccount(account)}>
                    <ListItemButton>
                      <Typography variant="body2" color={VOLCANIC_SAND}>
                        Edit
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <Typography variant="body2" color={FIRE_BRICK}>
                        Remove account
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

type AccountKey = keyof CloudAccount;

type HeadCell = {
  id: AccountKey;
  label: string;
};

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Account Name',
  },
  {
    id: 'isEnabled',
    label: 'State',
  },
];

type Order = 'asc' | 'desc';

interface AccountTableHeadProps {
  orderBy: AccountKey;
  order: Order;
  onSort: (orderBy: AccountKey) => void;
}

const AccountTableHead: FunctionComponent<AccountTableHeadProps> = ({ orderBy, order, onSort }) => {
  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((cell) => (
          <StyledHeaderCell key={cell.id}>
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
          </StyledHeaderCell>
        ))}
        <StyledHeaderCell width={40} />
      </StyledTableRow>
    </TableHead>
  );
};

interface AccountsTableProps extends Omit<ComponentPropsWithRef<'tbody'>, 'key'> {
  accounts: Array<CloudAccount>;
  handleEditAccount: (account: CloudAccount) => void;
  handleEnableAccount: () => void;
  handleRedirect: (accountId?: string) => void;
  customRef?: React.Ref<HTMLTableSectionElement>;
}

export const AccountsTable: FunctionComponent<AccountsTableProps> = ({
  accounts,
  handleEditAccount,
  handleEnableAccount,
  handleRedirect,
  customRef,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<AccountKey>('name');
  const [order, setOrder] = useState<Order>('asc');

  const handleRequestSort = (property: AccountKey) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleOnChangeSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortedAccounts = useMemo(() => {
    return (
      accounts &&
      Object.values(accounts)
        .filter(({ name }) => name.includes(searchTerm))
        .sort((a, b) =>
          order === 'asc'
            ? -descendingComparator(a, b, orderBy)
            : descendingComparator(a, b, orderBy),
        )
    );
  }, [accounts, order, orderBy, searchTerm]);

  return (
    <StyledTableContainer>
      <SearchHeader>
        <Container>
          <TextFieldWithRef
            autoComplete="off"
            size="small"
            startAdornment={<SearchIcon />}
            onChange={handleOnChangeSearch}
          />
        </Container>
        <Button
          color="primary"
          variant="contained"
          sx={{ width: 'max-content ' }}
          onClick={() => handleRedirect()}
        >
          Add cloud account
        </Button>
      </SearchHeader>
      <StyledTable aria-label="collapsible table">
        <AccountTableHead onSort={handleRequestSort} order={order} orderBy={orderBy} />
        <StyledTableBody ref={customRef}>
          {sortedAccounts &&
            sortedAccounts.map((account) => (
              <AccountRow
                key={account.name}
                account={account}
                handleEnableAccount={handleEnableAccount}
                handleEditAccount={handleEditAccount}
              />
            ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

const AccountsTableWithRef = React.forwardRef<HTMLTableSectionElement, AccountsTableProps>(
  (props, ref) => <AccountsTable customRef={ref} {...props} />,
);

export default AccountsTableWithRef;
