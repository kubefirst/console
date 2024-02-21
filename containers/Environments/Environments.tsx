'use client';
import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import Row from '@/components/Row/Row';
import Column from '@/components/Column/Column';
import Typography from '@/components/Typography/Typography';
import LearnMore from '@/components/LearnMore/LearnMore';
import Button from '@/components/Button/Button';
import compDisplayImage from '@/assets/comp_display.svg';
import useToggle from '@/hooks/useToggle';
import Modal from '@/components/Modal/Modal';
import { CreateEnvironmentMenu } from '@/components/CreateEnvironmentMenu/CreateEnvironmentMenu';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  createEnvironment,
  deleteEnvironment,
  getAllEnvironments,
} from '@/redux/thunks/environments.thunk';
import EnvironmentsTable from '@/components/EnvironmentsTable/EnvironmentsTable';
import { ClusterEnvironment } from '@/types/provision';
import DeleteEnvironment from '@/components/DeleteEnvironment/DeleteEnvironment';
import { clearEnvironmentError } from '@/redux/slices/environments.slice';
import { noop } from '@/utils/noop';
import { VOLCANIC_SAND } from '@/constants/colors';

const Environments: FunctionComponent = () => {
  const { isOpen, close, open } = useToggle();

  const [selectedEnv, setSelectedEnv] = useState<ClusterEnvironment>();

  const { environments, boundEnvironments, error } = useAppSelector(
    ({ environments }) => environments,
  );
  const dispatch = useAppDispatch();

  const handleAddEnvironment = useCallback(
    (env: ClusterEnvironment) => {
      dispatch(createEnvironment(env))
        .unwrap()
        .then(() => {
          close();
        })
        .catch(noop);
    },
    [dispatch, close],
  );

  const handleEnvironmentDelete = useCallback(() => {
    if (selectedEnv) {
      dispatch(deleteEnvironment(selectedEnv))
        .unwrap()
        .then(() => {
          setSelectedEnv(undefined);
        })
        .catch(noop);
    }
  }, [selectedEnv, dispatch]);

  const handleDeleteModal = useCallback(() => {
    setSelectedEnv(undefined);
  }, []);

  const handleErrorClose = useCallback(() => {
    dispatch(clearEnvironmentError());
  }, [dispatch]);

  const handleModalClose = useCallback(() => {
    dispatch(clearEnvironmentError());
    close();
  }, [dispatch, close]);

  const handleDeleteEnv = useCallback(
    (id: string) => {
      if (environments[id]) {
        setSelectedEnv(environments[id]);
      }
    },
    [environments],
  );

  useEffect(() => {
    dispatch(getAllEnvironments());
  }, [dispatch]);

  return (
    <Column style={{ width: '100%' }}>
      <Header>
        <HeadingContainer>
          <Typography variant="h6">Environments</Typography>
          <LearnMore
            description="Define and add you environments."
            linkTitle="Learn more"
            href="https://docs.kubefirst.io/civo/quick-start/cluster-management"
          />
        </HeadingContainer>
        <Button variant="contained" color="primary" onClick={open}>
          Create environment
        </Button>
      </Header>

      {Object.keys(environments).length ? (
        <EnvironmentsTable
          environments={environments}
          onDeleteEnvironment={handleDeleteEnv}
          // onEditEnvironment={noop}
        />
      ) : (
        <DisplayContainer>
          <Image src={compDisplayImage} height={147} width={200} alt="computer display" />
          <Typography variant="subtitle2" style={{ marginTop: '20px' }}>
            You don&apos;t have any environments defined
          </Typography>
          <Typography variant="body2">
            Create and add environments for your application development.
          </Typography>
        </DisplayContainer>
      )}
      <Modal
        padding={0}
        isOpen={isOpen}
        styleOverrides={{ width: '100%', maxWidth: '630px' }}
        onCloseModal={handleModalClose}
      >
        <CreateEnvironmentMenu
          onSubmit={handleAddEnvironment}
          onClose={close}
          previouslyCreatedEnvironments={environments}
          errorMessage={error}
          onErrorClose={handleErrorClose}
        />
      </Modal>
      {selectedEnv && (
        <DeleteEnvironment
          isOpen={!!selectedEnv}
          environment={selectedEnv}
          boundToCluster={boundEnvironments[selectedEnv.name]}
          onClose={handleDeleteModal}
          onCloseModal={handleDeleteModal}
          onDelete={handleEnvironmentDelete}
        />
      )}
    </Column>
  );
};

export default Environments;

const Header = styled(Row)`
  margin: 40px;
  justify-content: space-between;
`;

const HeadingContainer = styled(Column)`
  gap: 8px;

  ${LearnMore} {
    color: ${VOLCANIC_SAND};
  }
`;

const DisplayContainer = styled(Column)`
  width: 100%;
  align-items: center;
  margin-top: 110px;
  gap: 16px;
`;
