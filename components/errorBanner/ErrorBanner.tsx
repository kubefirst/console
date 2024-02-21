import React, { FunctionComponent } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

import Typography from '../Typography/Typography';
import { VOLCANIC_SAND } from '../../constants/colors';

import { Container, ErrorContainer, Header, List, ListItem } from './ErrorBanner.styled';

export interface ErrorBannerProps {
  details?: string;
  error: Array<string> | string;
}

const ErrorBanner: FunctionComponent<ErrorBannerProps> = ({ error }) => {
  const isErrorArray = Array.isArray(error) && error.length > 1;
  return (
    <Container>
      <Header>
        <ErrorIcon color="error" fontSize="small" />
        <ErrorContainer>
          {isErrorArray ? (
            <>
              <Typography variant="body2" color={VOLCANIC_SAND}>
                <strong>Error</strong>
              </Typography>
              <List>
                {error.map((errorItem) => (
                  <ListItem key={errorItem}>
                    <Typography variant="body2" color={VOLCANIC_SAND}>
                      <div dangerouslySetInnerHTML={{ __html: errorItem }} />
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <Typography variant="body2" color={VOLCANIC_SAND}>
              <div dangerouslySetInnerHTML={{ __html: `<strong>Error </strong>${error}` }} />
            </Typography>
          )}
        </ErrorContainer>
      </Header>
    </Container>
  );
};

export default ErrorBanner;
