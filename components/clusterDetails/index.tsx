import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import {
  Container,
  Content,
  ColumnInfo,
  RowInfo,
  StyledLabel,
  StyledValue,
  InfoIcon,
  Link,
  StatusContainer,
  EnvInfo,
  Info,
} from './clusterDetails.styled';

import Typography from '@/components/typography';
import Column from '@/components/column';
import {
  Cluster,
  ClusterStatus,
  ClusterType,
  DraftCluster,
  ManagementCluster,
} from '@/types/provision';
import Tag from '@/components/tag';
import { BISCAY, VOLCANIC_SAND } from '@/constants/colors';
import { EnvMap } from '@/redux/slices/environments.slice';

export interface ClusterDetailsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'key'> {
  cluster: Cluster | DraftCluster;
  host: ManagementCluster['gitHost'];
  gitOwner: ManagementCluster['gitAuth']['gitOwner'];
  environments: EnvMap;
}

const ClusterDetails: FunctionComponent<ClusterDetailsProps> = ({
  cluster,
  host,
  gitOwner,
  environments,
  ...rest
}) => {
  const {
    clusterName,
    environment,
    adminEmail,
    cloudProvider,
    cloudRegion,
    creationDate,
    domainName,
    gitProvider,
    nodeCount,
    instanceSize,
    status,
    type,
    gitAuth: { gitUser } = {},
  } = cluster;

  const CLUSTER_REPO_BASE_LINK = `https://${host}/${gitOwner}/gitops/tree/main`;

  const presentedLink = `/registry/clusters/${clusterName}`;

  const { name, color, description } = environments[environment?.id ?? ''] ?? {};

  return (
    <Container {...rest}>
      <EnvInfo>
        <Typography variant="subtitle1" color={BISCAY}>
          {clusterName}
        </Typography>
        {name && color && <Tag text={name} bgColor={color} />}
        {description && (
          <Typography variant="body2" color={VOLCANIC_SAND}>
            {description}
          </Typography>
        )}
        <StatusContainer>
          <Column>
            {status !== ClusterStatus.PROVISIONED ? (
              <Info>
                <InfoIcon />
                <Column>
                  <Typography variant="body2">
                    The cluster has been registered and will be synced
                  </Typography>
                  <Typography variant="body2">
                    Provisioning details:{' '}
                    <Link target="_blank" href={CLUSTER_REPO_BASE_LINK + presentedLink}>
                      {presentedLink}
                    </Link>
                  </Typography>
                </Column>
              </Info>
            ) : (
              <Typography>
                Cluster details:{' '}
                <Link target="_blank" href={CLUSTER_REPO_BASE_LINK + presentedLink}>
                  {presentedLink}
                </Link>{' '}
              </Typography>
            )}
          </Column>
        </StatusContainer>
      </EnvInfo>

      <Content>
        {/* Top Row */}
        <RowInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Cluster domain name</StyledLabel>
            <StyledValue variant="body2">{domainName}</StyledValue>
          </ColumnInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Alerts email</StyledLabel>
            <StyledValue variant="body2">{adminEmail}</StyledValue>
          </ColumnInfo>
        </RowInfo>

        {/* Second Row */}
        <RowInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Created</StyledLabel>
            <StyledValue variant="body2" data-test-id="creation-date">
              {creationDate && moment(+creationDate).format('DD MMM YYYY, HH:mm:ss')}
            </StyledValue>
          </ColumnInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Created by</StyledLabel>
            <StyledValue variant="body2">{gitUser}</StyledValue>
          </ColumnInfo>
        </RowInfo>

        {/* Third Row */}
        <RowInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">GIT provider</StyledLabel>
            <StyledValue variant="body2">{gitProvider}</StyledValue>
          </ColumnInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Cloud provider</StyledLabel>
            <StyledValue variant="body2">{cloudProvider}</StyledValue>
          </ColumnInfo>
        </RowInfo>

        {/* Fourth Row */}
        <RowInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Cloud region</StyledLabel>
            <StyledValue variant="body2">{cloudRegion}</StyledValue>
          </ColumnInfo>
          <ColumnInfo>
            <StyledLabel variant="labelLarge">Number of nodes</StyledLabel>
            <StyledValue variant="body2">{nodeCount}</StyledValue>
          </ColumnInfo>
        </RowInfo>

        {/* Fifth Row */}
        {type !== ClusterType.MANAGEMENT && (
          <RowInfo>
            <ColumnInfo>
              <StyledLabel variant="labelLarge">Instance size</StyledLabel>
              <StyledValue variant="body2" style={{ width: '100%' }}>
                {instanceSize}
              </StyledValue>
            </ColumnInfo>
          </RowInfo>
        )}
      </Content>
    </Container>
  );
};

export default styled(ClusterDetails)<ClusterDetailsProps>``;
