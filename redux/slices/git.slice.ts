import { createSlice } from '@reduxjs/toolkit';

import {
  getGithubUser,
  getGithubUserOrganizations,
  getGitHubOrgRepositories,
  getGitHubOrgTeams,
  getGitlabGroups,
  getGitlabUser,
  getGitLabSubgroups,
  getGitLabProjects,
} from '@/redux/thunks/git.thunk';
import { GitLabGroup, GitLabUser } from '@/types/gitlab';
import { GithubUser, GithubUserOrganization } from '@/types/github/index';
import { KUBEFIRST_REPOSITORIES, KUBEFIRST_TEAMS } from '@/constants';
import { createGitOrgErrorMessage } from '@/utils/createGitOrgErrorMessage';
import { GitProvider } from '@/types';

export interface GitState {
  githubUser: GithubUser | null;
  githubUserOrganizations: Array<GithubUserOrganization>;
  gitlabUser: GitLabUser | null;
  gitlabGroups: Array<GitLabGroup>;
  isLoading: boolean;
  isTokenValid: boolean;
  errors: Array<string>;
  responseError?: string;
  token?: string;
  gitOwner?: string;
  isGitSelected?: boolean;
}

export const initialState: GitState = {
  githubUser: null,
  githubUserOrganizations: [],
  gitlabUser: null,
  gitlabGroups: [],
  isLoading: false,
  isTokenValid: false,
  errors: [],
};

const gitSlice = createSlice({
  name: 'git',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setGitOwner: (state, action) => {
      state.gitOwner = action.payload;
    },
    clearUserError: (state) => {
      state.errors = [];
    },
    clearGitState: (state) => {
      state.gitOwner = undefined;
      state.githubUser = null;
      state.githubUserOrganizations = [];
      state.gitlabUser = null;
      state.gitlabGroups = [];
      state.isLoading = false;
      state.isTokenValid = false;
      state.errors = [];
      state.responseError = undefined;
      state.token = undefined;
    },
    setIsGitSelected: (state, action) => {
      state.isGitSelected = action.payload;
    },
    clearResponseError: (state) => {
      state.responseError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      /* GitHub */
      .addCase(getGithubUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGithubUser.fulfilled, (state, action) => {
        state.githubUser = action.payload;
        state.isTokenValid = true;
      })
      .addCase(getGithubUser.rejected, (state, action) => {
        state.isTokenValid = false;
        state.responseError = action.error.message;
      })
      .addCase(getGithubUserOrganizations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGithubUserOrganizations.rejected, (state, action) => {
        state.isLoading = false;
        state.isTokenValid = false;
        state.responseError = action.error.message;
      })
      .addCase(getGithubUserOrganizations.fulfilled, (state, action) => {
        state.githubUserOrganizations = action.payload.sort((a, b) =>
          a.login.localeCompare(b.login),
        );
        state.isLoading = false;
        state.isTokenValid = true;
      })
      .addCase(getGitHubOrgRepositories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGitHubOrgRepositories.fulfilled, (state, { payload: organizationRepos }) => {
        const kubefirstRepos = organizationRepos.filter(({ name }) =>
          KUBEFIRST_REPOSITORIES.includes(name),
        );
        if (kubefirstRepos.length) {
          state.errors.push(
            createGitOrgErrorMessage({
              git: GitProvider.GITHUB,
              type: 'repo',
              gitOwner: state.gitOwner,
            }),
          );
        }
      })
      .addCase(getGitHubOrgRepositories.rejected, (state, action) => {
        state.isLoading = false;
        state.isTokenValid = false;
        state.responseError = action.error.message;
      })
      .addCase(getGitHubOrgTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGitHubOrgTeams.fulfilled, (state, { payload: organizationTeams }) => {
        state.isLoading = false;
        const kubefirstTeams = organizationTeams.filter(({ name }) =>
          KUBEFIRST_TEAMS.includes(name),
        );

        if (kubefirstTeams.length) {
          state.errors.push(
            createGitOrgErrorMessage({
              git: GitProvider.GITHUB,
              type: 'team',
              gitOwner: state.gitOwner,
            }),
          );
        }
      })
      .addCase(getGitHubOrgTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.isTokenValid = false;
        state.responseError = action.error.message;
      })
      /* GitLab */
      .addCase(getGitlabUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGitlabUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gitlabUser = action.payload;
        state.isTokenValid = true;
      })
      .addCase(getGitlabUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isTokenValid = false;
        state.responseError = action.error.message;
      })
      .addCase(getGitlabGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGitlabGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isTokenValid = false;
        state.responseError = action.error.message;
      })
      .addCase(getGitlabGroups.fulfilled, (state, action) => {
        state.gitlabGroups = action.payload.sort((a, b) => a.name.localeCompare(b.name));
        state.isLoading = false;
        state.isTokenValid = true;
      })
      .addCase(getGitLabProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGitLabProjects.fulfilled, (state, { payload: groupProjects }) => {
        state.isLoading = false;
        const kubefirstRepos = groupProjects.filter(({ name }) =>
          KUBEFIRST_REPOSITORIES.includes(name),
        );

        if (kubefirstRepos.length) {
          state.errors.push(
            createGitOrgErrorMessage({
              git: GitProvider.GITLAB,
              type: 'repo',
              gitOwner: state.gitOwner,
            }),
          );
        }
      })
      .addCase(getGitLabProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isTokenValid = false;
        state.responseError = action.error.message;
      })
      .addCase(getGitLabSubgroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGitLabSubgroups.fulfilled, (state, { payload: gitlabSubgroups }) => {
        state.isLoading = false;
        const kubefirstTeams = gitlabSubgroups.filter(({ name }) => KUBEFIRST_TEAMS.includes(name));

        if (kubefirstTeams.length) {
          state.errors.push(
            createGitOrgErrorMessage({
              git: GitProvider.GITLAB,
              type: 'team',
              gitOwner: state.gitOwner,
            }),
          );
        }
      })
      .addCase(getGitLabSubgroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isTokenValid = false;
        state.responseError = action.error.message;
      });
  },
});

export const {
  clearGitState,
  clearUserError,
  setIsGitSelected,
  setGitOwner,
  setToken,
  clearResponseError,
} = gitSlice.actions;

export const gitReducer = gitSlice.reducer;
