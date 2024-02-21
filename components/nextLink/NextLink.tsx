import React, { FunctionComponent, PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';

import { LinkContainer } from './NextLink.styled';

interface NextLinkProps extends Omit<LinkProps, 'onClick' | 'onTouchStart' | 'onMouseEnter'> {
  target?: string;
}

const NextLink: FunctionComponent<PropsWithChildren<NextLinkProps>> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  legacyBehavior,
  children,
  target,
  ...rest
}) => (
  <LinkContainer {...rest}>
    <Link
      {...{
        href,
        as,
        replace,
        scroll,
        shallow,
        passHref,
        prefetch,
        locale,
        legacyBehavior,
        target,
      }}
    >
      {children}
    </Link>
  </LinkContainer>
);

export default NextLink;
