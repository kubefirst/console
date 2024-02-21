'use client';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { InstallationsSelection } from '../InstallationsSelection/InstallationsSelection';
import { ClusterForms } from '../ClusterForms/ClusterForms';
import AdvancedOptions from '../ClusterForms/shared/AdvancedOptions/AdvancedOptions';

import {
  AdvancedOptionsContainer,
  ErrorContainer,
  Form,
  FormContent,
  FormFooter,
} from './Provision.styled';

import InstallationStepContainer from '@/components/InstallationStepContainer/InstallationStepContainer';
import InstallationInfoCard from '@/components/InstallationInfoCard/InstallationInfoCard';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Button from '@/components/Button/Button';
import {
  clearError,
  setError,
  setInstallType,
  setInstallValues,
  setInstallationStep,
} from '@/redux/slices/installation.slice';
import { clearClusterState, clearValidation } from '@/redux/slices/api.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createCluster, resetClusterProgress } from '@/redux/thunks/api.thunk';
import { useInstallation } from '@/hooks/useInstallation';
import { InstallValues, InstallationType } from '@/types/redux';
import { GitProvider } from '@/types';
import { AUTHENTICATION_ERROR_MSG, DEFAULT_CLOUD_INSTANCE_SIZES } from '@/constants';
import { useQueue } from '@/hooks/useQueue';
import LearnMore from '@/components/LearnMore/LearnMore';

const FOOTER_LINKS_INFO: Record<number, { linkTitle: string; href: string }> = {
  1: {
    linkTitle: 'authentication',
    href: 'https://docs.kubefirst.io/do/quick-start/install/cli/#github-prerequisites',
  },
  2: {
    linkTitle: 'configuring your cluster',
    href: 'https://docs.kubefirst.io/do/quick-start/install/ui#step-2-install-your-kubefirst-management-cluster',
  },
};

const Provision: FunctionComponent = () => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const dispatch = useAppDispatch();
  const { deleteClusterFromQueue } = useQueue();

  const {
    authErrors,
    error,
    installType,
    installMethod,
    installationStep,
    isAuthenticationValid,
    isLoading,
    isProvisioned,
    installValues,
    gitProvider,
  } = useAppSelector(({ api, config, git, installation }) => ({
    authErrors: git.errors,
    error: installation.error,
    gitProvider: installation.gitProvider,
    installType: installation.installType,
    isAuthenticationValid: api.isAuthenticationValid,
    isClusterZero: config.isClusterZero,
    isLoading: api.loading,
    isProvisioned: api.isProvisioned,
    installMethod: config.installMethod,
    installationStep: installation.installationStep,
    installValues: installation.values,
  }));

  const isMarketplace = useMemo(() => installMethod?.includes('marketplace'), [installMethod]);

  const { stepTitles, installTitles, info, isAuthStep, isProvisionStep, isSetupStep } =
    useInstallation(
      installType as InstallationType,
      gitProvider as GitProvider,
      installationStep,
      !!isMarketplace,
    );

  const { instanceSize, nodeCount } = useMemo(
    () => DEFAULT_CLOUD_INSTANCE_SIZES[installType ?? InstallationType.LOCAL],
    [installType],
  );

  const methods = useForm<InstallValues>({
    mode: 'onChange',
    defaultValues: {
      instanceSize,
      nodeCount,
    },
  });

  const {
    formState: { isValid: isFormValid },
    getValues,
    setValue,
    trigger,
    handleSubmit,
  } = methods;

  const installTitle = useMemo(
    () => installTitles[installationStep],
    [installTitles, installationStep],
  );

  const hasInfo = useMemo(() => !!info?.title, [info?.title]);

  const isLastStep = useMemo(
    () => installationStep === stepTitles.length - 1,
    [installationStep, stepTitles.length],
  );

  const isValid = useMemo(() => {
    if (installationStep === 0 && !isMarketplace) {
      return !!gitProvider && !!installType;
    } else if (isProvisionStep) {
      return isProvisioned;
    } else if (isAuthStep && isAuthenticationValid === false) {
      return true;
    }

    return isFormValid && !error && !authErrors.length;
  }, [
    authErrors.length,
    error,
    gitProvider,
    installType,
    installationStep,
    isAuthStep,
    isAuthenticationValid,
    isFormValid,
    isMarketplace,
    isProvisionStep,
    isProvisioned,
  ]);

  const handleGoNext = useCallback(() => {
    dispatch(setInstallationStep(installationStep + 1));
    dispatch(clearError());

    if (isProvisioned) {
      dispatch(clearClusterState());
    }
    trigger();
  }, [dispatch, installationStep, isProvisioned, trigger]);

  const handleBackButtonClick = useCallback(() => {
    dispatch(clearValidation());
    dispatch(clearError());

    dispatch(setInstallationStep(installationStep - 1));
    trigger();
  }, [dispatch, installationStep, trigger]);

  const onSubmit = async (values: InstallValues) => {
    if (installationStep === 0 && !isMarketplace) {
      // reset and pass suggested instance size and nodeCount
      // so if user does change install type/cloud provider
      // the correct defaults will be present
      setValue('instanceSize', instanceSize);
      setValue('nodeCount', nodeCount);
      return handleGoNext();
    }

    if (isValid) {
      dispatch(setInstallValues(values));

      if (isSetupStep) {
        try {
          await provisionCluster();
          handleGoNext();
        } catch (error) {
          //todo: error handling to be defined
        }
      } else {
        handleGoNext();
      }
    }
  };

  const provisionCluster = useCallback(async () => {
    const values = getValues();

    if (error) {
      await dispatch(resetClusterProgress());
      deleteClusterFromQueue(
        (values.clusterName as string) || (installValues?.clusterName as string),
      );
    }

    dispatch(clearError());
    dispatch(clearClusterState());

    await dispatch(createCluster());
  }, [deleteClusterFromQueue, dispatch, error, getValues, installValues?.clusterName]);

  const { linkTitle = '', href = '#' } = FOOTER_LINKS_INFO[installationStep] ?? {};

  const form = useMemo(() => {
    if (installationStep === 0 && !isMarketplace) {
      return <InstallationsSelection />;
    }

    return (
      <>
        <FormContent
          hasInfo={hasInfo}
          isLastStep={isLastStep}
          isProvisionStep={isProvisionStep}
          footerContent={
            isAuthStep || isSetupStep ? (
              <FormFooter>
                <LearnMore href={href} linkTitle={linkTitle} description="Learn more about" />
              </FormFooter>
            ) : null
          }
        >
          {error || authErrors.length ? (
            <ErrorContainer>
              <ErrorBanner error={error || authErrors} />
              {isProvisionStep && (
                <Button variant="contained" color="primary" onClick={provisionCluster}>
                  Retry
                </Button>
              )}
            </ErrorContainer>
          ) : null}
          <ClusterForms currentStep={isMarketplace ? installationStep + 1 : installationStep} />
        </FormContent>
        {isSetupStep && installType && ![InstallationType.LOCAL].includes(installType) && (
          <AdvancedOptionsContainer
            footerContent={
              showAdvancedOptions ? (
                <FormFooter>
                  <LearnMore
                    href="https://docs.kubefirst.io/do/explore/gitops#using-your-own-gitops-template-repository-fork "
                    linkTitle="Customizing the GitOps template"
                    description="Learn more about"
                  />
                </FormFooter>
              ) : null
            }
          >
            <AdvancedOptions
              advancedOptionsChecked={showAdvancedOptions}
              onAdvancedOptionsChange={(checked) => setShowAdvancedOptions(checked)}
            />
          </AdvancedOptionsContainer>
        )}
      </>
    );
  }, [
    installationStep,
    isMarketplace,
    hasInfo,
    isLastStep,
    isProvisionStep,
    error,
    authErrors,
    provisionCluster,
    isSetupStep,
    isAuthStep,
    installType,
    showAdvancedOptions,
    linkTitle,
    href,
  ]);

  useEffect(() => {
    if (isAuthStep && isAuthenticationValid === false) {
      dispatch(setError({ error: AUTHENTICATION_ERROR_MSG }));
    } else if (isAuthStep && isAuthenticationValid) {
      handleGoNext();
    }
  }, [dispatch, handleGoNext, isAuthStep, isAuthenticationValid]);

  useEffect(() => {
    if (isMarketplace && installMethod) {
      const [cloud] = installMethod.split('-') || [''];
      dispatch(setInstallType(cloud as InstallationType));
    }
  }, [dispatch, installMethod, installationStep, isMarketplace]);

  return (
    <FormProvider {...methods}>
      <Form component="form" onSubmit={handleSubmit(onSubmit)} data-test-id="form-section">
        <InstallationStepContainer
          activeStep={installationStep}
          steps={stepTitles}
          installationTitle={installTitle}
          showBackButton={
            installationStep < stepTitles.length - 1 && installationStep > 0 && !isProvisionStep
          }
          onBackButtonClick={handleBackButtonClick}
          nextButtonText={isSetupStep ? 'Create cluster' : 'Next'}
          nextButtonDisabled={!isValid}
          hasInfo={hasInfo}
          isLoading={isLoading}
          isProvisionStep={isProvisionStep}
          showNextButton={installationStep < stepTitles.length - 1}
        >
          {form}
          {info && (
            <InstallationInfoCard
              info={info}
              isMarketplace={isMarketplace}
              installationType={installType}
            />
          )}
        </InstallationStepContainer>
      </Form>
    </FormProvider>
  );
};

export default Provision;
