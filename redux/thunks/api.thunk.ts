import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '@/redux/store';
import {
  ClusterResponse,
  Cluster,
  ImageRepository,
  ClusterType,
  ClusterStatus,
  ClusterEnvironment,
  WorkloadCluster,
  ClusterQueue,
  DraftCluster,
} from '@/types/provision';
import { createQueryString } from '@/utils/url/formatDomain';
import { InstallValues, InstallationType } from '@/types/redux';
import { TelemetryClickEvent } from '@/types/telemetry';
import { mapClusterFromRaw } from '@/utils/mapClustersFromRaw';
import { GitProtocol } from '@/types';
import { RESERVED_DRAFT_CLUSTER_NAME } from '@/constants';
import { getCloudProviderAuth } from '@/utils/getCloudProviderAuth';

export const createCluster = createAsyncThunk<
  ClusterQueue,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/provisioning', async (_, { getState }) => {
  const {
    installation: { installType, gitProvider, values },
    git
  } = getState();

  const params = {
    clusterName: values?.clusterName,
    admin_email: values?.alertsEmail,
    cloud_provider: installType?.toString(),
    cloud_region: values?.cloudRegion,
    domain_name: values?.domainName,
    subdomain_name: values?.subDomain,
    git_provider: gitProvider,
    gitops_template_url: values?.gitopsTemplateUrl,
    gitops_template_branch: "feat-custom-repo",
    gitopsRepoName: git.gitopsreponame,
    metaphorRepoName: git.metaphorreponame,
    adminTeamName: git.adminteamname,
    developerTeamName: git.developerteamname,
    git_protocol: values?.useHttps ? GitProtocol.HTTPS : GitProtocol.SSH,
    dns_provider: values?.dnsProvider,
    ecr: values?.imageRepository === ImageRepository.ECR,
    type: ClusterType.MANAGEMENT,
    force_destroy: values?.forceDestroyTerraform,
    node_type: values?.instanceSize,
    node_count: values?.nodeCount,
    git_auth: {
      git_owner: values?.gitOwner,
      git_token: values?.gitToken,
    },
    cloudflare_auth: {
      api_token: values?.cloudflareToken,
      origin_ca_issuer_key: values?.cloudflareOriginCaIssuerKey,
    },
    aws_auth: {
      ...values?.aws_auth,
    },
    civo_auth: {
      ...values?.civo_auth,
    },
    do_auth: {
      ...values?.do_auth,
    },
    vultr_auth: {
      ...values?.vultr_auth,
    },
    google_auth: {
      ...values?.google_auth,
    },
    akamai_auth: {
      ...values?.akamai_auth,
    },
    log_file: `log_${new Date().getTime()}.log`,
    install_kubefirst_pro: !values?.skipInstallPro,
  };

  await axios.post<{ message: string }>('/api/proxy', {
    url: `/cluster/${values?.clusterName}`,
    body: params,
  });

  return { clusterName: values?.clusterName as string, status: ClusterStatus.PROVISIONING };
});

export const createWorkloadCluster = createAsyncThunk<
  WorkloadCluster,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/createWorkloadCluster', async (_, { getState }) => {
  const { managementCluster, clusterMap } = getState().api;

  const draftCluster = clusterMap[RESERVED_DRAFT_CLUSTER_NAME];

  if (!managementCluster) {
    throw new Error('missing management cluster');
  }

  if (!draftCluster) {
    throw new Error('missing draft cluster');
  }

  const clusterEnvironment = !draftCluster.environment
    ? undefined
    : {
        name: draftCluster.environment?.name,
        color: draftCluster.environment?.color,
        description: draftCluster.environment?.description,
      };

  const { cluster_id } = (
    await axios.post<{ cluster_id: string }>(`/api/proxy?target=ee`, {
      url: `/cluster/${managementCluster?.clusterId}`,
      body: {
        cluster_name: draftCluster.clusterName,
        cloud_region: draftCluster.cloudRegion,
        node_type: draftCluster.instanceSize,
        node_count: draftCluster.nodeCount,
        environment: clusterEnvironment,
        cluster_type: draftCluster.type,
      },
    })
  ).data;

  const provisioningWorkloadCluster: WorkloadCluster = {
    ...draftCluster,
    clusterId: cluster_id,
    status: ClusterStatus.PROVISIONING,
    environment: draftCluster.environment as ClusterEnvironment,
  };

  return provisioningWorkloadCluster;
});

export const getClusters = createAsyncThunk<
  ReturnType<typeof mapClusterFromRaw>,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/getClusters', async () => {
  const res = await axios.get<ClusterResponse[]>(
    `/api/proxy?${createQueryString('url', `/cluster`)}`,
  );

  if (!res.data || !res.data.length) {
    throw new Error('No clusters found');
  }

  // only process single expected management cluster
  return mapClusterFromRaw(res.data[0]);
});

export const deleteCluster = createAsyncThunk<
  ClusterQueue,
  Cluster['clusterName'],
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/cluster/delete', async (clusterName, { getState }) => {
  const {
    api: { managementCluster, clusterMap },
  } = getState();

  const { clusterId } = clusterMap[clusterName];

  // returned cluster_id is unused at this time.
  if (managementCluster) {
    await axios.delete<{ cluster_id: string }>(
      `/api/proxy?${createQueryString(
        'url',
        `/cluster/${managementCluster.clusterId}/${clusterId}`,
      )}&target=ee`,
    );
  }

  return { clusterName, status: ClusterStatus.DELETING };
});

export const getCloudRegions = createAsyncThunk<
  Array<string>,
  { values: InstallValues | Cluster; installType?: InstallationType },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getCloudRegions', async ({ values, installType }) => {
  const { regions } = (
    await axios.post<{ regions: Array<string> }>('/api/proxy', {
      url: `/region/${installType || (values as Cluster).cloudProvider}`,
      body:
        installType === InstallationType.AWS ? { ...values, cloud_region: 'us-east-1' } : values,
    })
  ).data;

  return regions;
});

export const getCloudDomains = createAsyncThunk<
  Array<string>,
  {
    region: string;
    installType?: InstallationType;
    values?: InstallValues;
    cloudflareToken?: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getCloudDomains', async ({ cloudflareToken, installType, values, region }) => {
  const { domains } = (
    await axios.post<{ domains: Array<string> }>('/api/proxy', {
      url: `/domain/${cloudflareToken ? 'cloudflare' : installType}`,
      body: {
        ...values,
        cloud_region: region,
        cloudflare_auth: {
          api_token: cloudflareToken,
        },
      },
    })
  ).data;

  return domains;
});

export const getInstanceSizes = createAsyncThunk<
  string[],
  { region: string; installType?: InstallationType; values?: InstallValues; zone?: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getInstanceSizes', async ({ region, installType, values, zone }) => {
  const { instance_sizes } = (
    await axios.post<{ instance_sizes: string[] }>('/api/proxy', {
      url: `/instance-sizes/${installType}`,
      body: {
        ...values,
        cloud_region: region,
        cloud_zone: zone,
      },
    })
  ).data;

  return instance_sizes;
});

// currently only needed for google install type
export const getRegionZones = createAsyncThunk<
  string[],
  { region: string; values?: InstallValues },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/getRegionZones', async ({ region, values }) => {
  const { zones } = (
    await axios.post<{ zones: string[] }>('/api/proxy', {
      url: '/zones',
      body: {
        ...values,
        cloud_region: region,
      },
    })
  ).data;

  return zones;
});

export const resetClusterProgress = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/resetClusterProgress', async (_, { getState }) => {
  const { managementCluster } = getState().api;

  await axios.post<{ regions: Array<string> }>('/api/proxy', {
    url: `/cluster/${managementCluster?.clusterName}/reset_progress`,
  });
});

export const sendTelemetryEvent = createAsyncThunk<
  void,
  TelemetryClickEvent,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/sendTelemetryEvent', async (body, { getState }) => {
  const { managementCluster } = getState().api;

  await axios.post('/api/proxy', {
    url: `/telemetry/${managementCluster?.clusterName}`,
    body,
  });
});

export const downloadKubeconfig = createAsyncThunk<
  string,
  { presentedCluster: Cluster | DraftCluster },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('api/downloadKubeconfig', async ({ presentedCluster }, { getState }) => {
  const { managementCluster } = getState().api;

  const { clusterName, cloudProvider, cloudRegion, type } = presentedCluster;
  if (managementCluster) {
    const { key, value } = getCloudProviderAuth(managementCluster);
    const {
      data: { config },
    } = await axios.post<{ config: string }>(`/api/proxy`, {
      url: `/kubeconfig/${cloudProvider}`,
      body: {
        cluster_name: clusterName,
        man_clust_name: managementCluster.clusterName,
        vcluster: type !== ClusterType.MANAGEMENT,
        cloud_region: cloudRegion,
        [`${key}_auth`]: value,
      },
    });

    return `data:text/yaml;chatset=utf-8,${encodeURIComponent(config)}`;
  } else {
    throw new Error('no management cluster found');
  }
});
