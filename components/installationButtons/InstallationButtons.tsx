import React, { FunctionComponent } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import Button from '../Button/Button';

import { Container } from './InstallationButtons.styled';

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
      <Button
        variant="outlined"
        color="secondary"
        onClick={onBackButtonClick}
        data-test-id="back-button"
      >
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
        data-test-id="next-button"
      >
        {isLoading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
        {nextButtonText}
      </Button>
    )}
  </Container>
);

export default InstallationButtons;
