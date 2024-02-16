import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getCloudAccounts,
  getClusterServices,
  getGitOpsCatalogApps,
  installGitOpsApp,
} from '@/redux/thunks/cluster.thunk';
import { ManagementCluster, ClusterServices, WorkloadCluster } from '@/types/provision';
import { GitOpsCatalogApp } from '@/types/gitOpsCatalog';
import { CloudAccount } from '@/types/cloudAccount';

export interface ConfigState {
  selectedCluster?: ManagementCluster | WorkloadCluster;
  cloudAccounts: Array<CloudAccount>;
  clusterServices: Array<ClusterServices>;
  gitOpsCatalogApps: Array<GitOpsCatalogApp>;
  appsQueue: Array<string>;
}

export const initialState: ConfigState = {
  selectedCluster: undefined,
  clusterServices: [],
  cloudAccounts: [],
  gitOpsCatalogApps: [],
  appsQueue: [],
};

const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    setSelectedCluster: (state, { payload }: PayloadAction<ConfigState['selectedCluster']>) => {
      state.selectedCluster = payload;
    },
    addAppToQueue: (state, { payload }: PayloadAction<GitOpsCatalogApp>) => {
      state.appsQueue.push(payload.name);
    },
    removeAppFromQueue: (state, { payload }: PayloadAction<GitOpsCatalogApp>) => {
      state.appsQueue = state.appsQueue.filter((name) => name !== payload.name);
    },
    resetClusterServices: (state) => {
      state.clusterServices = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClusterServices.fulfilled, (state, { payload }) => {
        state.clusterServices = payload;
      })
      .addCase(getClusterServices.rejected, (state) => {
        state.clusterServices = [];
      })
      .addCase(installGitOpsApp.fulfilled, (state, { payload }) => {
        state.appsQueue = state.appsQueue.filter((name) => name !== payload.name);

        const { name, description, image_url } = payload;
        state.clusterServices.push({
          default: false,
          description: description as string,
          name,
          image: image_url,
          links: [],
        });
      })
      .addCase(installGitOpsApp.rejected, (state) => {
        const queue = Object.assign(state.appsQueue, []);
        queue.pop();
        state.appsQueue = queue;
      })
      .addCase(
        getGitOpsCatalogApps.fulfilled,
        (state, { payload }: PayloadAction<Array<GitOpsCatalogApp>>) => {
          state.gitOpsCatalogApps = payload;
        },
      )
      .addCase(getGitOpsCatalogApps.rejected, (state) => {
        state.gitOpsCatalogApps = [];
      })
      .addCase(
        getCloudAccounts.fulfilled,
        (state, { payload }: PayloadAction<Array<CloudAccount>>) => {
          state.cloudAccounts = payload;
        },
      )
      .addCase(getCloudAccounts.rejected, (state) => {
        state.cloudAccounts = [];
      });
  },
});

export const { addAppToQueue, removeAppFromQueue, resetClusterServices, setSelectedCluster } =
  clusterSlice.actions;

export const clusterReducer = clusterSlice.reducer;
