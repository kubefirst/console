import React, { FunctionComponent, useCallback } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import CopyToClipboard from 'react-copy-to-clipboard';

import Typography from '../Typography/Typography';
import { TRUE_BLUE, VOLCANIC_SAND } from '../../constants/colors';
import { InstallationInfo, InstallationType } from '../../types/redux';
import CivoLogo from '../../assets/civo.svg';
import AwsLogo from '../../assets/aws_logo.svg';
import DigitalOceanLogo from '../../assets/digital_ocean_logo.svg';
import VultrLogo from '../../assets/vultr_logo.svg';
import GoogleCloudLogo from '../../assets/googleCloud.svg';
import { useAppDispatch } from '../../redux/store';
import { createNotification } from '../../redux/slices/notifications.slice';

import {
  Card,
  CardInfoHeader,
  CardDescription,
  Code,
  Link,
  LinkContent,
  DescriptionItem,
  Image,
} from './InstallationInfoCard.styled';

const MARKETPLACE_LOGOS: Record<InstallationType, unknown | null> = {
  [InstallationType.LOCAL]: null,
  [InstallationType.AWS]: AwsLogo,
  [InstallationType.CIVO]: CivoLogo,
  [InstallationType.DIGITAL_OCEAN]: DigitalOceanLogo,
  [InstallationType.VULTR]: VultrLogo,
  [InstallationType.GOOGLE]: GoogleCloudLogo,
};

interface InstallationInfoCardProps {
  info: InstallationInfo;
  installationType?: InstallationType;
  isMarketplace?: boolean;
}

const InstallationInfoCard: FunctionComponent<InstallationInfoCardProps> = ({
  info,
  installationType,
  isMarketplace = false,
  ...rest
}) => {
  const { title, description, code, ctaLink, ctaDescription } = info;
  const logo = MARKETPLACE_LOGOS[installationType as InstallationType];

  const dispatch = useAppDispatch();

  const handleCopy = useCallback(() => {
    dispatch(
      createNotification({
        message: 'Copied!',
        type: 'success',
        snackBarOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      }),
    );
  }, [dispatch]);

  return (
    <Card {...rest}>
      {isMarketplace && <Image src={logo as string} alt="prerequisites-logo" />}
      <CardInfoHeader>
        {!isMarketplace && <InfoOutlinedIcon htmlColor={TRUE_BLUE} />}
        <Typography variant="subtitle3" color={VOLCANIC_SAND}>
          {title}
        </Typography>
      </CardInfoHeader>
      <CardDescription>
        {Array.isArray(description) ? (
          description.map((item, index) => (
            <DescriptionItem key={index}>
              <Typography variant="body2" color={VOLCANIC_SAND}>
                {index + 1}.
              </Typography>
              <Typography variant="body2" color={VOLCANIC_SAND}>
                <div dangerouslySetInnerHTML={{ __html: item }}></div>
              </Typography>
            </DescriptionItem>
          ))
        ) : (
          <Typography variant="labelLarge" color={VOLCANIC_SAND}>
            {description}
          </Typography>
        )}
      </CardDescription>
      {code && (
        <Code>
          <Typography variant="body2">{code}</Typography>
          <CopyToClipboard text={code} onCopy={handleCopy}>
            <ContentCopyOutlinedIcon />
          </CopyToClipboard>
        </Code>
      )}
      {ctaLink && (
        <Link
          href={{
            pathname: ctaLink,
          }}
          target="_blank"
        >
          <LinkContent>
            <Typography variant="tooltip">{ctaDescription}</Typography>
            <LaunchOutlinedIcon fontSize="small" />
          </LinkContent>
        </Link>
      )}
    </Card>
  );
};

export default InstallationInfoCard;
