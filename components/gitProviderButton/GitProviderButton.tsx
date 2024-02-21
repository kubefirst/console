import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import Image from 'next/image';

import { GitProvider } from '../../types';
import gitlabLogo from '../../assets/gitlab.svg';
import githubLogo from '../../assets/github.svg';
import Typography from '../Typography/Typography';

import { Button } from './GitProviderButton.styled';

const PROVIDER_OPTIONS: Record<
  GitProvider,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { logoSrc: any; label: string; height: number; width: number }
> = {
  [GitProvider.GITHUB]: { logoSrc: githubLogo, label: 'GitHub', height: 40, width: 40 },
  [GitProvider.GITLAB]: { logoSrc: gitlabLogo, label: 'GitLab', height: 40, width: 42 },
};

export interface GitProviderButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'key'> {
  option: GitProvider;
  active?: boolean;
}

const GitProviderButton: FunctionComponent<GitProviderButtonProps> = ({
  option,
  type = 'button',
  ...rest
}) => {
  const { logoSrc, label, height, width } = PROVIDER_OPTIONS[option];
  return (
    <Button {...rest} type={type} data-test-id={`${option}-button`}>
      <Image src={logoSrc} alt="logo" width={width} height={height} />
      <Typography variant="subtitle2">{label}</Typography>
    </Button>
  );
};

export default GitProviderButton;
