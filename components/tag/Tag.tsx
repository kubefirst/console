import React, { FunctionComponent } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import checkImageSrc from '../../assets/check-circle.svg';
import autoRenewImageSrc from '../../assets/auto-renew.svg';
import trashImageSrc from '../../assets/trash.svg';
import warningImageSrc from '../../assets/warning.svg';
import { noop } from '../../utils/noop';

import { TagContainer, IconImage, RemovalButton, StyledText } from './Tag.styled';

import { ASMANI_SKY, CHEFS_DARK_HAT, EXCLUSIVE_PLUM, MOONLESS_MYTERY } from '@/constants/colors';

export const TAG_COLOR_OPTIONS = [
  'gray',
  'cyan',
  'gold',
  'green',
  'light blue',
  'lime',
  'pink',
  'purple',
  'emerald',
  'fuscia',
  'indigo',
  'light-orange',
  'dark-sky-blue',
  'mistery',
] as const;

export const TAG_ICON_OPTONS = {
  'check': checkImageSrc,
  'auto-renew': autoRenewImageSrc,
  'trash': trashImageSrc,
  'warning': warningImageSrc,
};

export type TagColor = (typeof TAG_COLOR_OPTIONS)[number];

const TAG_COLOR_MAP: Record<TagColor | 'none', { bg: string; textColor: string }> = {
  'mistery': { bg: MOONLESS_MYTERY, textColor: ASMANI_SKY },
  'gray': { bg: CHEFS_DARK_HAT, textColor: EXCLUSIVE_PLUM },
  'cyan': { bg: '#ecfeff', textColor: '#0e7490' },
  'gold': { bg: '#fef9c3', textColor: '#a16207' },
  'green': { bg: '#dcfce7', textColor: '#15803d' },
  'light blue': { bg: '#e0f2fe', textColor: '#0369a1' },
  'lime': { bg: '#ecfccb', textColor: '#4d7c0f' },
  'pink': { bg: '#fce7f3', textColor: '#be185d' },
  'purple': { bg: '#ede9fe', textColor: '#6d28d9' },
  'fuscia': { bg: '#fdf4ff', textColor: '#a21caf' },
  'indigo': { bg: '#e0e7ff', textColor: '#4338ca' },
  'light-orange': { bg: '#fef3c7', textColor: '#d97706' },
  'dark-sky-blue': { bg: '#dbeafe', textColor: '#1d4ed8' },
  'emerald': { bg: '#ecfdf5', textColor: '#047857' },
  'none': { bg: 'transparent', textColor: EXCLUSIVE_PLUM },
};

export type TagIconOption = keyof typeof TAG_ICON_OPTONS;

export interface TagProps {
  text: string;
  bgColor?: TagColor;
  icon?: TagIconOption;
  iconComponent?: React.ReactNode;
  removable?: boolean;
  onDelete?: () => void;
  spinImage?: boolean;
  onClick?: () => void;
}

const Tag: FunctionComponent<TagProps> = ({
  text,
  icon,
  iconComponent,
  removable,
  bgColor,
  onClick,
  onDelete = noop,
  spinImage,
  ...rest
}) => {
  // fallback for passing invalid color in case you happent to not expand/ignore the type.
  const { bg, textColor } = TAG_COLOR_MAP[bgColor ?? 'none'] || TAG_COLOR_MAP['none'];
  return (
    <TagContainer bg={bg} textColor={textColor} {...rest} onClick={onClick}>
      {icon && (
        <IconImage src={TAG_ICON_OPTONS[icon]} alt={icon} width={16} height={16} spin={spinImage} />
      )}
      <StyledText variant="body3">
        {iconComponent && iconComponent}
        {text}
      </StyledText>
      {removable && (
        <RemovalButton onClick={onDelete}>
          <CloseIcon />
        </RemovalButton>
      )}
    </TagContainer>
  );
};

export default Tag;
