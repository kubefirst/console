import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import moment from 'moment';

import {
  Container,
  Content,
  RowInfo,
  StyledLabel,
  StyledValue,
  ExternalLink,
  StyledDivider,
  StatusContainer,
} from './ClusterDetails.styled';

import Typography from '@/components/Typography/Typography';
import {
  Cluster,
  ClusterStatus,
  ClusterType,
  DraftCluster,
  ManagementCluster,
} from '@/types/provision';
import StatusIndicator from '@/components/StatusIndicator/StatusIndicator';
import { CLOUD_PROVIDER_DISPLAY_NAME, GIT_PROVIDER_DISPLAY_NAME } from '@/constants';
import Tag from '@/components/Tag/Tag';

export interface ClusterDetailsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'key'> {
  cluster: Cluster | DraftCluster;
  host: ManagementCluster['gitHost'];
  gitOwner: ManagementCluster['gitAuth']['gitOwner'];
}

const ClusterDetails: FunctionComponent<ClusterDetailsProps> = ({
  cluster,
  host,
  gitOwner,
  ...rest
}) => {
  const {
    adminEmail,
    clusterName,
    cloudProvider,
    cloudRegion,
    creationDate,
    domainName,
    subDomainName,
    gitProvider,
    nodeCount,
    instanceSize,
    environment,
    type,
    status,
    gitAuth: { gitUser } = {},
  } = cluster;

  const [available, setAvailable] = useState(status === ClusterStatus.PROVISIONED ?? false);

  useEffect(() => {
    setTimeout(() => setAvailable(true), 10000);
  });

  const fullDomainName = useMemo(
    () => (subDomainName ? `${subDomainName}.${domainName}` : domainName),
    [subDomainName, domainName],
  );

  return (
    <Container {...rest}>
      <StatusContainer>
        <StatusIndicator available>
          <ExternalLink href={`https://argocd.${fullDomainName}/applications/clusters`} available>
            View your Argo CD clusters
          </ExternalLink>
        </StatusIndicator>
        <StatusIndicator available={available}>
          <ExternalLink
            href={`https://${host}/${gitOwner}/gitops/tree/main/registry/clusters/${clusterName}`}
            available={available}
          >
            View your {gitProvider} cluster configuration
          </ExternalLink>
        </StatusIndicator>
      </StatusContainer>

      <StyledDivider />

      <Typography style={{ margin: '16px 0' }} variant="subtitle3">
        Details
      </Typography>

      <Content>
        {/* Domain name */}
        <RowInfo>
          <StyledLabel variant="labelLarge">Cluster domain name</StyledLabel>
          <StyledValue variant="body2">{fullDomainName}</StyledValue>
        </RowInfo>
        {/* Git provider */}
        <RowInfo>
          <StyledLabel variant="labelLarge">Git provider</StyledLabel>
          <StyledValue variant="body2">{GIT_PROVIDER_DISPLAY_NAME[gitProvider]}</StyledValue>
        </RowInfo>
        {/* Environments */}
        <RowInfo>
          <StyledLabel variant="labelLarge">Environments</StyledLabel>
          {environment?.name && <Tag text={environment.name} bgColor={environment.color} />}
        </RowInfo>
        {/* Cloud account */}
        <RowInfo>
          <StyledLabel variant="labelLarge">Cloud account</StyledLabel>
          <StyledValue variant="body2">{CLOUD_PROVIDER_DISPLAY_NAME[cloudProvider]}</StyledValue>
        </RowInfo>
        {/* Cloud region */}
        <RowInfo>
          <StyledLabel variant="labelLarge">Cloud region</StyledLabel>
          <StyledValue variant="body2">{cloudRegion}</StyledValue>
        </RowInfo>
        {/* Instance size */}
        <RowInfo>
          <StyledLabel variant="labelLarge">Instance size</StyledLabel>
          {instanceSize && <StyledValue variant="body2">{instanceSize.toUpperCase()}</StyledValue>}
        </RowInfo>
        {/* Number of nodes */}
        {type !== ClusterType.WORKLOAD_V_CLUSTER && (
          <RowInfo>
            <StyledLabel variant="labelLarge">Number of nodes</StyledLabel>
            <StyledValue variant="body2">{nodeCount}</StyledValue>
          </RowInfo>
        )}
        {/* Alerts email */}
        <RowInfo>
          <StyledLabel variant="labelLarge">Alerts email</StyledLabel>
          <StyledValue variant="body2">{adminEmail}</StyledValue>
        </RowInfo>
        {/* Created */}
        <RowInfo>
          <StyledLabel variant="labelLarge">Created</StyledLabel>
          <StyledValue variant="body2">
            {creationDate && moment(+creationDate).format('DD MMM YYYY, HH:MM:SS')}
          </StyledValue>
        </RowInfo>
        {/* Created by */}
        <RowInfo>
          <StyledLabel variant="labelLarge">Created by</StyledLabel>
          <StyledValue variant="body2">{gitUser}</StyledValue>
        </RowInfo>
      </Content>
    </Container>
  );
};

export default ClusterDetails;
