import React, { FunctionComponent, MouseEvent, ReactNode, useState } from 'react';
import Button from '@mui/material/Button';
import MenuMui from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import Typography from '../Typography/Typography';
import { VOLCANIC_SAND } from '../../constants/colors';

export interface MenuProps {
  isDisabled?: boolean;
  label: string | ReactNode;
  options?: Array<{
    label: string;
    icon?: ReactNode;
    color?: string;
  }>;
  onClickMenu: (label: string) => void;
}

const Menu: FunctionComponent<MenuProps> = ({ isDisabled, label, options, onClickMenu }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (label: string) => {
    handleClose();
    onClickMenu(label);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disableRipple
        disabled={isDisabled}
        sx={{ padding: 0 }}
      >
        {label}
      </Button>
      <MenuMui
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ '& .MuiMenu-paper': { backgroundColor: 'white' } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options &&
          options.map(({ label, icon, color }) => {
            return (
              <MenuItem key={label} onClick={() => handleClickMenu(label)}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText>
                  <Typography variant="body2" color={color || VOLCANIC_SAND}>
                    {label}
                  </Typography>
                </ListItemText>
              </MenuItem>
            );
          })}
      </MenuMui>
    </div>
  );
};

export default Menu;
