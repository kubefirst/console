'use client';
import React, { FunctionComponent, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ClickAwayListener, ListItemButton } from '@mui/material';
import Image from 'next/image';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { BsSlack } from 'react-icons/bs';

import { Avatar, Container, Menu, ProfileMenu } from './Header.styled';

import { noop } from '@/utils/noop';
import Youtube from '@/assets/youtube-dark.svg';
import { useAppSelector } from '@/redux/store';
import Typography from '@/components/Typography/Typography';
import { ECHO_BLUE, PRIMARY, VOLCANIC_SAND } from '@/constants/colors';
import useToggle from '@/hooks/useToggle';
import useFeatureFlag from '@/hooks/useFeatureFlag';
import { FeatureFlag } from '@/types/config';

function stringAvatar(name?: string | null) {
  return {
    sx: {
      bgcolor: '#FAFAFA',
      color: '#94A3B8',
    },
    children: `${name && name[0]}`,
  };
}

export interface HeaderProps {
  handleOpenFlappy: typeof noop;
  handleOpenKubefirstModal: typeof noop;
}

const Header: FunctionComponent<HeaderProps> = ({ handleOpenFlappy, handleOpenKubefirstModal }) => {
  const { isOpen: isHelpMenuOpen, open, close } = useToggle();
  const { isOpen: isProfileMenuOpen, open: openProfileMenu, close: closeProfileMenu } = useToggle();

  const { data: session } = useSession();
  const { isClusterZero } = useAppSelector(({ api, config }) => ({
    isClusterZero: config.isClusterZero,
    managementCluster: api.managementCluster,
  }));
  const { isEnabled: isSubscriptionEnabled } = useFeatureFlag(FeatureFlag.SAAS_SUBSCRIPTION);

  const helpItems = useMemo(
    () => [
      { icon: <MenuBookOutlinedIcon />, title: 'Documentation', path: 'https://docs.kubefirst.io' },
      {
        icon: <BsSlack color={VOLCANIC_SAND} />,
        title: 'Slack',
        path: 'https://kubefirst.io/slack',
      },
      {
        icon: <Image src={Youtube} alt="youtube" />,
        title: 'kubefirst channel',
        action: () => {
          handleOpenKubefirstModal();
          close();
        },
      },
      {
        icon: <VideogameAssetOutlinedIcon htmlColor={VOLCANIC_SAND} />,
        title: 'Flappy k-ray',
        action: () => {
          handleOpenFlappy();
          close();
        },
      },
    ],
    [close, handleOpenFlappy, handleOpenKubefirstModal],
  );

  const handleOpenItem = (path: string | undefined, action: typeof noop | undefined) => {
    path ? window.open(path, '_blank') : action && action();
  };

  return (
    <Container>
      {isSubscriptionEnabled && !isClusterZero && (
        <>
          <HelpOutlineOutlinedIcon
            onClick={open}
            htmlColor={isHelpMenuOpen ? PRIMARY : ECHO_BLUE}
            fontSize="medium"
          />
          {isHelpMenuOpen && (
            <ClickAwayListener onClickAway={close}>
              <Menu>
                <List>
                  {helpItems.map(({ icon, title, action, path }, index) => (
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{
                        pt: '2px',
                        pb: '2px',
                      }}
                      onClick={() => {
                        handleOpenItem(path, action);
                      }}
                    >
                      <ListItemButton
                        sx={{
                          'display': 'grid',
                          'grid-template-columns': '[first] 40px auto',
                        }}
                      >
                        {icon}
                        <Typography variant="body2" style={{ color: `${VOLCANIC_SAND}` }}>
                          {title}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Menu>
            </ClickAwayListener>
          )}
        </>
      )}
      {session?.user && (
        <Avatar {...stringAvatar(session?.user?.email)} onClick={openProfileMenu} />
      )}
      {isProfileMenuOpen && (
        <ClickAwayListener onClickAway={closeProfileMenu}>
          <ProfileMenu>
            <List>
              <ListItem
                disablePadding
                sx={{
                  pt: '2px',
                  pb: '2px',
                }}
                onClick={() => signOut()}
              >
                <ListItemButton
                  sx={{
                    'display': 'grid',
                    'grid-template-columns': '[first] 40px auto',
                  }}
                >
                  <LogoutIcon />
                  <Typography variant="body2" style={{ color: `${VOLCANIC_SAND}` }}>
                    Logout
                  </Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </ProfileMenu>
        </ClickAwayListener>
      )}
    </Container>
  );
};

export default Header;
