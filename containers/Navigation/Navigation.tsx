'use client';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BsSlack } from 'react-icons/bs';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import NavigationComponent, { FooterItem } from '../../components/Navigation/Navigation';
import { useAppSelector } from '../../redux/store';

import { noop } from '@/utils/noop';
import { selectConfig } from '@/redux/selectors/config.selector';
import useFeatureFlag from '@/hooks/useFeatureFlag';
import { InstallationType } from '@/types/redux';
import { FeatureFlag } from '@/types/config';
import { ASMANI_SKY } from '@/constants/colors';
import { SaasPlans } from '@/types/subscription';
import { Route } from '@/constants';

export interface NavigationProps {
  handleOpenFlappy: typeof noop;
  handleOpenKubefirstModal: typeof noop;
}

const Navigation: FunctionComponent<NavigationProps> = ({
  handleOpenFlappy,
  handleOpenKubefirstModal,
}) => {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);

  const asPath = usePathname();
  const { kubefirstVersion, isClusterZero } = useAppSelector(selectConfig());
  const { managementCluster } = useAppSelector(({ api }) => ({
    managementCluster: api.managementCluster,
  }));
  const license = useAppSelector(({ subscription }) => subscription.license);

  const { isEnabled: isMultiClusterEnabled } = useFeatureFlag(FeatureFlag.MULTICLUSTER_MANAGEMENT);
  const { isEnabled: isSubscriptionEnabled } = useFeatureFlag(FeatureFlag.SAAS_SUBSCRIPTION);

  const routes = useMemo(
    () =>
      [
        {
          icon: <ScatterPlotIcon />,
          path: Route.CLUSTER_MANAGEMENT,
          title: 'Cluster Management',
          isEnabled:
            isMultiClusterEnabled &&
            !isClusterZero &&
            managementCluster?.cloudProvider !== InstallationType.LOCAL,
        },
        {
          icon: <GridViewOutlinedIcon />,
          path: Route.APPLICATIONS,
          title: 'Applications',
          isEnabled: !isClusterZero,
        },
        {
          icon: <CollectionsOutlinedIcon />,
          path: Route.ENVIRONMENTS,
          title: 'Environments',
          isEnabled: !isClusterZero && managementCluster?.cloudProvider !== InstallationType.LOCAL,
        },
        {
          icon: <ReceiptLongIcon />,
          path: Route.SUBSCRIPTION,
          title: 'Subscription',
          group: 'Admin settings',
          groupOrder: 2,
          isEnabled: !isClusterZero && isSubscriptionEnabled,
        },
      ].filter(({ isEnabled }) => isEnabled),
    [isMultiClusterEnabled, isClusterZero, managementCluster?.cloudProvider, isSubscriptionEnabled],
  );

  const nextLicenseUpgradeTitle = useMemo<string | undefined>(() => {
    if (!license?.licenseKey) {
      return 'Upgrade to Pro';
    }

    if (license?.plan?.name === SaasPlans.Pro) {
      return 'Upgrade to Enterprise';
    }

    return undefined;
  }, [license?.licenseKey, license?.plan?.name]);

  const footerItems = useMemo(
    () =>
      isSubscriptionEnabled && !isClusterZero
        ? nextLicenseUpgradeTitle && [
            {
              icon: <StarBorderOutlinedIcon htmlColor={ASMANI_SKY} />,
              path: Route.SUBSCRIPTION_PLANS,
              title: nextLicenseUpgradeTitle,
              color: ASMANI_SKY,
            },
          ]
        : [
            {
              icon: <HelpOutlineOutlinedIcon />,
              path: 'https://docs.kubefirst.io',
              title: 'Documentation',
              color: '',
            },
            {
              icon: <BsSlack size={24} />,
              path: 'https://kubefirst.io/slack',
              title: 'Slack',
              color: '',
            },
          ],
    [isClusterZero, isSubscriptionEnabled, nextLicenseUpgradeTitle],
  );

  const handleIsActiveItem = useCallback(
    (route: string) => {
      if (typeof window !== 'undefined') {
        const linkPathname = new URL(route, window?.location?.href).pathname;

        // Using URL().pathname to get rid of query and hash
        const activePathname = new URL(asPath as string, window?.location?.href).pathname;

        return linkPathname === activePathname;
      }

      return false;
    },
    [asPath],
  );

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      <NavigationComponent
        domLoaded={domLoaded}
        kubefirstVersion={kubefirstVersion}
        routes={routes}
        handleIsActiveItem={handleIsActiveItem}
        handleOpenGame={handleOpenFlappy}
        handleOpenContent={handleOpenKubefirstModal}
        footerItems={footerItems as Array<FooterItem>}
        isSubscriptionEnabled={isSubscriptionEnabled}
      />
    </>
  );
};

export default Navigation;
