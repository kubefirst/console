import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import sortBy from 'lodash/sortBy';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

import { CardsContainer, Container, Content, Filter } from './GitOpsCatalog.styled';

import Checkbox from '@/components/Checkbox/Checkbox';
import Typography from '@/components/Typography/Typography';
import GitOpsCatalogCard from '@/components/GitOpsCatalogCard/GitOpsCatalogCard';
import GitopsAppModal from '@/components/GitopsAppModal/GitopsAppModal';
import useModal from '@//hooks/useModal';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { installGitOpsApp } from '@/redux/thunks/applications.thunk';
import { AppCategory, GitOpsCatalogApp } from '@/types/applications';
import { VOLCANIC_SAND } from '@/constants/colors';
import {
  addCategory,
  removeCategory,
  setSelectedCatalogApp,
} from '@/redux/slices/applications.slice';

const STATIC_HELP_CARD: GitOpsCatalogApp = {
  name: '',
  display_name: 'Can’t find what you need?',
  image_url: 'https://assets.kubefirst.com/console/help.png',
};

interface GitOpsCatalogProps {
  catalogApplications: GitOpsCatalogApp[];
}

const GitOpsCatalog: FunctionComponent<GitOpsCatalogProps> = ({ catalogApplications }) => {
  const {
    appsQueue,
    gitOpsCatalogApps,
    selectedCategories,
    clusterApplications,
    selectedCatalogApp,
    filter,
  } = useAppSelector(({ applications }) => applications);

  const { data: session } = useSession();

  const { isOpen, openModal, closeModal } = useModal();

  const {
    control,
    formState: { isValid },
    getValues,
    reset,
  } = useForm();

  const dispatch = useAppDispatch();

  const handleCategoryClick = useCallback(
    (category: AppCategory) => {
      const isCategorySelected = selectedCategories.includes(category);

      if (isCategorySelected) {
        dispatch(removeCategory(category));
      } else {
        dispatch(addCategory(category));
      }
    },
    [selectedCategories, dispatch],
  );

  const handleAddApp = useCallback(() => {
    const values = getValues();

    dispatch(
      installGitOpsApp({
        values,
        user: (session?.user?.email as string) || 'kbot',
      }),
    );
    reset();
    closeModal();
  }, [dispatch, closeModal, getValues, reset, session]);

  const handleSelectedApp = useCallback(
    (app: GitOpsCatalogApp) => {
      dispatch(setSelectedCatalogApp(app));

      if (app.secret_keys?.length || app.config_keys?.length) {
        openModal();
      } else {
        handleAddApp();
      }
    },
    [dispatch, handleAddApp, openModal],
  );

  const uninstalledCatalogApps = useMemo(
    () =>
      gitOpsCatalogApps.filter((app) => !clusterApplications.map((s) => s.name).includes(app.name)),
    [clusterApplications, gitOpsCatalogApps],
  );

  const sortedAvailableCategories = useMemo(
    () =>
      uninstalledCatalogApps.reduce<AppCategory[]>((previous, current) => {
        if (current.category && !previous.includes(current.category)) {
          previous.push(current.category);
        }
        return sortBy(previous);
      }, []),
    [uninstalledCatalogApps],
  );

  return (
    <Container>
      <Filter>
        <Typography variant="subtitle2" sx={{ mb: 3 }}>
          Category
        </Typography>
        {sortedAvailableCategories.map((category) => (
          <FormGroup key={category} sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox sx={{ mr: 2 }} onClick={() => handleCategoryClick(category)} />}
              label={
                <Typography variant="body2" color={VOLCANIC_SAND}>
                  {category}
                </Typography>
              }
              sx={{ ml: 0 }}
            />
          </FormGroup>
        ))}
      </Filter>
      <Content>
        <CardsContainer>
          {catalogApplications.map((app) => (
            <GitOpsCatalogCard
              key={app.name}
              {...app}
              onClick={() => handleSelectedApp(app)}
              isInstalling={appsQueue.includes(app.name)}
              isDisabled={!filter.cluster}
            />
          ))}
          <GitOpsCatalogCard {...STATIC_HELP_CARD} showSubmitButton={false} excludeTruncate>
            <>
              To suggest an open source app that installs to your cluster, discuss your idea via an{' '}
              <NextLink href="https://github.com/kubefirst/kubefirst/issues" target="_blank">
                issue
              </NextLink>
              . Learn how you can do this on our{' '}
              <NextLink href="https://github.com/kubefirst/gitops-catalog" target="_blank">
                Contributing file
              </NextLink>
              .
              <br />
              <br />
              Alternatively contact us via our{' '}
              <NextLink href="https://kubefirst.io/slack" target="_blank">
                Slack Community
              </NextLink>{' '}
              in the #helping-hands or #contributors channels.
            </>
          </GitOpsCatalogCard>
        </CardsContainer>
      </Content>
      {isOpen && selectedCatalogApp && (
        <GitopsAppModal
          control={control}
          isValid={isValid}
          closeModal={closeModal}
          isOpen={isOpen}
          onSubmit={handleAddApp}
          {...selectedCatalogApp}
        />
      )}
    </Container>
  );
};

export default GitOpsCatalog;
