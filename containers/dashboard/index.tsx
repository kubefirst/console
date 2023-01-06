import React, { FunctionComponent, useMemo, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Snackbar } from '@mui/material';

import useStep from '../../hooks/useStep';
import Progress from '../../components/progress';
import Typography from '../../components/typography';
import useInstallation, { InstallationTypes } from '../../hooks/useInstallation';
import Button from '../../components/button';

import {
  Card,
  CardContainer,
  CardDescription,
  CardInfo,
  CardInfoHeader,
  CardLink,
  CartTitle,
  Code,
  Container,
  Content,
  Footer,
  Header,
  InfoContainer,
  Title,
} from './dashboard.styled';

const CARD_ITEMS = [
  {
    description: 'Explore all you can do with Kubefirst with no costs by running locally.',
    title: 'Run Locally',
    type: InstallationTypes.LOCAL,
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    title: 'AWS with GitHub',
    type: InstallationTypes.AWS_GITHUB,
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    title: 'AWS with GitLab',
    type: InstallationTypes.AWS_GITLAB,
  },
];

const Dashboard: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { currentStep, goToNext, goToPrev } = useStep();
  const { info, steps, installationType, onChangeInstallationType, FormFlowComponent } =
    useInstallation();

  const isInfoListDescription = useMemo(
    () => info?.description && Array.isArray(info?.description),
    [info?.description],
  );

  return (
    <Container>
      <Header />
      <Progress activeStep={currentStep} steps={steps} />
      <Title>
        <Typography variant="h6">First, choose your Kubefirst adventure</Typography>
      </Title>
      <Content>
        {currentStep === 0 ? (
          <>
            <CardContainer>
              {CARD_ITEMS.map(({ description, title, type }) => {
                const isActive = installationType === type;
                const isDescriptionList = Array.isArray(description);

                return (
                  <Card
                    key={title}
                    onClick={() => onChangeInstallationType(type)}
                    isActive={isActive}
                  >
                    <CartTitle>
                      <Typography variant="h6">{title}</Typography>
                    </CartTitle>
                    <CardDescription isActive={isActive}>
                      {isDescriptionList ? (
                        <ol type="1">
                          {description.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ol>
                      ) : (
                        <Typography variant="body2" sx={{ letterSpacing: 0 }}>
                          {description}
                        </Typography>
                      )}
                    </CardDescription>
                  </Card>
                );
              })}
            </CardContainer>
            <InfoContainer>
              <CardInfo>
                <CardInfoHeader>
                  <InfoOutlinedIcon htmlColor="#2563EB" />
                  <Typography variant="subtitle3">{info?.title}</Typography>
                </CardInfoHeader>
                <CardDescription>
                  {isInfoListDescription ? (
                    <ol type="1">
                      {(info?.description as string[]).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    <Typography variant="body2">{info?.description}</Typography>
                  )}
                </CardDescription>
                {info?.code && (
                  <Code>
                    <Typography variant="body2">{info?.code}</Typography>
                    <CopyToClipboard text={info?.code} onCopy={handleClick}>
                      <ContentCopyOutlinedIcon />
                    </CopyToClipboard>
                    <Snackbar
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      open={open}
                      autoHideDuration={3000}
                      onClose={handleClose}
                      message="Copied!"
                    />
                  </Code>
                )}
                <CardLink href={info?.ctaLink}>
                  <Typography variant="tooltip">{info?.ctaDescription}</Typography>
                  <LaunchOutlinedIcon fontSize="small" />
                </CardLink>
              </CardInfo>
            </InfoContainer>
          </>
        ) : (
          <FormFlowComponent step={currentStep} />
        )}
      </Content>
      <Footer>
        {currentStep > 0 && (
          <Button variant="outlined" onClick={() => currentStep > 0 && goToPrev()}>
            Back
          </Button>
        )}
        <Button variant="contained" onClick={goToNext}>
          Next
        </Button>
      </Footer>
    </Container>
  );
};

export default Dashboard;
