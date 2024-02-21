import React, { FunctionComponent, PropsWithChildren } from 'react';
import DrawerMui, { DrawerProps } from '@mui/material/Drawer';

const Drawer: FunctionComponent<Omit<PropsWithChildren<DrawerProps>, 'key'>> = ({
  children,
  ...rest
}) => {
  return <DrawerMui {...rest}>{children}</DrawerMui>;
};

export default Drawer;
