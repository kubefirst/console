import React, { FunctionComponent, useEffect, useMemo } from 'react';
import Image from 'next/image';

import { Container, Header, NoLicenseContainer } from './Billing.styled';

import Typography from '@/components/Typography/Typography';
import NextLink from '@/components/NextLink/NextLink';
import Loading from '@/components/Loading/Loading';
import { ClusterUsageTable } from '@/components/ClusterUsageTable/ClusterUsageTable';
import { ASWAD_BLACK, BISCAY, VOLCANIC_SAND } from '@/constants/colors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getClusterUsage } from '@/redux/thunks/subscription.thunk';
import MagnifyGlass from '@/assets/magnify-glass.svg';
import { selectHasLicenseKey } from '@/redux/selectors/subscription.selector';

const Billing: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const { isLoading, license, clusterUsageList } = useAppSelector(
    ({ subscription }) => subscription,
  );

  const hasLicenseKey = useAppSelector(selectHasLicenseKey());

  const total = useMemo(
    () =>
      clusterUsageList.length &&
      clusterUsageList.reduce(
        (previousValue, currentValue) => previousValue + currentValue.total,
        0,
      ),
    [clusterUsageList],
  );

  useEffect(() => {
    if (license?.licenseKey) {
      dispatch(getClusterUsage(license?.licenseKey));
    }
  }, [dispatch, license?.licenseKey]);

  return (
    <Container>
      {hasLicenseKey ? (
        <>
          <Typography variant="body2" color={ASWAD_BLACK} sx={{ display: 'flex', gap: '4px' }}>
            If at any time you need to update your billing card you can do so
            <NextLink href="">by changing your card via Stripe.</NextLink>
          </Typography>
          <Header>
            <Typography variant="subtitle2" color={VOLCANIC_SAND}>
              Cluster usage for current month
            </Typography>
            <Typography variant="subtitle2" color={VOLCANIC_SAND}>
              ${total}
            </Typography>
          </Header>
          {isLoading ? <Loading /> : <ClusterUsageTable clusters={clusterUsageList} />}
        </>
      ) : (
        <NoLicenseContainer>
          <Image alt="magnify-glass" src={MagnifyGlass} />
          <Typography variant="subtitle2" color={VOLCANIC_SAND} sx={{ mt: 4 }}>
            You haven’t exceeded the Free Plan cluster usage yet
          </Typography>
          <Typography variant="body2" color={BISCAY} sx={{ mt: 2 }}>
            Once you do, you will be able to see your cluster usage and billing here.
          </Typography>
        </NoLicenseContainer>
      )}
    </Container>
  );
};

export default Billing;
