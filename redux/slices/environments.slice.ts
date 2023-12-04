import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ClusterEnvironment } from '../../types/provision';
import {
  createEnvironment,
  deleteEnvironment,
  getAllEnvironments,
  updateEnvironment,
} from '../thunks/environments.thunk';
import { EnvCache } from '../../types/redux';

export type EnvMap = Record<ClusterEnvironment['name'], ClusterEnvironment>;
export interface EnvironmentsState {
  loading: boolean;
  environments: EnvMap;
  /**
   * environments cache for environments in use by cluster(s)
   */
  boundEnvironments: EnvCache;
  error?: string;
}

export const initialState: EnvironmentsState = {
  loading: false,
  environments: {},
  boundEnvironments: {},
};

const environmentsSlice = createSlice({
  name: 'environments',
  initialState,
  reducers: {
    setEnvironments: (state, { payload }: PayloadAction<EnvMap>) => {
      state.environments = payload;
    },
    setBoundEnvironments: (state, { payload }: PayloadAction<EnvCache>) => {
      state.boundEnvironments = payload;
    },
    setEnvironmentError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
    clearEnvironmentError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnvironments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEnvironments.rejected, (state, action) => {
        state.loading = false;
        state.environments = {};
        state.error = action.error.message;
      })
      .addCase(getAllEnvironments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.environments = payload;
      })
      .addCase(createEnvironment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEnvironment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createEnvironment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.environments[payload.id] = payload;
      })
      .addCase(deleteEnvironment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEnvironment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteEnvironment.fulfilled, (state, { payload: envId }) => {
        state.loading = false;
        delete state.environments[envId];
      })
      .addCase(updateEnvironment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEnvironment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateEnvironment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.environments[payload.id] = payload;
      });
  },
});

export const { setEnvironments, setBoundEnvironments, setEnvironmentError, clearEnvironmentError } =
  environmentsSlice.actions;

export const environmentsReducer = environmentsSlice.reducer;
