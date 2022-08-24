import React, { FunctionComponent } from 'react';

import PersonIcon from '../../assets/person.svg';
import CogIcon from '../../assets/cog.svg';

import { Container, Divider, Icon, Row, SidebarItems } from './sidebar.styled';

type SidebarItem = {
  name: string;
  link: string;
  icon?: string;
};

const SIDEBAR_FOOTER_ITEMS: Array<SidebarItem> = [
  {
    name: 'settings',
    link: '/settings',
    icon: CogIcon,
  },
];

const SIDEBAR_ITEMS: Array<SidebarItem> = [
  {
    name: 'profile',
    link: '/profile',
    icon: PersonIcon,
  },
];

export interface ISidebarProps {
  onSidebarItemClick: (item: SidebarItem) => void;
}

const Sidebar: FunctionComponent<ISidebarProps> = ({ onSidebarItemClick }) => {
  const buildSidebarItems = (items: Array<SidebarItem>) => {
    return items.map((item) => (
      <Row shouldShowHoverState onClick={() => onSidebarItemClick(item)} key={item.name}>
        <img src={item.icon} alt={item.name} />
      </Row>
    ));
  };

  return (
    <Container data-testid="sidebar-component">
      <Row
        data-testid="home-item"
        onClick={() => onSidebarItemClick({ name: 'home', link: '/home' })}
      >
        <Icon />
      </Row>
      <Divider />
      <SidebarItems data-testid="sidebar-items">
        <div>{buildSidebarItems(SIDEBAR_ITEMS)}</div>
        <div>{buildSidebarItems(SIDEBAR_FOOTER_ITEMS)}</div>
      </SidebarItems>
    </Container>
  );
};

export default Sidebar;
