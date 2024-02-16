import React, { FunctionComponent } from 'react';
import Image from 'next/image';

import { CardProps } from '../card';
import Typography from '../typography';
import Tag from '../tag';
import { InstallationType } from '../../types/redux';
import k3dLogo from '../../assets/k3d_logo.svg';
import awsLogo from '../../assets/aws_logo.svg';
import civoLogo from '../../assets/civo_logo.svg';
import digitalOceanLogo from '../../assets/digital_ocean_logo.svg';
import vultrLogo from '../../assets/vultr_logo.svg';
import googleCloudLogo from '../../assets/googleCloud.svg';
import { BISCAY } from '../../constants/colors';

import { CardContainer, DetailsContainer, Link, LabelContainer } from './cloudProviderCard.styled';

export const PROVIDER_OPTIONS: Record<
  InstallationType,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logoSrc: any;
    label: string;
    description: string;
    height: number;
    width: number;
    learnMoreLink?: string;
    beta?: boolean;
  } | null
> = {
  [InstallationType.LOCAL]: {
    logoSrc: k3dLogo,
    label: 'Run Locally',
    description:
      'The fastest way to explore all you can do with Kubefirst. Run Kubefirst for free on a local K3D cluster in less than 5 minutes - without any cloud costs or domain prerequisites.',
    height: 88,
    width: 50,
  },
  [InstallationType.AWS]: {
    logoSrc: awsLogo,
    label: 'AWS',
    description:
      'Our AWS cloud platform can accommodate all of the needs of your enterprise and leverages the free GitHub system at github.com ',
    learnMoreLink: 'https://aws.amazon.com/console',
    height: 30,
    width: 50,
  },
  [InstallationType.CIVO]: {
    logoSrc: civoLogo,
    label: 'Civo',
    description:
      'The cloud native service provider, specializing in managed Kubernetes. A faster, simpler and more cost-effective cloud platform. ',
    learnMoreLink:
      'https://www.civo.com/?utm_source=partner&utm_medium=kubefirstdeploy&utm_campaign=kubefirstdeploy',
    height: 17,
    width: 50,
  },
  [InstallationType.DIGITAL_OCEAN]: {
    logoSrc: digitalOceanLogo,
    label: 'DigitalOcean',
    description:
      'A cloud platform that allows developers to build, deploy, and scale applications. Its simplicity, ease of use and affordable pricing make it a popular choice for small businesses and startups. ',
    learnMoreLink: 'https://www.digitalocean.com/',

    height: 50,
    width: 50,
    beta: false,
  },
  [InstallationType.VULTR]: {
    logoSrc: vultrLogo,
    label: 'Vultr',
    description:
      'A cloud hosting provider that offers high-performance SSD-based cloud servers, block storage, object storage, and dedicated servers in multiple locations worldwide. ',
    learnMoreLink: 'https://www.vultr.com/',
    height: 43,
    width: 50,
    beta: true,
  },
  [InstallationType.GOOGLE]: {
    logoSrc: googleCloudLogo,
    label: 'Google Cloud Platform (GCP)',
    description:
      'High-performance infrastructure for cloud computing, data analytics & machine learning. Secure, reliable and high performance cloud services.',
    learnMoreLink: 'https://cloud.google.com/',
    height: 50,
    width: 51,
    beta: true,
  },
};

export interface CloudProviderCardProps extends CardProps {
  option: InstallationType;
  active?: boolean;
}

const CloudProviderCard: FunctionComponent<CloudProviderCardProps> = ({
  option,
  withHoverEffect = true,
  ...rest
}) => {
  const { logoSrc, label, description, learnMoreLink, height, width, beta } =
    PROVIDER_OPTIONS[option] || {};
  return (
    <CardContainer {...rest} withHoverEffect={withHoverEffect} data-test-id={`${option}-button`}>
      <Image src={logoSrc} alt="logo" width={width} height={height} />
      <DetailsContainer>
        <LabelContainer>
          <Typography variant="subtitle2" color={BISCAY}>
            {label}
          </Typography>
          {beta && <Tag text="BETA" bgColor="light-orange" />}
        </LabelContainer>
        <Typography variant="body2">
          {description}
          {learnMoreLink && (
            <Link href={learnMoreLink} target="_blank">
              {' '}
              Learn more
            </Link>
          )}
        </Typography>
      </DetailsContainer>
    </CardContainer>
  );
};

export default CloudProviderCard;
