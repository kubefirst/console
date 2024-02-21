import React, { FunctionComponent, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import Typography from '../Typography/Typography';
import { formatDomain } from '../../utils/url/formatDomain';
import Tooltip from '../Tooltip/Tooltip';
import { MINT_GREEN, PASTEL_LIGHT_BLUE } from '../../constants/colors';
import Button from '../Button/Button';

import {
  AppConnector,
  Container,
  Description,
  Header,
  Image,
  Link,
  Links,
  LiveAppIcon,
  Title,
} from './Application.styled';

import { noop } from '@/utils/noop';

export interface ApplicationProps {
  description?: string;
  default: boolean;
  children?: React.ReactNode;
  image: string;
  name: string;
  links?: { [url: string]: boolean };
  onLinkClick: (link: string, name: string) => void;
  onUninstall: () => void;
}

const Application: FunctionComponent<ApplicationProps> = ({
  description,
  default: defaultApp,
  children,
  image,
  name,
  links,
  onLinkClick,
  onUninstall = noop,
}) => {
  const isMetaphor = useMemo(() => name === 'Metaphor', [name]);

  const showTooltip = useMemo(
    () => (description ? description.length > 167 : false),
    [description],
  );

  const ApplicationLink = useCallback(
    (link: string, isAvailable?: boolean) => {
      return link ? (
        <Link
          key={link}
          href={link}
          onClick={(e) => {
            if (isAvailable) {
              onLinkClick(link, name);
            } else {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          target="_blank"
          disabled={!isAvailable}
        >
          <LiveAppIcon color={isAvailable ? MINT_GREEN : PASTEL_LIGHT_BLUE}>
            {isMetaphor && <AppConnector />}
          </LiveAppIcon>
          <Typography variant="tooltip">{formatDomain(link, isMetaphor)}</Typography>
          {!isAvailable && (
            <Box sx={{ display: 'flex', marginLeft: 2 }}>
              <CircularProgress size={15} />
            </Box>
          )}
        </Link>
      ) : (
        <div />
      );
    },
    [isMetaphor, name, onLinkClick],
  );

  const linksComponent = useMemo(
    () => (
      <Links>
        {links &&
          Object.keys(links)?.map((url) => {
            const isAvailable = links[url];
            const { origin, pathname } = (url?.includes('http') && new URL(url)) || {
              origin: '',
              pathname: '',
            };
            const shouldUseTooltip = pathname.length > 40 || origin.length > 40;
            const linkComponent = ApplicationLink(url, isAvailable);

            return shouldUseTooltip ? (
              <Tooltip title={url} placement="top" key={url}>
                {linkComponent}
              </Tooltip>
            ) : (
              linkComponent
            );
          })}
      </Links>
    ),
    [links, ApplicationLink],
  );

  return (
    <Container>
      <Header>
        <Image src={image} alt={name} width="32" height="32" />
        <Title variant="subtitle2">{name}</Title>
      </Header>
      {showTooltip ? (
        <Tooltip title={description} maxWidth="375px" whiteSpace="wrap" placement="top">
          <Description variant="body2">{description}</Description>
        </Tooltip>
      ) : (
        <Description variant="body2">{description}</Description>
      )}{' '}
      {links && !children ? linksComponent : children}
      {!defaultApp && (
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginTop: '16px' }}
          onClick={onUninstall}
        >
          Uninstall
        </Button>
      )}
    </Container>
  );
};

export default Application;
