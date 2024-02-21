import React, { FunctionComponent } from 'react';
import Divider from '@mui/material/Divider';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';

const KUBEFIRST_CONTENT_INDEX_NAME = 'kubefirst-content';

import Modal, { Close } from '../../components/Modal/Modal';
import Typography from '../../components/Typography/Typography';
import { BISCAY, SALTBOX_BLUE } from '../../constants/colors';

import { Body, Container, Filter, Header } from './KubefirstContent.styled';
import Hits from './hits';
import RefinementList from './refinementList';
import RangeSlider from './slider';

export interface KubefirstContentProps {
  closeModal: () => void;
  isOpen: boolean;
}

const KubefirstContent: FunctionComponent<KubefirstContentProps> = ({ closeModal, isOpen }) => {
  const searchClient = algoliasearch('MU6SSC0L7W', '4b9d990156e83c9d81317926868ba485');

  return (
    <Modal isOpen={isOpen} backgroundColor="transparent" boxShadow={false}>
      <InstantSearch searchClient={searchClient} indexName={KUBEFIRST_CONTENT_INDEX_NAME}>
        <Container>
          <Header>
            <Typography variant="h6" color={BISCAY}>
              kubefirst channel
            </Typography>
          </Header>
          <Divider />
          <Body>
            <Filter>
              <Typography variant="buttonSmall" color={BISCAY}>
                Duration
              </Typography>
              <RangeSlider attribute="duration" />
              <Divider sx={{ mb: 3 }} />
              <Typography variant="buttonSmall" color={BISCAY}>
                Category
              </Typography>
              <RefinementList />
            </Filter>
            <Hits />
          </Body>
        </Container>
        <Close onClick={closeModal} fontSize="small" sx={{ m: 3 }} htmlColor={SALTBOX_BLUE} />
      </InstantSearch>
    </Modal>
  );
};

export default KubefirstContent;
