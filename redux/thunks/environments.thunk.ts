import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ClusterEnvironment, EnvironmentResponse } from '../../types/provision';
import { createQueryString } from '../../utils/url/formatDomain';
import { mapEnvironmentFromRaw } from '../../utils/mapEnvironmentFromRaw';
import { createNotification } from '../../redux/slices/notifications.slice';
import { EnvMap } from '../../redux/slices/environments.slice';
import { createEnvMap } from '../../utils/createEnvMap';

export const getAllEnvironments = createAsyncThunk<EnvMap, void>(
  'environments/getAllEnvironments',
  async () => {
    try {
      const { data } = await axios.get<EnvironmentResponse[] | null>(
        `/api/proxy?${createQueryString('url', `/environment`)}`,
      );

      return createEnvMap(data ?? []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data.error;
      } else {
        throw error;
      }
    }
  },
);

export const createEnvironment = createAsyncThunk<ClusterEnvironment, ClusterEnvironment>(
  'environments/createEnvironment',
  async (environment) => {
    try {
      const { data } = await axios.post<EnvironmentResponse>('/api/proxy', {
        url: '/environment',
        body: environment,
      });
      return mapEnvironmentFromRaw(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data.error;
      } else {
        throw error;
      }
    }
  },
);

export const updateEnvironment = createAsyncThunk<ClusterEnvironment, ClusterEnvironment>(
  'environments/updateEnvironment',
  async (environment, { dispatch }) => {
    const { id, description, color } = environment;

    try {
      await axios.put<EnvironmentResponse>('/api/proxy', {
        url: `/environment/${id}`,
        body: { description, color },
      });

      dispatch(
        createNotification({
          message: 'Edits have been successfully applied.',
          type: 'success',
          snackBarOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }),
      );

      return environment;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data.error;
      } else {
        throw error;
      }
    }
  },
);

export const deleteEnvironment = createAsyncThunk<ClusterEnvironment['id'], ClusterEnvironment>(
  'environments/deleteEnvironment',
  async (environment, { dispatch }) => {
    try {
      await axios.delete(
        `/api/proxy?${createQueryString('url', `/environment/${environment.id}`)}`,
      );

      dispatch(
        createNotification({
          message: `${environment.name} environment successfully deleted.`,
          type: 'success',
          snackBarOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }),
      );

      return environment.id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data.error;
      } else {
        throw error;
      }
    }
  },
);
