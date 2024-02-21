'use client';
import React, { ComponentPropsWithoutRef, FunctionComponent, useCallback, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { TooltipProps } from '@mui/material';

import Typography from '../Typography/Typography';
import Tooltip from '../Tooltip/Tooltip';

import { Button } from './CopyButton.styled';

import { noop } from '@/utils/noop';

interface CopyButtonProps extends ComponentPropsWithoutRef<'button'> {
  textToCopy: string;
  buttonText: string;
  onCopy?: () => void;
  withoutTooltip?: boolean;
  tooltipPlacement?: TooltipProps['placement'];
}

const CopyButton: FunctionComponent<CopyButtonProps> = ({
  textToCopy,
  buttonText,
  onCopy = noop,
  withoutTooltip,
  tooltipPlacement = 'top',
  ...rest
}) => {
  const [copyLabel, setCopyLabel] = useState('Copy');

  const handleOnCopy = useCallback(() => {
    setCopyLabel('Copied!');
    onCopy();

    setTimeout(() => setCopyLabel('Copy'), 2000);
  }, [onCopy]);

  return !withoutTooltip ? (
    <Tooltip title={copyLabel} placement={tooltipPlacement}>
      <CopyToClipboard text={textToCopy} onCopy={handleOnCopy}>
        <Button {...rest}>
          <Typography variant="body2">{buttonText}</Typography>
        </Button>
      </CopyToClipboard>
    </Tooltip>
  ) : (
    <CopyToClipboard text={textToCopy} onCopy={onCopy}>
      <Button {...rest}>
        <Typography variant="body2">{buttonText}</Typography>
      </Button>
    </CopyToClipboard>
  );
};

export default styled(CopyButton)<CopyButtonProps>``;
