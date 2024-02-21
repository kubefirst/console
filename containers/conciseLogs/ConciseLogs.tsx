import React, { FunctionComponent, useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { CLUSTER_CHECKS } from '../../constants/cluster';
import { useAppSelector } from '../../redux/store';
import { InstallationType } from '../../types/redux';

import {
  Container,
  EstimatedTime,
  Step,
  StepLabel,
  StepNumber,
  Success,
  SuccessText,
} from './ConciseLogs.styled';

const ESTIMATED_TIMES_BY_CLOUD: Record<InstallationType, number> = {
  [InstallationType.LOCAL]: 7,
  [InstallationType.AWS]: 40,
  [InstallationType.CIVO]: 15,
  [InstallationType.DIGITAL_OCEAN]: 35,
  [InstallationType.VULTR]: 25,
  [InstallationType.GOOGLE]: 25,
};
export interface ConciseLogsProps {
  completedSteps: Array<{ label: string; order: number }>;
}

const ConciseLogs: FunctionComponent<ConciseLogsProps> = ({ completedSteps }) => {
  const { installType, isError, isProvisioned, lastErrorCondition } = useAppSelector(
    ({ api, installation }) => ({
      installType: installation.installType,
      ...api,
    }),
  );

  const lastStep = useMemo(() => {
    if (completedSteps.length < Object.keys(CLUSTER_CHECKS).length) {
      const nextStep = Object.values(CLUSTER_CHECKS)[completedSteps.length];
      return nextStep;
    }

    return null;
  }, [completedSteps.length]);

  const estimatedTime = useMemo(
    () => ESTIMATED_TIMES_BY_CLOUD[installType as InstallationType],
    [installType],
  );

  return (
    <Container>
      <EstimatedTime>
        <StepLabel color="secondary">⏰ Estimated time: {estimatedTime} minutes</StepLabel>
      </EstimatedTime>
      {sortBy(completedSteps, 'order').map((step, index) => (
        <Step key={index}>
          <>✅</>
          <StepNumber>{`[${index + 1}/${Object.keys(CLUSTER_CHECKS).length}]`}</StepNumber>
          <StepLabel color="secondary">{step.label}</StepLabel>{' '}
        </Step>
      ))}
      {!isError && lastStep && (
        <Step>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress size={15} sx={{ color: '#FFD700' }} />
          </Box>
          <StepNumber>{`[${completedSteps.length + 1}/${
            Object.keys(CLUSTER_CHECKS).length
          }]`}</StepNumber>
          <StepLabel color="secondary">{lastStep.label}</StepLabel>{' '}
        </Step>
      )}
      {!isProvisioned && !lastStep && !isError && (
        <Step>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress size={15} sx={{ color: '#FFD700' }} />
          </Box>
          <StepNumber>{`[${completedSteps.length + 1}/${
            Object.keys(CLUSTER_CHECKS).length + 1
          }]`}</StepNumber>
          <StepLabel color="secondary">Preparing kubefirst console</StepLabel>{' '}
        </Step>
      )}
      {isError && (
        <Step>
          <>❌</>
          <StepLabel color="secondary">Error: {lastErrorCondition}</StepLabel>
        </Step>
      )}
      {isProvisioned && (
        <Success>
          <>🎉</>
          <SuccessText color="#bef264">Success</SuccessText>
          <SuccessText color="secondary">Cluster Provisioned</SuccessText>
        </Success>
      )}
    </Container>
  );
};

export default ConciseLogs;
