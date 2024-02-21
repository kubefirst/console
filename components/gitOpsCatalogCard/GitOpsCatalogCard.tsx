import React, { FunctionComponent, PropsWithChildren, useMemo } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import Tag, { TagColor } from '../Tag/Tag';
import Tooltip from '../Tooltip/Tooltip';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import { AppCategory, GitOpsCatalogApp } from '../../types/applications';
import { VOLCANIC_SAND } from '../../constants/colors';

import {
  App,
  Body,
  Card,
  Category,
  Description,
  DisplayName,
  Header,
  Installing,
} from './GitOpsCatalogCard.styled';

export const CATEGORY_COLOR_CONFIG: Record<AppCategory, TagColor> = {
  [AppCategory.APP_MANAGEMENT]: 'purple',
  [AppCategory.ARCHITECTURE]: 'pink',
  [AppCategory.CI_CD]: 'gold',
  [AppCategory.DATABASE]: 'indigo',
  [AppCategory.FIN_OPS]: 'light blue',
  [AppCategory.INFRASTRUCTURE]: 'gray',
  [AppCategory.MONITORING]: 'emerald',
  [AppCategory.OBSERVABIILITY]: 'light-orange',
  [AppCategory.SECURITY]: 'dark-sky-blue',
  [AppCategory.STORAGE]: 'green',
  [AppCategory.TESTING]: 'lime',
  [AppCategory.QUEUEING]: 'light blue',
  [AppCategory.KUBESHOP]: 'light blue',
  [AppCategory.APPLICATIONS]: 'light blue',
};

export type GitOpsCatalogCardProps = PropsWithChildren<GitOpsCatalogApp> & {
  isInstalling?: boolean;
  onClick?: () => void;
  showSubmitButton?: boolean;
  isDeletable?: boolean;
  isDisabled?: boolean;
  excludeTruncate?: boolean;
};

const GitOpsCatalogCard: FunctionComponent<GitOpsCatalogCardProps> = ({
  display_name,
  category,
  image_url,
  description,
  excludeTruncate = false,
  isInstalling,
  onClick,
  showSubmitButton = true,
  isDeletable = false,
  isDisabled = false,
  children,
}) => {
  const tagColor = CATEGORY_COLOR_CONFIG[category ?? AppCategory.APP_MANAGEMENT] ?? {};
  const showTooltip = useMemo(
    () => (description ? description.length > 167 : false),
    [description],
  );

  return (
    <Card>
      <Header>
        <App>
          <Image
            alt={display_name}
            height={32}
            width={32}
            src={image_url}
            style={{ objectFit: 'contain' }}
          />
          <DisplayName variant="subtitle2">{display_name}</DisplayName>
        </App>
        {category && (
          <Category>
            <Tag key={category} text={category} bgColor={tagColor} />
          </Category>
        )}
      </Header>
      <Body>
        {showTooltip ? (
          <Tooltip title={description} maxWidth="375px" whiteSpace="wrap" placement="top">
            <Description variant="body2">{description || children}</Description>
          </Tooltip>
        ) : (
          <Description variant="body2" excludeTruncate={excludeTruncate}>
            {description || children}
          </Description>
        )}
        {showSubmitButton && !isInstalling && (
          <Button variant="outlined" color="secondary" onClick={onClick} disabled={isDisabled}>
            {isDeletable ? 'Uninstall' : 'Install'}
          </Button>
        )}
        {isInstalling && (
          <Installing>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress size={20} />
            </Box>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              Please wait a few moments while we finish installing your app.
            </Typography>
          </Installing>
        )}
      </Body>
    </Card>
  );
};

export default GitOpsCatalogCard;
