'use client';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { FormProvider, useForm } from 'react-hook-form';

import License from '../License/License';
import CancelSubscription from '../CancelSubscription/CancelSubscription';
import Billing from '../Billing/Billing';
import ContactUs from '../ContactUsModal/ContactUsModal';

import { Container, PlansContainer } from './Subscription.styled';

import TabPanel, { Tab, a11yProps } from '@/components/Tab/Tab';
import { BISCAY, VOLCANIC_SAND } from '@/constants/colors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import Typography from '@/components/Typography/Typography';
import { setActiveTab } from '@/redux/slices/settings.slice';
import { SettingsTab, SettingsTabMap } from '@/constants/setttings';
import { Plan } from '@/types/plan';
import { activateLicenseKey, validateLicenseKey } from '@/redux/thunks/subscription.thunk';
import useModal from '@/hooks/useModal';
import { SaasPlans } from '@/types/subscription';
import { selectHasLicenseKey } from '@/redux/selectors/subscription.selector';
import Pricing from '@/components/Pricing/Pricing';

interface SubscriptionProps {
  activeTabParam?: string;
  plans: Array<Plan>;
}

const Subscription: FunctionComponent<SubscriptionProps> = ({ activeTabParam, plans }) => {
  const dispatch = useAppDispatch();
  const { isOpen, closeModal, openModal } = useModal();
  const {
    isOpen: isContactUsModalOpen,
    closeModal: closeContactUsModal,
    openModal: openContactUsModal,
  } = useModal();

  const { activeTab, license, saasURL } = useAppSelector(({ settings, subscription, config }) => ({
    activeTab: settings.activeTab,
    license: subscription.license,
    saasURL: config.saasURL,
  }));

  const methods = useForm<{ licenseKey: string }>({
    mode: 'onChange',
    defaultValues: {
      licenseKey: license?.licenseKey || '',
    },
  });

  const currentPlanIndex = useMemo(
    () => plans.findIndex(({ name }) => name === license?.plan?.name),
    [license, plans],
  );

  const handleOnChangeTab = (event: React.SyntheticEvent, tabIndex: number) => {
    dispatch(setActiveTab(tabIndex));
  };

  const handleActivateLicense = (licenseKey: string) => {
    dispatch(activateLicenseKey(licenseKey)).then(() => dispatch(validateLicenseKey()));
  };

  const handleRedirectToSaas = (plan: string) => {
    if (plan === SaasPlans.Enterprise && hasLicenseKey) {
      openContactUsModal();
    } else {
      window.open(`${saasURL}?plan=${plan}`, '_blank');
    }
  };

  const isActivePlan = (plan: string): boolean => {
    if (!license?.licenseKey && plan === SaasPlans.Community) {
      return true;
    }

    return license?.plan?.name === plan;
  };

  const hasLicenseKey = useAppSelector(selectHasLicenseKey());

  useEffect(() => {
    if (activeTabParam) {
      dispatch(setActiveTab(SettingsTabMap[activeTabParam]));
    } else if (hasLicenseKey) {
      dispatch(setActiveTab(SettingsTab.LICENSE_KEY));
    }
  }, [activeTabParam, dispatch, hasLicenseKey]);

  return (
    <Container>
      <Typography variant="h6" color={VOLCANIC_SAND} sx={{ mb: 3 }}>
        Subscription
      </Typography>
      <>
        <Box sx={{ mb: 3 }}>
          <Tabs value={activeTab} onChange={handleOnChangeTab} indicatorColor="primary">
            <Tab
              color={activeTab === SettingsTab.BILLING ? BISCAY : undefined}
              label={<Typography variant="buttonSmall">Billing</Typography>}
              {...a11yProps(SettingsTab.BILLING)}
              sx={{ textTransform: 'initial', marginRight: '24px' }}
            />
            <Tab
              color={activeTab === SettingsTab.LICENSE_KEY ? BISCAY : undefined}
              label={<Typography variant="buttonSmall">License key</Typography>}
              {...a11yProps(SettingsTab.LICENSE_KEY)}
              sx={{ textTransform: 'initial', marginRight: '24px' }}
            />
            <Tab
              color={activeTab === SettingsTab.PLANS ? BISCAY : undefined}
              label={<Typography variant="buttonSmall">Plans</Typography>}
              {...a11yProps(SettingsTab.PLANS)}
              sx={{ textTransform: 'initial', marginRight: 0 }}
            />
          </Tabs>
        </Box>
        <TabPanel value={activeTab} index={SettingsTab.BILLING}>
          <Billing />
        </TabPanel>
        <TabPanel value={activeTab} index={SettingsTab.LICENSE_KEY}>
          <FormProvider {...methods}>
            <License
              handleActivateLicense={handleActivateLicense}
              handleCancelSubscription={openModal}
            />
          </FormProvider>
        </TabPanel>
        <TabPanel value={activeTab} index={SettingsTab.PLANS}>
          <PlansContainer>
            {plans.map((plan, index) => (
              <Pricing
                key={plan.id}
                plan={plan}
                hideButton={currentPlanIndex > index}
                isActive={isActivePlan(plan.name)}
                onClick={() => handleRedirectToSaas(plan.name)}
              />
            ))}
          </PlansContainer>
        </TabPanel>
      </>
      <CancelSubscription isOpen={isOpen} closeModal={closeModal} />
      <ContactUs isOpen={isContactUsModalOpen} closeModal={closeContactUsModal} />
    </Container>
  );
};

export default Subscription;
