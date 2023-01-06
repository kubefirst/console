import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';
import { BsSlack } from 'react-icons/bs';
import Link from 'next/link';

import Typography from '../typography/';
import K1Image from '../../assets/title.svg';
import K1Ray from '../../assets/k1-ray.svg';

import { Container, FooterContainer, MenuContainer, MenuItem, Title } from './navigation.styled';

const ROUTES = [
  {
    icon: <HomeIcon />,
    path: '/',
    title: 'Home',
  },
  {
    icon: <ScatterPlotIcon />,
    path: '/cluster',
    title: 'Cluster Management',
  },
  {
    icon: <PeopleOutlineSharpIcon />,
    path: '/users',
    title: 'Users',
  },
];

const FOOTER_ITEMS = [
  {
    icon: <HelpIcon />,
    path: 'https://docs.kubefirst.io',
    title: 'Help Documentation',
  },
  {
    icon: <BsSlack size={20} />,
    path: 'https://bit.ly/kubefirst-slack',
    title: 'Slack',
  },
];

export interface NavigationProps {
  collapsible?: boolean;
}

const Navigation: FunctionComponent<NavigationProps> = ({ collapsible }) => {
  const { asPath } = useRouter();

  const isActive = (route: string) => {
    if (typeof window !== 'undefined') {
      const linkPathname = new URL(route as string, window?.location?.href).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, window?.location?.href).pathname;

      return linkPathname === activePathname;
    }
  };

  return (
    <Container collapsible={collapsible}>
      <div>
        <Title collapsible={collapsible}>
          <Image
            alt="k1-image"
            src={collapsible ? K1Ray : K1Image}
            height={40}
            width={collapsible ? 48 : 160}
          />
        </Title>
        <MenuContainer>
          {ROUTES.map(({ icon, path, title }) => (
            <Link href={path} key={path}>
              <MenuItem isActive={isActive(path)} collapsible={collapsible}>
                <>
                  {icon}
                  {!collapsible && <Typography variant="body1">{title}</Typography>}
                </>
              </MenuItem>
            </Link>
          ))}
        </MenuContainer>
      </div>
      <FooterContainer>
        {FOOTER_ITEMS.map(({ icon, path, title }) => (
          <Link href={path} key={path}>
            <MenuItem collapsible={collapsible}>
              <>
                {icon}
                {!collapsible && <Typography variant="body1">{title}</Typography>}
              </>
            </MenuItem>
          </Link>
        ))}
      </FooterContainer>
    </Container>
  );
};

export default Navigation;
