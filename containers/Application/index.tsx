import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';

import ApplicationComponent, {
  ApplicationProps as AppCompProps,
} from '../../components/application';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { checkSiteReadiness } from '../../redux/thunks/readiness.thunk';

export interface ApplicationProps extends Omit<AppCompProps, 'links'> {
  links?: Array<string>;
  onUninstall: () => void;
}

const isGitLink = (url: string) => url.includes('github') || url.includes('gitlab');

const Application: FunctionComponent<ApplicationProps> = ({
  links: applicationLinks,
  onUninstall,
  ...props
}) => {
  const [firstLoad, setFirstLoad] = useState(false);

  const [links, setLinks] = useState<{ [url: string]: boolean } | undefined>(
    applicationLinks?.reduce((previous, current) => {
      return { ...previous, [current]: isGitLink(current) };
    }, {}),
  );

  const dispatch = useAppDispatch();
  const availableSites = useAppSelector(({ readiness }) => readiness.availableSites);

  const isSiteAvailable = useCallback(
    (url: string) => {
      return availableSites.includes(url) || isGitLink(url);
    },
    [availableSites],
  );

  const checkSiteAvailability = useCallback(
    (url: string) => {
      const isAvailable = isSiteAvailable(url);

      if (!isAvailable) {
        return dispatch(checkSiteReadiness({ url }));
      }
    },
    [dispatch, isSiteAvailable],
  );

  useEffect(() => {
    if (availableSites.length) {
      setLinks(
        links &&
          Object.keys(links).reduce(
            (previous, current) => ({ ...previous, [current]: isSiteAvailable(current) }),
            {},
          ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableSites]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        links &&
        Object.keys(links).map((url) => {
          const isAvailable = links[url];
          !isAvailable && checkSiteAvailability(url);
        }),
      20000,
    );
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (!firstLoad) {
      setFirstLoad(true);
      links &&
        Object.keys(links).map(async (url) => {
          await checkSiteAvailability(url);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ApplicationComponent {...props} links={links} onUninstall={onUninstall} />;
};

export default Application;
