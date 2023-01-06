import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { StaticImageData } from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { TYPES } from '../../enums/typography';
import Text from '../text';
import Tag from '../tag';
import ArgoCDLogo from '../../assets/argocd.webp';
import GitLabLogo from '../../assets/gitlab.png';
import GitHubLogo from '../../assets/github.png';
import VaultLogo from '../../assets/vault.png';
import AtlantisLogo from '../../assets/atlantis.png';
import MetaphorLogo from '../../assets/metaphor.png';
import Popover from '../popover';

import {
  CardContent,
  Container,
  Image,
  Link,
  PopoverContainer,
  Tags,
  TextHeader,
} from './card.styled';

const CARD_IMAGES: { [key: string]: StaticImageData } = {
  ['ArgoCDLogo']: ArgoCDLogo,
  ['GitLabLogo']: GitLabLogo,
  ['GitHubLogo']: GitHubLogo,
  ['VaultLogo']: VaultLogo,
  ['AtlantisLogo']: AtlantisLogo,
  ['MetaphorLogo']: MetaphorLogo,
};

export interface ICardProps {
  appName: string;
  children?: FunctionComponent;
  hostedZoneName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags: Array<any>;
  links: Array<string>;
  logo: string;
  onClickLink: (url: string, serviceName: string) => void;
  onClickTag: (url: string, serviceName: string) => void;
}

const Card: FunctionComponent<ICardProps> = ({
  appName,
  tags,
  links,
  hostedZoneName = '',
  logo,
  onClickLink,
  onClickTag,
}) => {
  const [metaphorLinks, setMetaphorLinks] = useState<Array<string>>([]);
  const logoImage = CARD_IMAGES[logo];

  const isMetaphor = appName === 'Metaphor';

  const getHostname = useCallback(
    (domain: string) => {
      const { hostname, pathname } =
        domain && domain.includes('http') ? new URL(domain) : { hostname: domain, pathname: '' };

      if (hostname && hostname.includes('metaphor')) {
        return hostname.replace('.localdev.me', '').replace(`.${hostedZoneName}`, '');
      } else if (hostname && hostname.includes('github')) {
        return pathname.substring(1);
      }

      return hostname;
    },
    [hostedZoneName],
  );

  const metaphorDnsResolution = async (link: string) => {
    try {
      if (!metaphorLinks.includes(link)) {
        await fetch(`${link}/api/healthz`, { mode: 'no-cors' });
        setMetaphorLinks((oldState) => [...oldState, link]);
      }
    } catch (error) {
      // supressing error until dns resolution
    }
  };

  if (isMetaphor) {
    links.map(metaphorDnsResolution);
  }

  if (!appName) {
    return null;
  }

  useEffect(() => {
    if (isMetaphor) {
      const interval = setInterval(() => links.map(metaphorDnsResolution), 20000);

      return () => clearInterval(interval);
    }
  });

  return (
    <Container data-testid="card-component">
      <CardContent>
        <Image src={logoImage} alt={appName} width="68" height="100" />
        <TextHeader>
          <Text type={TYPES.TITLE}>{appName}</Text>
        </TextHeader>
        {links &&
          links.map((domain, index) => {
            const link = getHostname(domain);
            return isMetaphor && !metaphorLinks.includes(domain) ? (
              <PopoverContainer
                key={`${index}-${domain}`}
                onClick={() => setMetaphorLinks((oldState) => [...oldState, domain])}
              >
                <Popover
                  content={<Text type={TYPES.DISABLED}>{getHostname(domain)}</Text>}
                  popover={`${link} is not ready yet`}
                />
                <Box sx={{ display: 'flex', marginLeft: 2 }}>
                  <CircularProgress size={15} />
                </Box>
              </PopoverContainer>
            ) : (
              <Link
                href={domain}
                target="_blank"
                key={`${index}-${domain}`}
                onClick={() => onClickLink(domain, appName)}
              >
                <Text type={TYPES.DISABLED}>{getHostname(domain)}</Text>
                <FiExternalLink />
              </Link>
            );
          })}
      </CardContent>
      <Tags>
        {tags &&
          tags.map(({ value, url, backgroundColor, color }, index) => (
            <Tag
              key={`${index}-${url}`}
              backgroundColor={backgroundColor}
              color={color}
              url={url}
              onClick={() => onClickTag(url, appName)}
            >
              {value}
            </Tag>
          ))}
      </Tags>
    </Container>
  );
};

export default Card;
