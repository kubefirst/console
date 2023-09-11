import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@mui/material';

import Button from '../button';

import { Container } from './installationButtons.styled';

export interface InstallationButtonsProps {
  isLoading?: boolean;
  nextButtonDisabled?: boolean;
  nextButtonText?: string;
  onBackButtonClick?: () => void;
  showBackButton?: boolean;
  showNextButton: boolean;
}

const InstallationButtons: FunctionComponent<InstallationButtonsProps> = ({
  isLoading,
  nextButtonDisabled,
  nextButtonText = 'Next',
  onBackButtonClick,
  showBackButton,
  showNextButton,
  ...rest
}) => (
  <Container {...rest}>
    {showBackButton && (
      <Button variant="outlined" color="secondary" onClick={onBackButtonClick}>
        Back
      </Button>
    )}

    {showNextButton && (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        id="next"
        disabled={nextButtonDisabled || isLoading}
      >
        {isLoading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
        {nextButtonText}
      </Button>
    )}
  </Container>
);

export default InstallationButtons;
