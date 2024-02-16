import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../store';
import { createQueryString } from '../../utils/url/formatDomain';
import { ClusterRequestProps, ClusterServices } from '../../types/provision';
import { GitOpsCatalogApp, GitOpsCatalogProps } from '../../types/gitOpsCatalog';
import { addAppToQueue, removeAppFromQueue } from '../slices/cluster.slice';
import { transformObjectToStringKey } from '../../utils/transformObjectToStringKey';
import { createNotification } from '../../redux/slices/notifications.slice';

import { CloudAccount } from '@/types/cloudAccount';

export const installGitOpsApp = createAsyncThunk<
  GitOpsCatalogApp,
  GitOpsCatalogProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('cluster/installGitOpsApp', async ({ app, clusterName, values }, { dispatch }) => {
  dispatch(addAppToQueue(app));
  const formValues = values && transformObjectToStringKey(values);

  const keys = formValues && Object.keys(formValues);

  const secret_keys =
    app.secret_keys &&
    app.secret_keys
      .filter(({ name }) => keys?.includes(name))
      .map(({ name: key }) => ({
        name: key,
        value: formValues && formValues[key],
      }));

  const config_keys =
    app.config_keys &&
    app.config_keys
      .filter(({ name }) => keys?.includes(name))
      .map(({ name: key }) => ({
        name: key,
        value: formValues && formValues[key],
      }));

  const params = {
    config_keys,
    secret_keys,
  };

  const res = await axios.post('/api/proxy', {
    url: `/services/${clusterName}/${app.name}`,
    body: secret_keys?.length || config_keys?.length ? params : undefined,
  });

  if ('error' in res) {
    dispatch(removeAppFromQueue(app));
    throw res.error;
  }

  dispatch(
    createNotification({
      message: `${app.display_name} successfully added to provisioned services in cluster ${clusterName}!`,
      type: 'success',
      snackBarOrigin: { vertical: 'bottom', horizontal: 'right' },
    }),
  );

  return app;
});

export const getClusterServices = createAsyncThunk<
  Array<ClusterServices>,
  ClusterRequestProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('cluster/cluster/getClusterServices', async ({ clusterName }) => {
  const res = await axios.get(`/api/proxy?${createQueryString('url', `/services/${clusterName}`)}`);

  if ('error' in res) {
    throw res.error;
  }
  return res.data?.services;
});

export const getGitOpsCatalogApps = createAsyncThunk<
  Array<GitOpsCatalogApp>,
  void,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('cluster/getGitOpsCatalogApps', async () => {
  const res = await axios.get(`/api/proxy?${createQueryString('url', `/gitops-catalog/apps`)}`);

  if ('error' in res) {
    throw res.error;
  }
  return res.data?.apps;
});

export const getCloudAccounts = createAsyncThunk<Array<CloudAccount>, string, { state: RootState }>(
  'cluster/getCloudAccounts',
  async (clusterName) => {
    return (
      await axios.get<{ cloud_accounts: Array<CloudAccount> }>(
        `/api/proxy?${createQueryString('url', `/secret/${clusterName}/cloud-accounts`)}`,
      )
    ).data.cloud_accounts;
  },
);

export const updateCloudAccounts = createAsyncThunk<
  void,
  { clusterName: string; cloudAccounts: Array<CloudAccount> },
  { state: RootState }
>('cluster/updateClusterTourStatus', async ({ clusterName, cloudAccounts }) => {
  await axios.put<void>('/api/proxy', {
    url: `/secret/${clusterName}/cloud-accounts`,
    body: {
      name: 'cloud-accounts',
      cloud_accounts: cloudAccounts,
    },
  });
});

export const createCloudAccounts = createAsyncThunk<
  void,
  { clusterName: string; cloudAccounts: Array<CloudAccount> },
  { state: RootState }
>('cluster/createCloudAccounts', async ({ clusterName, cloudAccounts }) => {
  await axios.post<void>('/api/proxy', {
    url: `/secret/${clusterName}/cloud-accounts`,
    body: {
      name: 'cloud-accounts',
      cloud_accounts: cloudAccounts,
    },
  });
});

export const getSecret = createAsyncThunk<
  void,
  { clusterName: string; secretName: string },
  { state: RootState }
>('cluster/getSecret', async ({ clusterName, secretName }) => {
  await axios.get<void>('/api/proxy', {
    url: `/secret/${clusterName}/${secretName}`,
  });
});

export const createSecret = createAsyncThunk<
  void,
  { clusterName: string; cloudAccount: CloudAccount },
  { state: RootState }
>('cluster/createSecret', async ({ clusterName, cloudAccount }) => {
  const authValues = cloudAccount.auth && cloudAccount.auth[cloudAccount.type];

  await axios.post<void>('/api/proxy', {
    url: `/secret/${clusterName}/${cloudAccount.name}`,
    body: {
      ...authValues,
    },
  });
});

export const updateSecret = createAsyncThunk<
  void,
  { clusterName: string; cloudAccount: CloudAccount },
  { state: RootState }
>('cluster/updateSecret', async ({ clusterName, cloudAccount }) => {
  const authValues = cloudAccount.auth && cloudAccount.auth[cloudAccount.type];

  await axios.put<void>('/api/proxy', {
    url: `/secret/${clusterName}/${cloudAccount.name}`,
    body: {
      ...authValues,
    },
  });
});
